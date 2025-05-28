import AsyncStorage from '@react-native-async-storage/async-storage';

interface LoginResponse {
  token: string;
  user: {
    id: string;
    phone: string;
    name: string;
    avatar?: string;
    profileImage?: string;
    userType?: 'employer' | 'caregiver';
  };
}

export async function sendVerificationCode(phone: string): Promise<boolean> {
  try {
    // TODO: 替换为实际的API调用
    // const response = await fetch('YOUR_API_ENDPOINT/send-code', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({ phone }),
    // });
    // return response.ok;

    // 模拟API调用
    console.log('Sending verification code to:', phone);
    return true;
  } catch (error) {
    console.error('Failed to send verification code:', error);
    return false;
  }
}

export async function verifyCodeAndLogin(phone: string, code: string): Promise<LoginResponse | null> {
  try {
    // TODO: 替换为实际的API调用
    // const response = await fetch('YOUR_API_ENDPOINT/verify-code', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({ phone, code }),
    // });
    // const data = await response.json();
    // return data;

    // 模拟API调用
    console.log('Verifying code for:', phone, code);
    
    // 模拟成功响应
    const mockResponse: LoginResponse = {
      token: 'mock_token_' + Date.now(),
      user: {
        id: 'user_' + Date.now(),
        phone,
        name: '用户' + phone.slice(-4),
        userType: 'employer',
        profileImage: 'https://images.pexels.com/photos/3771836/pexels-photo-3771836.jpeg'
      }
    };

    return mockResponse;
  } catch (error) {
    console.error('Failed to verify code:', error);
    return null;
  }
}

export async function loginWithWechat(): Promise<LoginResponse | null> {
  try {
    // TODO: 实现微信登录
    // 1. 调用微信SDK获取授权码
    // 2. 将授权码发送到服务器
    // 3. 获取登录token和用户信息

    // 模拟成功登录
    const mockResponse: LoginResponse = {
      token: 'wechat_token_' + Date.now(),
      user: {
        id: 'wechat_user_' + Date.now(),
        phone: '',
        name: '微信用户',
        userType: 'employer',
        profileImage: 'https://images.pexels.com/photos/3771836/pexels-photo-3771836.jpeg'
      }
    };

    return mockResponse;
  } catch (error) {
    console.error('Failed to login with WeChat:', error);
    return null;
  }
} 