export const messages = [
  {
    id: '1',
    sender: '王阿姨',
    avatar: 'https://images.pexels.com/photos/3768167/pexels-photo-3768167.jpeg',
    lastMessage: '您好！我看到您发布的招聘信息了，我很感兴趣，方便详细了解一下吗？',
    timestamp: new Date(Date.now() - 15 * 60 * 1000), // 15 minutes ago
    read: false,
    online: true
  },
  {
    id: '2',
    sender: '张女士',
    avatar: 'https://images.pexels.com/photos/3771836/pexels-photo-3771836.jpeg',
    lastMessage: '王阿姨，您的简历我已经看过了，想请问您之前带过双胞胎的经验吗？',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    read: true,
    online: false
  },
  {
    id: '3',
    sender: '李阿姨',
    avatar: 'https://images.pexels.com/photos/3831612/pexels-photo-3831612.jpeg',
    lastMessage: '明天下午三点的面试我准时到，请问具体在哪个小区见面？',
    timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
    read: false,
    online: true
  },
  {
    id: '4',
    sender: '陈先生',
    avatar: 'https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg',
    lastMessage: '我们对您的工作经验很满意，想和您详细谈一下工资待遇问题。',
    timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
    read: true,
    online: false
  },
  {
    id: '5',
    sender: '刘女士',
    avatar: 'https://images.pexels.com/photos/3979287/pexels-photo-3979287.jpeg',
    lastMessage: '您好，我这边急需一位有经验的月嫂，您什么时候方便见面聊一下？',
    timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
    read: true,
    online: false
  }
];