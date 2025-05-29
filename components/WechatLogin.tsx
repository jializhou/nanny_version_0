import React, { useState, useEffect } from 'react';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Dimensions,
  Image
} from 'react-native';
import { useColorScheme } from 'react-native';
import Colors from '@/constants/Colors';
import { X } from 'lucide-react-native';
import QRCode from 'react-native-qrcode-svg';

interface WechatLoginProps {
  visible: boolean;
  onClose: () => void;
  onLoginSuccess: (token: string, user: any) => void;
}

export default function WechatLogin({ visible, onClose, onLoginSuccess }: WechatLoginProps) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const [isLoading, setIsLoading] = useState(true);
  const [qrCodeUrl, setQrCodeUrl] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (visible) {
      // 模拟获取二维码URL的过程
      setTimeout(() => {
        setQrCodeUrl('https://example.com/wechat-login-qr');
        setIsLoading(false);
      }, 1000);
    }
  }, [visible]);

  const handleClose = () => {
    setIsLoading(true);
    setQrCodeUrl('');
    setError('');
    onClose();
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={handleClose}
    >
      <TouchableOpacity 
        style={styles.overlay}
        activeOpacity={1}
        onPress={handleClose}
      >
        <TouchableOpacity 
          style={[styles.container, { backgroundColor: colors.background }]}
          activeOpacity={1}
          onPress={(e) => e.stopPropagation()}
        >
          <TouchableOpacity
            style={styles.closeButton}
            onPress={handleClose}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <X size={24} color={colors.text} />
          </TouchableOpacity>

          <View style={styles.content}>
            <Text style={[styles.title, { color: colors.text }]}>
              微信扫码登录
            </Text>
            
            {isLoading ? (
              <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color={colors.primary} />
                <Text style={[styles.loadingText, { color: colors.textDim }]}>
                  正在加载二维码...
                </Text>
              </View>
            ) : error ? (
              <View style={styles.errorContainer}>
                <Text style={[styles.errorText, { color: colors.error }]}>
                  {error}
                </Text>
                <TouchableOpacity
                  style={[styles.retryButton, { backgroundColor: colors.primary }]}
                  onPress={() => {
                    setIsLoading(true);
                    setError('');
                    // 重试加载二维码
                  }}
                >
                  <Text style={styles.retryText}>重试</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <View style={styles.qrContainer}>
                <QRCode
                  value={qrCodeUrl}
                  size={200}
                  color={colors.text}
                  backgroundColor={colors.background}
                />
                <Text style={[styles.hint, { color: colors.textDim }]}>
                  请使用微信扫描二维码登录
                </Text>
              </View>
            )}
          </View>
        </TouchableOpacity>
      </TouchableOpacity>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    width: Dimensions.get('window').width * 0.9,
    maxWidth: 400,
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
  },
  closeButton: {
    position: 'absolute',
    right: 16,
    top: 16,
    padding: 8,
    zIndex: 1,
  },
  content: {
    alignItems: 'center',
    width: '100%',
  },
  logo: {
    width: 60,
    height: 60,
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
    fontFamily: 'Poppins-SemiBold',
    marginBottom: 24,
  },
  loadingContainer: {
    alignItems: 'center',
    padding: 40,
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    fontFamily: 'Inter-Regular',
  },
  errorContainer: {
    alignItems: 'center',
    padding: 24,
  },
  errorText: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    marginBottom: 16,
    textAlign: 'center',
  },
  retryButton: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  retryText: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'Inter-Medium',
  },
  qrContainer: {
    alignItems: 'center',
    padding: 24,
  },
  hint: {
    marginTop: 16,
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    textAlign: 'center',
  },
}); 