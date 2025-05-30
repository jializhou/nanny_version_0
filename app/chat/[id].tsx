import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, FlatList, Image } from 'react-native';
import { useLocalSearchParams, Stack, useRouter } from 'expo-router';
import { useColorScheme } from 'react-native';
import Colors from '@/constants/Colors';
import { Send, ArrowLeft } from 'lucide-react-native';
import { useMessages } from '@/contexts/MessagesContext';

export default function ChatScreen() {
  const { id } = useLocalSearchParams();
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const router = useRouter();
  const { messages, addChatMessage, getChatHistory } = useMessages();

  // Find the chat partner from the messages data
  const chatPartner = messages.find(m => m.id === id);
  const [chatMessages, setChatMessages] = useState(getChatHistory(id as string));
  const [newMessage, setNewMessage] = useState('');

  const handleSend = () => {
    if (newMessage.trim()) {
      const message = {
        id: Date.now().toString(),
        text: newMessage,
        timestamp: new Date(),
        sender: 'user' as const
      };
      addChatMessage(id as string, message);
      setNewMessage('');
    }
  };

  // Update local chat messages when global state changes
  useEffect(() => {
    setChatMessages(getChatHistory(id as string));
  }, [id, getChatHistory]);

  const renderMessage = ({ item }: { item: { id: string; text: string; timestamp: Date; sender: 'user' | 'other' } }) => (
    <View style={[
      styles.messageContainer,
      item.sender === 'user' ? styles.userMessage : styles.otherMessage
    ]}>
      {item.sender === 'other' && (
        <Image 
          source={{ uri: chatPartner?.avatar }} 
          style={styles.avatar}
        />
      )}
      <View style={[
        styles.messageBubble,
        item.sender === 'user' 
          ? [styles.userBubble, { backgroundColor: colors.primary }]
          : [styles.otherBubble, { backgroundColor: colors.card }]
      ]}>
        <Text style={[
          styles.messageText,
          { color: item.sender === 'user' ? '#fff' : colors.text }
        ]}>
          {item.text}
        </Text>
      </View>
    </View>
  );

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: chatPartner?.sender || 'Chat',
          headerLeft: () => (
            <TouchableOpacity 
              onPress={() => router.back()}
              style={styles.backButton}
            >
              <ArrowLeft size={24} color={colors.text} />
            </TouchableOpacity>
          ),
        }}
      />
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={[styles.container, { backgroundColor: colors.background }]}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
      >
        <FlatList
          data={chatMessages}
          renderItem={renderMessage}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.messagesList}
          inverted={false}
        />
        
        <View style={[styles.inputContainer, { backgroundColor: colors.card }]}>
          <TextInput
            style={[styles.input, { color: colors.text }]}
            placeholder="Type a message..."
            placeholderTextColor={colors.textDim}
            value={newMessage}
            onChangeText={setNewMessage}
            multiline
          />
          <TouchableOpacity 
            onPress={handleSend}
            style={[styles.sendButton, { backgroundColor: colors.primary }]}
            disabled={!newMessage.trim()}
          >
            <Send size={20} color="#fff" />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backButton: {
    marginRight: 16,
  },
  messagesList: {
    padding: 16,
  },
  messageContainer: {
    flexDirection: 'row',
    marginBottom: 16,
    alignItems: 'flex-end',
  },
  userMessage: {
    justifyContent: 'flex-end',
  },
  otherMessage: {
    justifyContent: 'flex-start',
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 8,
  },
  messageBubble: {
    maxWidth: '70%',
    padding: 12,
    borderRadius: 20,
  },
  userBubble: {
    borderBottomRightRadius: 4,
  },
  otherBubble: {
    borderBottomLeftRadius: 4,
  },
  messageText: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 16,
    alignItems: 'flex-end',
  },
  input: {
    flex: 1,
    marginRight: 12,
    paddingHorizontal: 16,
    paddingVertical: 8,
    maxHeight: 100,
    borderRadius: 20,
    fontSize: 16,
    fontFamily: 'Inter-Regular',
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
}); 