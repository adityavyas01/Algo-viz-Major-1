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
  user?: { email: string };
}

export interface RoomMessage {
  id: string;
  room_id: string;
  user_id: string;
  message: string;
  message_type: "text" | "code" | "system" | "file";
  metadata?: any;
  created_at: string;
  user?: { email: string };
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
    .select()
    .single();

  if (error) {
    console.error("Error creating room:", error);
    throw new Error(`Failed to create room: ${error.message}`);
  }

  return data;
}

/**
 * Join a room
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
    .single();

  if (existing) {
    // Already a member, just set online
    await supabase
      .from("room_members")
      .update({ is_online: true })
      .eq("id", existing.id);
    return true;
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
 * Get room members
 */
export async function getRoomMembers(roomId: string): Promise<RoomMember[]> {
  const { data, error } = await supabase
    .from("room_members")
    .select("*, user:auth.users(email)")
    .eq("room_id", roomId)
    .order("joined_at", { ascending: true });

  if (error) {
    console.error("Error fetching room members:", error);
    return [];
  }

  return data || [];
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
 * Get room messages
 */
export async function getRoomMessages(
  roomId: string,
  limit: number = 50
): Promise<RoomMessage[]> {
  const { data, error } = await supabase
    .from("room_messages")
    .select("*, user:auth.users(email)")
    .eq("room_id", roomId)
    .order("created_at", { ascending: true })
    .limit(limit);

  if (error) {
    console.error("Error fetching messages:", error);
    return [];
  }

  return data || [];
}

/**
 * Get or create shared code for room
 */
export async function getRoomSharedCode(roomId: string): Promise<SharedCode | null> {
  const { data, error } = await supabase
    .from("room_shared_code")
    .select("*")
    .eq("room_id", roomId)
    .single();

  if (error && error.code !== "PGRST116") {
    console.error("Error fetching shared code:", error);
    return null;
  }

  if (!data) {
    // Create new shared code
    const { data: { user } } = await supabase.auth.getUser();
    const { data: newCode, error: createError } = await supabase
      .from("room_shared_code")
      .insert({
        room_id: roomId,
        title: "Shared Code",
        code: "# Write collaborative code here\n",
        language: "python",
        created_by: user?.id,
      })
      .select()
      .single();

    if (createError) {
      console.error("Error creating shared code:", createError);
      return null;
    }

    return newCode;
  }

  return data;
}

/**
 * Update shared code
 */
export async function updateSharedCode(
  codeId: string,
  code: string,
  language?: string
): Promise<void> {
  const { data: { user } } = await supabase.auth.getUser();

  const updates: any = {
    code,
    last_edited_by: user?.id,
    version: supabase.sql`version + 1`,
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
 * Subscribe to room messages
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
      async (payload) => {
        // Fetch user details
        const { data: user } = await supabase
          .from("auth.users")
          .select("email")
          .eq("id", payload.new.user_id)
          .single();

        callback({
          ...payload.new,
          user,
        } as RoomMessage);
      }
    )
    .subscribe();
}

/**
 * Subscribe to room members
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
 * Subscribe to shared code updates
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
