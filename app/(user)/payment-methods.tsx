'use client';

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useColorScheme } from 'react-native';
import Colors from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';

interface PaymentMethod {
  id: string;
  name: string;
  icon: keyof typeof Ionicons.glyphMap;
  isBound: boolean;
}

export default function PaymentMethodsPage() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  const paymentMethods: PaymentMethod[] = [
    {
      id: 'wechat',
      name: '微信支付',
      icon: 'logo-wechat',
      isBound: true,
    },
    {
      id: 'alipay',
      name: '支付宝',
      icon: 'wallet-outline',
      isBound: false,
    },
    {
      id: 'bank',
      name: '银行卡',
      icon: 'card-outline',
      isBound: true,
    },
  ];

  const handlePaymentMethodPress = (method: PaymentMethod) => {
    if (method.isBound) {
      Alert.alert('提示', `确定要解绑${method.name}吗？`, [
        {
          text: '取消',
          style: 'cancel',
        },
        {
          text: '确定',
          onPress: () => {
            // TODO: 实现解绑逻辑
            Alert.alert('提示', '解绑功能即将上线');
          },
        },
      ]);
    } else {
      Alert.alert('提示', `绑定${method.name}功能即将上线`);
    }
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
          支付方式
        </Text>
      </View>

      <View style={styles.content}>
        <View style={[styles.card, { backgroundColor: colors.card }]}>
          {paymentMethods.map((method, index) => (
            <React.Fragment key={method.id}>
              <TouchableOpacity
                style={styles.methodItem}
                onPress={() => handlePaymentMethodPress(method)}
              >
                <View style={styles.methodInfo}>
                  <Ionicons name={method.icon} size={24} color={colors.primary} />
                  <Text style={[styles.methodName, { color: colors.text }]}>
                    {method.name}
                  </Text>
                </View>
                <View style={styles.methodStatus}>
                  <Text style={[styles.statusText, { 
                    color: method.isBound ? colors.primary : colors.textDim 
                  }]}>
                    {method.isBound ? '已绑定' : '未绑定'}
                  </Text>
                  <Ionicons 
                    name="chevron-forward" 
                    size={20} 
                    color={colors.textDim}
                  />
                </View>
              </TouchableOpacity>
              {index < paymentMethods.length - 1 && (
                <View style={[styles.divider, { backgroundColor: colors.border }]} />
              )}
            </React.Fragment>
          ))}
        </View>
      </View>
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
  card: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  methodItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
  },
  methodInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  methodName: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    marginLeft: 12,
  },
  methodStatus: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    marginRight: 4,
  },
  divider: {
    height: 1,
    backgroundColor: '#eaeaea',
  },
}); 