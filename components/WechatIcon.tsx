import React from 'react';
import { View } from 'react-native';
import { Wechat } from 'lucide-react-native';

interface WechatIconProps {
  size?: number;
  color?: string;
}

export default function WechatIcon({ size = 24, color = 'white' }: WechatIconProps) {
  return (
    <View>
      <Wechat size={size} color={color} />
    </View>
  );
} 