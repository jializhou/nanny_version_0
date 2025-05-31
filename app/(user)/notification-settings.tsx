'use client';

import * as React from 'react';
import type { ViewProps, ViewStyle } from 'react-native';
import {
  View,
  Text,
  StyleSheet,
  Switch,
  TouchableOpacity,
  Platform,
  ScrollView,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useColorScheme } from 'react-native';
import Colors from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';

interface NotificationSetting {
  id: string;
  title: string;
  description: string;
  enabled: boolean;
  items?: {
    id: string;
    title: string;
    enabled: boolean;
  }[];
}

interface ModuleCardProps extends ViewProps {
  setting: NotificationSetting;
  masterEnabled: boolean;
  onModuleSwitch: (moduleId: string, value: boolean) => void;
  onItemSwitch: (moduleId: string, itemId: string, value: boolean) => void;
  style?: ViewStyle;
}

const ModuleCard: React.FC<ModuleCardProps> = ({
  setting,
  masterEnabled,
  onModuleSwitch,
  onItemSwitch,
  style,
  ...props
}) => {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  return (
    <View style={[styles.moduleCard, style]} {...props}>
      <View style={styles.moduleHeader}>
        <View style={styles.moduleInfo}>
          <Text style={[styles.moduleTitle, { color: colors.text }]}>
            {setting.title}
          </Text>
          <Text style={[styles.moduleDescription, { color: colors.textDim }]}>
            {setting.description}
          </Text>
        </View>
        <Switch
          value={setting.enabled && masterEnabled}
          onValueChange={(value) => onModuleSwitch(setting.id, value)}
          trackColor={{ false: '#d1d1d1', true: colors.primaryLight }}
          thumbColor={setting.enabled ? colors.primary : '#f4f3f4'}
          ios_backgroundColor="#d1d1d1"
          disabled={!masterEnabled}
        />
      </View>

      {setting.items?.map((item, index: number) => (
        <React.Fragment key={item.id}>
          <View style={[styles.divider, { backgroundColor: colors.border }]} />
          <View style={styles.itemRow}>
            <Text style={[styles.itemTitle, { color: colors.text }]}>
              {item.title}
            </Text>
            <Switch
              value={item.enabled && setting.enabled && masterEnabled}
              onValueChange={(value) => onItemSwitch(setting.id, item.id, value)}
              trackColor={{ false: '#d1d1d1', true: colors.primaryLight }}
              thumbColor={item.enabled ? colors.primary : '#f4f3f4'}
              ios_backgroundColor="#d1d1d1"
              disabled={!setting.enabled || !masterEnabled}
            />
          </View>
        </React.Fragment>
      ))}
    </View>
  );
};

export default function NotificationSettingsPage() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  const [masterSwitch, setMasterSwitch] = React.useState(true);
  const [settings, setSettings] = React.useState<NotificationSetting[]>([
    {
      id: 'interaction',
      title: '互动消息',
      description: '留言、回复等互动提醒',
      enabled: true,
      items: [
        { id: 'comments', title: '留言提醒', enabled: true },
        { id: 'replies', title: '回复提醒', enabled: true },
        { id: 'likes', title: '点赞提醒', enabled: true },
      ],
    },
    {
      id: 'system',
      title: '通知消息',
      description: '平台通知、权益提醒等系统消息',
      enabled: true,
      items: [
        { id: 'platform', title: '平台通知', enabled: true },
        { id: 'benefits', title: '权益提醒', enabled: true },
        { id: 'updates', title: '版本更新', enabled: true },
      ],
    },
    {
      id: 'follow',
      title: '关注消息',
      description: '收藏的帖子更新提醒',
      enabled: true,
      items: [
        { id: 'favorites', title: '收藏更新', enabled: true },
        { id: 'follows', title: '关注动态', enabled: true },
      ],
    },
  ]);

  const handleMasterSwitch = (value: boolean) => {
    setMasterSwitch(value);
    setSettings(prevSettings =>
      prevSettings.map(setting => ({
        ...setting,
        enabled: value,
        items: setting.items?.map(item => ({ ...item, enabled: value })),
      }))
    );
  };

  const handleModuleSwitch = (moduleId: string, value: boolean) => {
    setSettings(prevSettings =>
      prevSettings.map(setting =>
        setting.id === moduleId
          ? {
              ...setting,
              enabled: value,
              items: setting.items?.map(item => ({ ...item, enabled: value })),
            }
          : setting
      )
    );
  };

  const handleItemSwitch = (moduleId: string, itemId: string, value: boolean) => {
    setSettings(prevSettings =>
      prevSettings.map(setting =>
        setting.id === moduleId
          ? {
              ...setting,
              items: setting.items?.map(item =>
                item.id === itemId ? { ...item, enabled: value } : item
              ),
            }
          : setting
      )
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={[styles.header, { backgroundColor: colors.card }]}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.text }]}>
          通知设置
        </Text>
      </View>

      <ScrollView style={styles.content}>
        <View style={[styles.masterSwitch, { backgroundColor: colors.card }]}>
          <View style={styles.switchContent}>
            <Text style={[styles.masterTitle, { color: colors.text }]}>
              接收消息通知
            </Text>
            <Text style={[styles.masterDescription, { color: colors.textDim }]}>
              开启后可以接收到重要消息提醒
            </Text>
          </View>
          <Switch
            value={masterSwitch}
            onValueChange={handleMasterSwitch}
            trackColor={{ false: '#d1d1d1', true: colors.primaryLight }}
            thumbColor={masterSwitch ? colors.primary : '#f4f3f4'}
            ios_backgroundColor="#d1d1d1"
          />
        </View>

        {settings.map(setting => (
          <ModuleCard
            key={setting.id}
            setting={setting}
            masterEnabled={masterSwitch}
            onModuleSwitch={handleModuleSwitch}
            onItemSwitch={handleItemSwitch}
            style={{ backgroundColor: colors.card }}
          />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    paddingTop: Platform.OS === 'ios' ? 60 : 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eaeaea',
  },
  backButton: {
    padding: 8,
    marginRight: 16,
  },
  headerTitle: {
    flex: 1,
    fontSize: 20,
    fontFamily: 'Poppins-SemiBold',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  masterSwitch: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
  },
  switchContent: {
    flex: 1,
    marginRight: 16,
  },
  masterTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    marginBottom: 4,
  },
  masterDescription: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
  },
  moduleCard: {
    borderRadius: 12,
    marginBottom: 16,
    overflow: 'hidden',
  },
  moduleHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
  },
  moduleInfo: {
    flex: 1,
    marginRight: 16,
  },
  moduleTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    marginBottom: 4,
  },
  moduleDescription: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
  },
  divider: {
    height: 1,
    backgroundColor: '#eaeaea',
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
  },
  itemTitle: {
    fontSize: 15,
    fontFamily: 'Inter-Regular',
  },
}); 