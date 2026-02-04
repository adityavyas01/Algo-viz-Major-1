/**
 * useRoom Hook
 * React hooks for managing study room state
 */

import { useState, useEffect } from "react";
import {
  getPublicRooms,
  getUserRooms,
  createRoom,
  joinRoom,
  leaveRoom,
  getRoomMembers,
  sendMessage,
  getRoomMessages,
  getRoomSharedCode,
  updateSharedCode,
  subscribeToMessages,
  subscribeToMembers,
  subscribeToSharedCode,
  type StudyRoom,
  type RoomMember,
  type RoomMessage,
  type SharedCode,
} from "@/services/roomService";

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

export function useRoom(roomId: string) {
  const [members, setMembers] = useState<RoomMember[]>([]);
  const [messages, setMessages] = useState<RoomMessage[]>([]);
  const [sharedCode, setSharedCode] = useState<SharedCode | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const loadRoomData = async () => {
    setIsLoading(true);
    try {
      const [membersData, messagesData, codeData] = await Promise.all([
        getRoomMembers(roomId),
        getRoomMessages(roomId),
        getRoomSharedCode(roomId),
      ]);
      setMembers(membersData);
      setMessages(messagesData);
      setSharedCode(codeData);
    } catch (error) {
      console.error("Error loading room data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!roomId) return;

    loadRoomData();

    // Set up real-time subscriptions
    const messageSubscription = subscribeToMessages(roomId, (message) => {
      setMessages((prev) => [...prev, message]);
    });

    const memberSubscription = subscribeToMembers(roomId, () => {
      getRoomMembers(roomId).then(setMembers);
    });

    const codeSubscription = subscribeToSharedCode(roomId, (code) => {
      setSharedCode(code);
    });

    return () => {
      messageSubscription.unsubscribe();
      memberSubscription.unsubscribe();
      codeSubscription.unsubscribe();
    };
  }, [roomId]);

  const handleSendMessage = async (message: string) => {
    await sendMessage(roomId, message);
  };

  const handleUpdateCode = async (code: string, language?: string) => {
    if (sharedCode) {
      await updateSharedCode(sharedCode.id, code, language);
    }
  };

  return {
    members,
    messages,
    sharedCode,
    isLoading,
    sendMessage: handleSendMessage,
    updateCode: handleUpdateCode,
    reload: loadRoomData,
  };
}
