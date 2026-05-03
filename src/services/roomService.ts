/**
 * Room Service
 * Manages study rooms, members, and real-time chat
 */

import { supabase } from "@/integrations/supabase/client";

export interface StudyRoom {
  id: string;
  name: string;
  description?: string;
  topic?: string;
  created_by: string;
  max_members: number;
  is_private: boolean;
  join_code?: string;
  status: "active" | "archived";
  active_members: number;
  created_at: string;
  updated_at: string;
}

export interface RoomMember {
  id: string;
  room_id: string;
  user_id: string;
  role: "owner" | "moderator" | "member";
  is_online: boolean;
  last_seen: string;
  joined_at: string;
  profile?: { display_name: string; avatar_url: string | null };
}

export interface RoomMessage {
  id: string;
  room_id: string;
  user_id: string;
  message: string;
  message_type: "text" | "code" | "system" | "file";
  metadata?: any;
  created_at: string;
  profile?: { display_name: string };
}

export interface SharedCode {
  id: string;
  room_id: string;
  title: string;
  code: string;
  language: string;
  created_by?: string;
  last_edited_by?: string;
  version: number;
  created_at: string;
  updated_at: string;
}

/**
 * Get all public study rooms
 */
export async function getPublicRooms(): Promise<StudyRoom[]> {
  const { data, error } = await supabase
    .from("study_rooms")
    .select("*")
    .eq("status", "active")
    .eq("is_private", false)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching rooms:", error);
    throw new Error(`Failed to fetch rooms: ${error.message}`);
  }

  return data || [];
}

/**
 * Get user's joined rooms
 */
export async function getUserRooms(): Promise<StudyRoom[]> {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return [];

  const { data, error } = await supabase
    .from("room_members")
    .select("room:study_rooms(*)")
    .eq("user_id", user.id);

  if (error) {
    console.error("Error fetching user rooms:", error);
    return [];
  }

  return data?.map((d: any) => d.room).filter(Boolean) || [];
}

/**
 * Create a new study room
 * Handles both trigger-based and manual member/code creation
 */
export async function createRoom(
  name: string,
  description?: string,
  topic?: string,
  isPrivate: boolean = false,
  maxMembers: number = 10
): Promise<StudyRoom> {
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("User must be authenticated to create rooms");
  }

  // Step 1: Create the room
  const { data, error } = await supabase
    .from("study_rooms")
    .insert({
      name,
      description,
      topic,
      created_by: user.id,
      is_private: isPrivate,
      max_members: maxMembers,
      status: "active",
    })
    .select("*")
    .single();

  if (error) {
    console.error("Error creating room:", error);
    throw new Error(`Failed to create room: ${error.message}`);
  }

  // Step 2: Ensure creator is a room member (idempotent — handles trigger or manual)
  const { error: memberError } = await supabase
    .from("room_members")
    .upsert(
      {
        room_id: data.id,
        user_id: user.id,
        role: "owner",
        is_online: true,
      },
      { onConflict: "room_id,user_id", ignoreDuplicates: true }
    );

  if (memberError && !memberError.message.includes("duplicate")) {
    console.warn("Could not add creator as member:", memberError.message);
  }

  // Step 3: Ensure shared code pad exists
  const { error: codeError } = await supabase
    .from("room_shared_code")
    .upsert(
      {
        room_id: data.id,
        title: "Shared Code",
        code: "",
        language: "python",
        created_by: user.id,
      },
      { ignoreDuplicates: true }
    );

  if (codeError && !codeError.message.includes("duplicate")) {
    console.warn("Could not create shared code:", codeError.message);
  }

  return data;
}

/**
 * Join a room (public)
 */
export async function joinRoom(roomId: string): Promise<boolean> {
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("User must be authenticated to join rooms");
  }

  // Check if already a member
  const { data: existing } = await supabase
    .from("room_members")
    .select("id")
    .eq("room_id", roomId)
    .eq("user_id", user.id)
    .maybeSingle();

  if (existing) {
    // Already a member, just set online
    await supabase
      .from("room_members")
      .update({ is_online: true, last_seen: new Date().toISOString() })
      .eq("id", existing.id);
    return true;
  }

  // Check room capacity
  const { data: room } = await supabase
    .from("study_rooms")
    .select("max_members, active_members, is_private")
    .eq("id", roomId)
    .single();

  if (room && room.active_members >= room.max_members) {
    throw new Error("Room is full");
  }

  if (room?.is_private) {
    throw new Error("This is a private room. Use a join code to enter.");
  }

  // Join as new member
  const { error } = await supabase
    .from("room_members")
    .insert({
      room_id: roomId,
      user_id: user.id,
      role: "member",
      is_online: true,
    });

  if (error) {
    console.error("Error joining room:", error);
    throw new Error(`Failed to join room: ${error.message}`);
  }

  return true;
}

/**
 * Join a private room with join code
 */
export async function joinRoomWithCode(joinCode: string): Promise<StudyRoom> {
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("User must be authenticated to join rooms");
  }

  // Find room by join code
  const { data: room, error: roomError } = await supabase
    .from("study_rooms")
    .select("*")
    .eq("join_code", joinCode.toUpperCase())
    .eq("status", "active")
    .single();

  if (roomError || !room) {
    throw new Error("Invalid join code. Please check and try again.");
  }

  // Check if already a member
  const { data: existing } = await supabase
    .from("room_members")
    .select("id")
    .eq("room_id", room.id)
    .eq("user_id", user.id)
    .maybeSingle();

  if (existing) {
    await supabase
      .from("room_members")
      .update({ is_online: true })
      .eq("id", existing.id);
    return room;
  }

  // Check capacity
  if (room.active_members >= room.max_members) {
    throw new Error("Room is full");
  }

  // Join
  const { error } = await supabase
    .from("room_members")
    .insert({
      room_id: room.id,
      user_id: user.id,
      role: "member",
      is_online: true,
    });

  if (error) {
    throw new Error(`Failed to join room: ${error.message}`);
  }

  return room;
}

/**
 * Leave a room
 */
export async function leaveRoom(roomId: string): Promise<void> {
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return;

  await supabase
    .from("room_members")
    .delete()
    .eq("room_id", roomId)
    .eq("user_id", user.id);
}

/**
 * Set a member's online status to false (presence cleanup).
 * Fire-and-forget — used on unmount and beforeunload.
 */
export async function setMemberOffline(roomId: string, userId: string): Promise<void> {
  await supabase
    .from("room_members")
    .update({ is_online: false, last_seen: new Date().toISOString() })
    .eq("room_id", roomId)
    .eq("user_id", userId);
}

/**
 * Get room members with display names from user_profiles
 */
export async function getRoomMembers(roomId: string): Promise<RoomMember[]> {
  const { data: members, error } = await supabase
    .from("room_members")
    .select("*")
    .eq("room_id", roomId)
    .order("joined_at", { ascending: true });

  if (error) {
    console.error("Error fetching room members:", error);
    return [];
  }

  if (!members || members.length === 0) return [];

  // Enrich with display names from user_profiles
  const userIds = members.map((m) => m.user_id);
  const { data: profiles } = await supabase
    .from("user_profiles")
    .select("user_id, display_name, avatar_url")
    .in("user_id", userIds);

  const profileMap = new Map(
    (profiles || []).map((p: any) => [p.user_id, p])
  );

  return members.map((m) => ({
    ...m,
    profile: profileMap.get(m.user_id) || { display_name: "User", avatar_url: null },
  }));
}

/**
 * Send a message to a room
 */
export async function sendMessage(
  roomId: string,
  message: string,
  messageType: RoomMessage["message_type"] = "text",
  metadata?: any
): Promise<void> {
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("User must be authenticated to send messages");
  }

  const { error } = await supabase
    .from("room_messages")
    .insert({
      room_id: roomId,
      user_id: user.id,
      message,
      message_type: messageType,
      metadata,
    });

  if (error) {
    console.error("Error sending message:", error);
    throw new Error(`Failed to send message: ${error.message}`);
  }
}

/**
 * Get room messages with user display names.
 * Supports cursor-based pagination: pass `before` (ISO timestamp) to load older messages.
 */
export async function getRoomMessages(
  roomId: string,
  limit: number = 100,
  before?: string
): Promise<RoomMessage[]> {
  let query = supabase
    .from("room_messages")
    .select("*")
    .eq("room_id", roomId)
    .order("created_at", { ascending: false })
    .limit(limit);

  if (before) {
    query = query.lt("created_at", before);
  }

  const { data: messages, error } = await query;

  if (error) {
    console.error("Error fetching messages:", error);
    return [];
  }

  if (!messages || messages.length === 0) return [];

  // Enrich with display names
  const userIds = [...new Set(messages.map((m) => m.user_id))];
  const { data: profiles } = await supabase
    .from("user_profiles")
    .select("user_id, display_name")
    .in("user_id", userIds);

  const profileMap = new Map(
    (profiles || []).map((p: any) => [p.user_id, p])
  );

  // Reverse to chronological order (we fetched DESC for pagination)
  return messages
    .map((m) => ({
      ...m,
      profile: profileMap.get(m.user_id) || { display_name: "User" },
    }))
    .reverse();
}

/**
 * Get shared code for room (auto-created by trigger)
 */
export async function getRoomSharedCode(roomId: string): Promise<SharedCode | null> {
  const { data, error } = await supabase
    .from("room_shared_code")
    .select("*")
    .eq("room_id", roomId)
    .maybeSingle();

  if (error) {
    console.error("Error fetching shared code:", error);
    return null;
  }

  return data;
}

/**
 * Update shared code — uses a simple update (version managed server-side is overkill,
 * just increment on client since we have realtime sync)
 */
export async function updateSharedCode(
  codeId: string,
  code: string,
  language?: string
): Promise<void> {
  const { data: { user } } = await supabase.auth.getUser();

  const updates: Record<string, any> = {
    code,
    last_edited_by: user?.id,
    updated_at: new Date().toISOString(),
  };

  if (language) {
    updates.language = language;
  }

  const { error } = await supabase
    .from("room_shared_code")
    .update(updates)
    .eq("id", codeId);

  if (error) {
    console.error("Error updating shared code:", error);
    throw new Error(`Failed to update code: ${error.message}`);
  }
}

/**
 * Get room details by ID
 */
export async function getRoomById(roomId: string): Promise<StudyRoom | null> {
  const { data, error } = await supabase
    .from("study_rooms")
    .select("*")
    .eq("id", roomId)
    .single();

  if (error) {
    console.error("Error fetching room:", error);
    return null;
  }

  return data;
}

/**
 * Subscribe to room messages (realtime)
 */
export function subscribeToMessages(roomId: string, callback: (message: RoomMessage) => void) {
  return supabase
    .channel(`room_${roomId}_messages`)
    .on(
      "postgres_changes",
      {
        event: "INSERT",
        schema: "public",
        table: "room_messages",
        filter: `room_id=eq.${roomId}`,
      },
      (payload) => {
        callback(payload.new as RoomMessage);
      }
    )
    .subscribe();
}

/**
 * Subscribe to room members (realtime)
 */
export function subscribeToMembers(roomId: string, callback: () => void) {
  return supabase
    .channel(`room_${roomId}_members`)
    .on(
      "postgres_changes",
      {
        event: "*",
        schema: "public",
        table: "room_members",
        filter: `room_id=eq.${roomId}`,
      },
      callback
    )
    .subscribe();
}

/**
 * Subscribe to shared code updates (realtime)
 */
export function subscribeToSharedCode(roomId: string, callback: (code: SharedCode) => void) {
  return supabase
    .channel(`room_${roomId}_code`)
    .on(
      "postgres_changes",
      {
        event: "UPDATE",
        schema: "public",
        table: "room_shared_code",
        filter: `room_id=eq.${roomId}`,
      },
      (payload) => {
        callback(payload.new as SharedCode);
      }
    )
    .subscribe();
}
