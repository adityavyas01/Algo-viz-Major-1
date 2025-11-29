import React, { useState, useEffect, useRef } from 'react';
import { supabase } from '../lib/supabaseClient';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { ScrollArea } from './ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Send } from 'lucide-react';

interface ChatMessage {
  id: number;
  user_id: string;
  message: string;
  created_at: string;
  profiles: {
    username: string;
    avatar_url: string;
  } | null;
}

interface SessionChatProps {
  sessionId: string;
  user: { id: string; };
}

export const SessionChat: React.FC<SessionChatProps> = ({ sessionId, user }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchMessages = async () => {
      const { data, error } = await supabase
        .from('session_chat_messages')
        .select(`
          id,
          user_id,
          message,
          created_at,
          profiles ( username, avatar_url )
        `)
        .eq('session_id', sessionId)
        .order('created_at', { ascending: true });

      if (error) {
        console.error('Error fetching messages:', error);
      } else {
        setMessages(data as ChatMessage[]);
      }
    };

    fetchMessages();

    const channel = supabase.channel(`chat:${sessionId}`)
      .on<ChatMessage>(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'session_chat_messages',
          filter: `session_id=eq.${sessionId}`
        },
        async (payload) => {
          // The payload doesn't contain the profile data, so we need to fetch it.
          const { data: newMessageData, error } = await supabase
            .from('session_chat_messages')
            .select(`*, profiles ( username, avatar_url )`)
            .eq('id', payload.new.id)
            .single();
          
          if (error) {
            console.error('Error fetching new message details:', error);
          } else {
            setMessages((prevMessages) => [...prevMessages, newMessageData as ChatMessage]);
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [sessionId]);

  useEffect(() => {
    // Auto-scroll to bottom
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTo({ top: scrollAreaRef.current.scrollHeight, behavior: 'smooth' });
    }
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim() === '') return;

    const { error } = await supabase
      .from('session_chat_messages')
      .insert({
        session_id: sessionId,
        user_id: user.id,
        message: newMessage.trim(),
      });

    if (error) {
      console.error('Error sending message:', error);
    } else {
      setNewMessage('');
    }
  };

  return (
    <div className="flex flex-col h-full">
      <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
        <div className="space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex items-start gap-3 ${msg.user_id === user.id ? 'justify-end' : ''}`}
            >
              {msg.user_id !== user.id && (
                <Avatar className="w-8 h-8">
                  <AvatarImage src={msg.profiles?.avatar_url} />
                  <AvatarFallback>{msg.profiles?.username?.slice(0, 2).toUpperCase() || '??'}</AvatarFallback>
                </Avatar>
              )}
              <div className={`rounded-lg px-3 py-2 max-w-xs ${
                  msg.user_id === user.id
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted'
                }`}
              >
                <p className="text-sm">{msg.message}</p>
                <p className="text-xs text-muted-foreground mt-1 text-right">
                  {new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
              {msg.user_id === user.id && (
                <Avatar className="w-8 h-8">
                  <AvatarImage src={msg.profiles?.avatar_url} />
                  <AvatarFallback>{msg.profiles?.username?.slice(0, 2).toUpperCase() || 'ME'}</AvatarFallback>
                </Avatar>
              )}
            </div>
          ))}
        </div>
      </ScrollArea>
      <form onSubmit={handleSendMessage} className="p-4 border-t flex items-center gap-2">
        <Input
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message..."
          autoComplete="off"
        />
        <Button type="submit" size="icon">
          <Send className="w-4 h-4" />
        </Button>
      </form>
    </div>
  );
};
