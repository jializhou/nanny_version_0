'use client';

import React from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Divider,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';

interface UserInfo {
  username: string;
  phone: string;
  wechat: string;
  email: string;
}

const maskString = (str: string, start: number = 3, end: number = 4): string => {
  if (!str) return '';
  const length = str.length;
  const maskedLength = length - start - end;
  if (maskedLength <= 0) return str;
  return str.substring(0, start) + '*'.repeat(maskedLength) + str.substring(length - end);
};

export default function ProfilePage() {
  const theme = useTheme();
  const [showSensitive, setShowSensitive] = React.useState<Record<string, boolean>>({
    phone: false,
    wechat: false,
    email: false,
  });

  // 模拟用户数据，实际应用中应该从API获取
  const userInfo: UserInfo = {
    username: '张三',
    phone: '13812345678',
    wechat: 'wxid_abc123',
    email: 'zhangsan@example.com',
  };

  const toggleVisibility = (field: string) => {
    setShowSensitive(prev => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const renderSensitiveInfo = (label: string, value: string, field: keyof typeof showSensitive) => (
    <>
      <ListItem
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          py: 2,
        }}
      >
        <ListItemText
          primary={
            <Typography variant="body1" color="text.primary">
              {label}
            </Typography>
          }
          secondary={
            <Typography variant="body2" color="text.secondary">
              {showSensitive[field] ? value : maskString(value)}
            </Typography>
          }
        />
        <IconButton onClick={() => toggleVisibility(field)} edge="end">
          {showSensitive[field] ? <VisibilityOff /> : <Visibility />}
        </IconButton>
      </ListItem>
      <Divider />
    </>
  );

  return (
    <Box sx={{ p: 2, maxWidth: 600, mx: 'auto' }}>
      <Typography variant="h5" sx={{ mb: 3 }}>
        个人信息
      </Typography>
      <Card elevation={2}>
        <CardContent>
          <List sx={{ width: '100%' }}>
            <ListItem>
              <ListItemText
                primary={
                  <Typography variant="body1" color="text.primary">
                    用户名
                  </Typography>
                }
                secondary={
                  <Typography variant="body2" color="text.secondary">
                    {userInfo.username}
                  </Typography>
                }
              />
            </ListItem>
            <Divider />
            {renderSensitiveInfo('手机号码', userInfo.phone, 'phone')}
            {renderSensitiveInfo('微信号', userInfo.wechat, 'wechat')}
            {renderSensitiveInfo('邮箱', userInfo.email, 'email')}
          </List>
        </CardContent>
      </Card>
    </Box>
  );
} 