import { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { useColorScheme } from 'react-native';
import Colors from '@/constants/Colors';
import { formatLastMessageTime } from '@/utils/dateFormatter';
import { useRouter } from 'expo-router';
import { useMessages } from '@/contexts/MessagesContext';

export default function MessagesScreen() {
  const colorScheme = useColorScheme();
  const { t } = useTranslation();
  const colors = Colors[colorScheme ?? 'light'];
  const router = useRouter();
  const { messages, markAsRead } = useMessages();

  const handleMessagePress = (id: string) => {
    markAsRead(id);
    router.push({
      pathname: '/chat/[id]',
      params: { id }
    });
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <Text style={[styles.headerTitle, { color: colors.text }]}>
          {t('messages.title')}
        </Text>
      </View>

      <FlatList
        data={messages}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.messagesList}
        renderItem={({ item }) => (
          <TouchableOpacity 
            style={[
              styles.messageItem, 
              { backgroundColor: colors.card },
              !item.read && styles.unreadMessage
            ]}
            onPress={() => handleMessagePress(item.id)}
          >
            <View style={styles.avatarContainer}>
              <Image source={{ uri: item.avatar }} style={styles.avatar} />
              {item.online && <View style={styles.onlineIndicator} />}
            </View>
            
            <View style={styles.messageContent}>
              <View style={styles.messageHeader}>
                <Text style={[styles.senderName, { color: colors.text }]}>
                  {item.sender}
                </Text>
                <Text style={[styles.messageTime, { color: colors.textDim }]}>
                  {formatLastMessageTime(item.timestamp)}
                </Text>
              </View>
              
              <Text 
                style={[
                  styles.messagePreview, 
                  { color: item.read ? colors.textDim : colors.text }
                ]}
                numberOfLines={1}
              >
                {item.lastMessage}
              </Text>
              
              {!item.read && (
                <View style={[styles.unreadBadge, { backgroundColor: colors.primary }]}>
                  <Text style={styles.unreadBadgeText}>
                    {t('messages.new')}
                  </Text>
                </View>
              )}
            </View>
          </TouchableOpacity>
        )}
      />

      {messages.length === 0 && (
        <View style={styles.emptyContainer}>
          <Text style={[styles.emptyText, { color: colors.textDim }]}>
            {t('messages.empty')}
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eaeaea',
  },
  headerTitle: {
    fontSize: 20,
    fontFamily: 'Poppins-SemiBold',
  },
  messagesList: {
    padding: 16,
  },
  messageItem: {
    flexDirection: 'row',
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
  },
  unreadMessage: {
    borderLeftWidth: 3,
    borderLeftColor: '#6A5ACD',
  },
  avatarContainer: {
    position: 'relative',
    marginRight: 12,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  onlineIndicator: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#4CAF50',
    borderWidth: 2,
    borderColor: 'white',
  },
  messageContent: {
    flex: 1,
    position: 'relative',
  },
  messageHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  senderName: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
  },
  messageTime: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
  },
  messagePreview: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
  },
  unreadBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10,
  },
  unreadBadgeText: {
    color: 'white',
    fontSize: 10,
    fontFamily: 'Inter-Medium',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 100,
  },
  emptyText: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
  },
});