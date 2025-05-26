import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/contexts/AuthContext';
import { Database } from '@/types/supabase';

type Message = Database['public']['Tables']['messages']['Row'];

export function useMessages() {
  const { user } = useAuth();
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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
      setIsLoading(true);
      setError(null);

      const { data, error } = await supabase
        .from('messages')
        .select('*')
        .or(`recipient_id.eq.${user?.id},sender_id.eq.${user?.id}`)
        .order('created_at', { ascending: false });

      if (error) throw error;

      setMessages(data);
    } catch (err) {
      console.error('Error loading messages:', err);
      setError('Failed to load messages');
    } finally {
      setIsLoading(false);
    }
  };

  const sendMessage = async (recipientId: string, content: string) => {
    try {
      if (!user) throw new Error('Not authenticated');

      const { error } = await supabase.from('messages').insert({
        sender_id: user.id,
        recipient_id: recipientId,
        content,
      });

      if (error) throw error;
    } catch (err) {
      console.error('Error sending message:', err);
      throw err;
    }
  };

  const markAsRead = async (messageId: string) => {
    try {
      const { error } = await supabase
        .from('messages')
        .update({ read: true })
        .eq('id', messageId)
        .eq('recipient_id', user?.id);

      if (error) throw error;
    } catch (err) {
      console.error('Error marking message as read:', err);
      throw err;
    }
  };

  return {
    messages,
    isLoading,
    error,
    sendMessage,
    markAsRead,
    refresh: loadMessages,
  };
}