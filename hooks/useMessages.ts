import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/contexts/AuthContext';
import { Database } from '@/types/supabase';

type Message = Database['public']['Tables']['messages']['Row'];

export function useMessages() {
  const { user } = useAuth();
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    // Load initial messages
    loadMessages();

    // Subscribe to new messages
    const subscription = supabase
      .channel('messages')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'messages',
          filter: `recipient_id=eq.${user.id}`,
        },
        (payload) => {
          if (payload.eventType === 'INSERT') {
            setMessages((current) => [...current, payload.new as Message]);
          } else if (payload.eventType === 'UPDATE') {
            setMessages((current) =>
              current.map((msg) =>
                msg.id === payload.new.id ? (payload.new as Message) : msg
              )
            );
          }
        }
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, [user]);

  const loadMessages = async () => {
    try {
      if (!user) return;

      const { data, error } = await supabase
        .from('messages')
        .select('*')
        .or(`recipient_id.eq.${user.id},sender_id.eq.${user.id}`)
        .order('created_at', { ascending: false });

      if (error) throw error;

      setMessages(data);
    } catch (error) {
      console.error('Error loading messages:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const sendMessage = async (recipientId: string, content: string) => {
    try {
      if (!user) throw new Error('User not authenticated');

      const { error } = await supabase.from('messages').insert({
        sender_id: user.id,
        recipient_id: recipientId,
        content,
      });

      if (error) throw error;
    } catch (error) {
      console.error('Error sending message:', error);
      throw error;
    }
  };

  const markAsRead = async (messageId: string) => {
    try {
      if (!user) throw new Error('User not authenticated');

      const { error } = await supabase
        .from('messages')
        .update({ read: true })
        .eq('id', messageId)
        .eq('recipient_id', user.id);

      if (error) throw error;
    } catch (error) {
      console.error('Error marking message as read:', error);
      throw error;
    }
  };

  return {
    messages,
    isLoading,
    sendMessage,
    markAsRead,
  };
}