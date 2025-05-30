import React, { createContext, useContext, useState, useEffect } from 'react';
import { messages as initialMessages } from '@/data/messages';

interface Message {
  id: string;
  sender: string;
  avatar: string;
  lastMessage: string;
  timestamp: Date;
  read: boolean;
  online: boolean;
  chatHistory?: ChatMessage[];
}

interface ChatMessage {
  id: string;
  text: string;
  timestamp: Date;
  sender: 'user' | 'other';
}

interface MessagesContextType {
  messages: Message[];
  addChatMessage: (chatId: string, message: ChatMessage) => void;
  markAsRead: (messageId: string) => void;
  getChatHistory: (chatId: string) => ChatMessage[];
}

const MessagesContext = createContext<MessagesContextType | undefined>(undefined);

export function MessagesProvider({ children }: { children: React.ReactNode }) {
  const [messages, setMessages] = useState<Message[]>(() => {
    return initialMessages.map(msg => ({
      ...msg,
      chatHistory: [{
        id: '1',
        text: msg.lastMessage,
        timestamp: msg.timestamp,
        sender: 'other'
      }]
    }));
  });

  const addChatMessage = (chatId: string, message: ChatMessage) => {
    setMessages(prevMessages => {
      return prevMessages.map(msg => {
        if (msg.id === chatId) {
          return {
            ...msg,
            lastMessage: message.text,
            timestamp: message.timestamp,
            chatHistory: [...(msg.chatHistory || []), message]
          };
        }
        return msg;
      });
    });
  };

  const markAsRead = (messageId: string) => {
    setMessages(prevMessages => {
      return prevMessages.map(msg => {
        if (msg.id === messageId) {
          return {
            ...msg,
            read: true
          };
        }
        return msg;
      });
    });
  };

  const getChatHistory = (chatId: string) => {
    const chat = messages.find(msg => msg.id === chatId);
    return chat?.chatHistory || [];
  };

  return (
    <MessagesContext.Provider value={{ messages, addChatMessage, markAsRead, getChatHistory }}>
      {children}
    </MessagesContext.Provider>
  );
}

export function useMessages() {
  const context = useContext(MessagesContext);
  if (context === undefined) {
    throw new Error('useMessages must be used within a MessagesProvider');
  }
  return context;
} 