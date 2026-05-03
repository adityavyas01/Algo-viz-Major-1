/**
 * useRoom Hook
 * React hooks for managing study room state with real-time subscriptions.
 * Production-grade: handles echo suppression, presence cleanup, and pagination.
 */

import { useState, useEffect, useCallback, useRef } from "react";
import {
  getPublicRooms,
  getUserRooms,
  getRoomMembers,
  getRoomMessages,
  getRoomSharedCode,
  getRoomById,
  sendMessage as sendMessageService,
  updateSharedCode as updateSharedCodeService,
  setMemberOffline,
  subscribeToMessages,
  subscribeToMembers,
  subscribeToSharedCode,
  type StudyRoom,
  type RoomMember,
  type RoomMessage,
  type SharedCode,
} from "@/services/roomService";
import { supabase } from "@/integrations/supabase/client";

/**
 * Hook for the study rooms listing page
 */
export function useRooms() {
  const [publicRooms, setPublicRooms] = useState<StudyRoom[]>([]);
  const [userRooms, setUserRooms] = useState<StudyRoom[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadRooms = async () => {
    setIsLoading(true);
    try {
      const [publicData, userData] = await Promise.all([
        getPublicRooms(),
        getUserRooms(),
      ]);
      setPublicRooms(publicData);
      setUserRooms(userData);
    } catch (error) {
      console.error("Error loading rooms:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadRooms();
  }, []);

  return {
    publicRooms,
    userRooms,
    isLoading,
    reload: loadRooms,
  };
}

/**
 * Hook for a single room view with real-time updates
 */
export function useRoom(roomId: string) {
  const [room, setRoom] = useState<StudyRoom | null>(null);
  const [members, setMembers] = useState<RoomMember[]>([]);
  const [messages, setMessages] = useState<RoomMessage[]>([]);
  const [sharedCode, setSharedCode] = useState<SharedCode | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [onlineUsers, setOnlineUsers] = useState<Set<string>>(new Set());
  const presenceChannelRef = useRef<any>(null);
  // Track local edits to suppress realtime echo of own code changes
  const isLocalEditRef = useRef(false);
  const localEditTimerRef = useRef<NodeJS.Timeout | null>(null);
  const currentUserIdRef = useRef<string | null>(null);

  const loadRoomData = useCallback(async () => {
    if (!roomId) return;
    setIsLoading(true);
    try {
      const [roomData, membersData, messagesData, codeData] = await Promise.all([
        getRoomById(roomId),
        getRoomMembers(roomId),
        getRoomMessages(roomId),
        getRoomSharedCode(roomId),
      ]);
      setRoom(roomData);
      setMembers(membersData);
      setMessages(messagesData);
      setSharedCode(codeData);
    } catch (error) {
      console.error("Error loading room data:", error);
    } finally {
      setIsLoading(false);
    }
  }, [roomId]);

  useEffect(() => {
    if (!roomId) return;

    loadRoomData();

    // Cache current user ID for echo suppression
    supabase.auth.getUser().then(({ data: { user } }) => {
      currentUserIdRef.current = user?.id || null;
    });

    // Real-time message subscription with dedup
    const messageSubscription = subscribeToMessages(roomId, (newMessage) => {
      setMessages((prev) => {
        if (prev.some((m) => m.id === newMessage.id)) return prev;
        return [...prev, newMessage];
      });
    });

    // Real-time member changes
    const memberSubscription = subscribeToMembers(roomId, () => {
      getRoomMembers(roomId).then(setMembers);
    });

    // Real-time code updates — suppress echo from own edits
    const codeSubscription = subscribeToSharedCode(roomId, (updatedCode) => {
      if (isLocalEditRef.current && updatedCode.last_edited_by === currentUserIdRef.current) {
        // This is the echo of our own edit — skip UI update
        return;
      }
      setSharedCode(updatedCode);
    });

    // Presence channel for online status
    const presenceChannel = supabase.channel(`room_${roomId}_presence`, {
      config: { presence: { key: "user_id" } },
    });

    presenceChannel
      .on("presence", { event: "sync" }, () => {
        const state = presenceChannel.presenceState();
        const online = new Set<string>();
        Object.keys(state).forEach((key) => {
          const presences = state[key] as any[];
          presences.forEach((p) => {
            if (p.user_id) online.add(p.user_id);
          });
        });
        setOnlineUsers(online);
      })
      .subscribe(async (status) => {
        if (status === "SUBSCRIBED") {
          const { data: { user } } = await supabase.auth.getUser();
          if (user) {
            await presenceChannel.track({
              user_id: user.id,
              online_at: new Date().toISOString(),
            });
          }
        }
      });

    presenceChannelRef.current = presenceChannel;

    // Cleanup: untrack presence + set offline on unmount/tab close
    const handleBeforeUnload = () => {
      if (currentUserIdRef.current) {
        setMemberOffline(roomId, currentUserIdRef.current);
      }
    };
    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      messageSubscription.unsubscribe();
      memberSubscription.unsubscribe();
      codeSubscription.unsubscribe();
      // Untrack presence before removing channel
      if (presenceChannelRef.current) {
        presenceChannelRef.current.untrack().catch(() => {});
        supabase.removeChannel(presenceChannelRef.current);
      }
      // Mark offline in DB
      if (currentUserIdRef.current) {
        setMemberOffline(roomId, currentUserIdRef.current);
      }
      // Clear local edit timer
      if (localEditTimerRef.current) clearTimeout(localEditTimerRef.current);
    };
  }, [roomId, loadRoomData]);

  const handleSendMessage = async (message: string, messageType: RoomMessage["message_type"] = "text", metadata?: any) => {
    await sendMessageService(roomId, message, messageType, metadata);
  };

  const handleUpdateCode = async (code: string, language?: string) => {
    if (sharedCode) {
      // Mark as local edit to suppress our own realtime echo
      isLocalEditRef.current = true;
      if (localEditTimerRef.current) clearTimeout(localEditTimerRef.current);
      // Reset local edit flag after 3s (enough for round-trip)
      localEditTimerRef.current = setTimeout(() => {
        isLocalEditRef.current = false;
      }, 3000);
      await updateSharedCodeService(sharedCode.id, code, language);
    }
  };

  return {
    room,
    members,
    messages,
    sharedCode,
    isLoading,
    onlineUsers,
    sendMessage: handleSendMessage,
    updateCode: handleUpdateCode,
    reload: loadRoomData,
  };
}
