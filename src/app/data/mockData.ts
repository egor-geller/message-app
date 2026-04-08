import { User, Chat, Message } from '../types';

export const currentUser: User = {
  id: 'user-1',
  name: 'You',
  status: 'online',
};

export const users: User[] = [
  {
    id: 'user-2',
    name: 'Sarah Johnson',
    status: 'online',
    email: 'sarah.johnson@company.com',
    department: 'Product Management',
    position: 'Senior Product Manager',
    phone: '+1 (555) 123-4567',
  },
  {
    id: 'user-3',
    name: 'Mike Chen',
    status: 'away',
    lastSeen: new Date(Date.now() - 1000 * 60 * 15),
    email: 'mike.chen@company.com',
    department: 'Design',
    position: 'Lead UX Designer',
    phone: '+1 (555) 234-5678',
  },
  {
    id: 'user-4',
    name: 'Emily Rodriguez',
    status: 'online',
    email: 'emily.rodriguez@company.com',
    department: 'Marketing',
    position: 'Marketing Director',
    phone: '+1 (555) 345-6789',
  },
  {
    id: 'user-5',
    name: 'James Wilson',
    status: 'offline',
    lastSeen: new Date(Date.now() - 1000 * 60 * 60 * 2),
    email: 'james.wilson@company.com',
    department: 'Marketing',
    position: 'Social Media Manager',
    phone: '+1 (555) 456-7890',
  },
  {
    id: 'user-6',
    name: 'Lisa Anderson',
    status: 'online',
    email: 'lisa.anderson@company.com',
    department: 'Marketing',
    position: 'Content Strategist',
    phone: '+1 (555) 567-8901',
  },
  {
    id: 'user-7',
    name: 'David Kim',
    status: 'offline',
    lastSeen: new Date(Date.now() - 1000 * 60 * 60 * 24),
    email: 'david.kim@company.com',
    department: 'Engineering',
    position: 'Senior Software Engineer',
    phone: '+1 (555) 678-9012',
  },
  {
    id: 'user-8',
    name: 'Maria Garcia',
    status: 'online',
    email: 'maria.garcia@company.com',
    department: 'Engineering',
    position: 'Tech Lead',
    phone: '+1 (555) 789-0123',
  },
  {
    id: 'user-9',
    name: 'Tom Brown',
    status: 'away',
    email: 'tom.brown@company.com',
    department: 'Engineering',
    position: 'Backend Developer',
    phone: '+1 (555) 890-1234',
  },
  {
    id: 'user-10',
    name: 'Anna Lee',
    status: 'online',
    email: 'anna.lee@company.com',
    department: 'Engineering',
    position: 'Frontend Developer',
    phone: '+1 (555) 901-2345',
  },
  {
    id: 'user-11',
    name: 'Marketing Team',
    status: 'online',
  },
  {
    id: 'user-12',
    name: 'Development Team',
    status: 'online',
  },
];

export const messages: Message[] = [
  // Chat 1: Sarah Johnson
  {
    id: 'msg-1',
    chatId: 'chat-1',
    senderId: 'user-2',
    content: 'Hey! Did you see the latest project updates?',
    timestamp: new Date(Date.now() - 1000 * 60 * 5),
    status: 'read',
    type: 'text',
  },
  {
    id: 'msg-2',
    chatId: 'chat-1',
    senderId: 'user-1',
    content: 'Yes, I just finished reviewing them. Looks great!',
    timestamp: new Date(Date.now() - 1000 * 60 * 3),
    status: 'read',
    type: 'text',
  },
  {
    id: 'msg-3',
    chatId: 'chat-1',
    senderId: 'user-2',
    content: 'Perfect! Can we schedule a meeting for tomorrow?',
    timestamp: new Date(Date.now() - 1000 * 30),
    status: 'delivered',
    type: 'text',
  },

  // Chat 2: Mike Chen
  {
    id: 'msg-4',
    chatId: 'chat-2',
    senderId: 'user-3',
    content: 'The presentation slides are ready',
    timestamp: new Date(Date.now() - 1000 * 60 * 45),
    status: 'read',
    type: 'text',
  },
  {
    id: 'msg-5',
    chatId: 'chat-2',
    senderId: 'user-1',
    content: 'Thanks! I\'ll review them this afternoon',
    timestamp: new Date(Date.now() - 1000 * 60 * 44),
    status: 'delivered',
    type: 'text',
  },

  // Chat 3: Marketing Team
  {
    id: 'msg-6',
    chatId: 'chat-3',
    senderId: 'user-4',
    content: 'Everyone, please review the Q1 campaign strategy',
    timestamp: new Date(Date.now() - 1000 * 60 * 120),
    status: 'read',
    type: 'text',
  },
  {
    id: 'msg-7',
    chatId: 'chat-3',
    senderId: 'user-5',
    content: 'Looking good! I have some suggestions for the social media section',
    timestamp: new Date(Date.now() - 1000 * 60 * 115),
    status: 'read',
    type: 'text',
  },
  {
    id: 'msg-8',
    chatId: 'chat-3',
    senderId: 'user-1',
    content: 'I agree with James. Let\'s discuss in tomorrow\'s standup',
    timestamp: new Date(Date.now() - 1000 * 60 * 20),
    status: 'read',
    type: 'text',
  },
  {
    id: 'msg-9',
    chatId: 'chat-3',
    senderId: 'user-6',
    content: 'Sounds good! See you all tomorrow 👍',
    timestamp: new Date(Date.now() - 1000 * 60 * 8),
    status: 'delivered',
    type: 'text',
  },

  // Chat 4: Emily Rodriguez
  {
    id: 'msg-10',
    chatId: 'chat-4',
    senderId: 'user-4',
    content: 'Quick question about the budget allocation',
    timestamp: new Date(Date.now() - 1000 * 60 * 180),
    status: 'read',
    type: 'text',
  },

  // Chat 5: Development Team
  {
    id: 'msg-11',
    chatId: 'chat-5',
    senderId: 'user-7',
    content: 'Code review for PR #234 is complete',
    timestamp: new Date(Date.now() - 1000 * 60 * 240),
    status: 'read',
    type: 'text',
  },
  {
    id: 'msg-12',
    chatId: 'chat-5',
    senderId: 'user-8',
    content: 'Great work! Merging now',
    timestamp: new Date(Date.now() - 1000 * 60 * 238),
    status: 'read',
    type: 'text',
  },
  {
    id: 'msg-13',
    chatId: 'chat-5',
    senderId: 'user-1',
    content: 'Deployed to staging successfully ✅',
    timestamp: new Date(Date.now() - 1000 * 60 * 60),
    status: 'read',
    type: 'text',
  },
  
  // Chat 6: Product Strategy Team (where user-1 is admin)
  {
    id: 'msg-14',
    chatId: 'chat-6',
    senderId: 'user-1',
    content: 'Welcome to the Product Strategy team! Let\'s align on our Q2 roadmap.',
    timestamp: new Date(Date.now() - 1000 * 60 * 90),
    status: 'read',
    type: 'text',
  },
  {
    id: 'msg-15',
    chatId: 'chat-6',
    senderId: 'user-2',
    content: 'Thanks for creating this group! Looking forward to collaborating.',
    timestamp: new Date(Date.now() - 1000 * 60 * 85),
    status: 'read',
    type: 'text',
  },
  {
    id: 'msg-16',
    chatId: 'chat-6',
    senderId: 'user-3',
    content: 'I\'ve prepared some initial design concepts we can review.',
    timestamp: new Date(Date.now() - 1000 * 60 * 25),
    status: 'delivered',
    type: 'text',
  },
  
  // Media messages for search demo
  {
    id: 'msg-photo-1',
    chatId: 'chat-1',
    senderId: 'user-2',
    content: 'Check out this design mockup',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3),
    status: 'read',
    type: 'image',
    fileUrl: 'https://images.unsplash.com/photo-1618477388954-7852f32655ec',
    fileName: 'design-mockup.png',
  },
  {
    id: 'msg-photo-2',
    chatId: 'chat-1',
    senderId: 'user-1',
    content: 'Team photo from last week',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7),
    status: 'read',
    type: 'image',
    fileUrl: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c',
    fileName: 'team-photo.jpg',
  },
  {
    id: 'msg-video-1',
    chatId: 'chat-1',
    senderId: 'user-2',
    content: 'Product demo video',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5),
    status: 'read',
    type: 'video',
    fileUrl: 'https://sample-videos.com/video.mp4',
    fileName: 'product-demo.mp4',
    duration: 125,
    thumbnailUrl: 'https://images.unsplash.com/photo-1536240478700-b869070f9279',
  },
  {
    id: 'msg-video-2',
    chatId: 'chat-3',
    senderId: 'user-4',
    content: 'Marketing campaign preview',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2),
    status: 'read',
    type: 'video',
    fileUrl: 'https://sample-videos.com/campaign.mp4',
    fileName: 'campaign-preview.mp4',
    duration: 90,
    thumbnailUrl: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113',
  },
  {
    id: 'msg-voice-1',
    chatId: 'chat-1',
    senderId: 'user-2',
    content: 'Voice message',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 12),
    status: 'read',
    type: 'voice',
    duration: 45,
  },
  {
    id: 'msg-voice-2',
    chatId: 'chat-3',
    senderId: 'user-5',
    content: 'Voice note about strategy',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24),
    status: 'read',
    type: 'voice',
    duration: 120,
  },
  {
    id: 'msg-link-1',
    chatId: 'chat-1',
    senderId: 'user-2',
    content: 'Check out this article',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 4),
    status: 'read',
    type: 'link',
    linkUrl: 'https://www.figma.com/blog/design-systems',
    linkTitle: 'Building Better Design Systems',
    linkDescription: 'Learn how to create scalable and maintainable design systems for your team',
  },
  {
    id: 'msg-link-2',
    chatId: 'chat-3',
    senderId: 'user-4',
    content: 'Interesting read on marketing trends',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 6),
    status: 'read',
    type: 'link',
    linkUrl: 'https://www.hubspot.com/marketing-statistics',
    linkTitle: 'Marketing Statistics 2026',
    linkDescription: 'The latest data and trends shaping digital marketing',
  },
  {
    id: 'msg-link-3',
    chatId: 'chat-5',
    senderId: 'user-7',
    content: 'Great tutorial on React performance',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 48),
    status: 'read',
    type: 'link',
    linkUrl: 'https://react.dev/learn',
    linkTitle: 'React Performance Optimization',
    linkDescription: 'Advanced techniques for building faster React applications',
  },
];

export const chats: Chat[] = [
  {
    id: 'chat-1',
    type: 'direct',
    participants: ['user-1', 'user-2'],
    lastMessage: messages.find(m => m.id === 'msg-3'),
    unreadCount: 1,
    isTyping: false,
  },
  {
    id: 'chat-2',
    type: 'direct',
    participants: ['user-1', 'user-3'],
    lastMessage: messages.find(m => m.id === 'msg-5'),
    unreadCount: 0,
    isTyping: false,
  },
  {
    id: 'chat-3',
    type: 'group',
    name: 'Marketing Team',
    participants: ['user-1', 'user-4', 'user-5', 'user-6'],
    lastMessage: messages.find(m => m.id === 'msg-9'),
    unreadCount: 2,
    isTyping: true,
    description: 'Collaborate on marketing campaigns, share ideas, and coordinate promotional activities.',
    createdBy: 'user-4', // Emily Rodriguez created this group
  },
  {
    id: 'chat-4',
    type: 'direct',
    participants: ['user-1', 'user-4'],
    lastMessage: messages.find(m => m.id === 'msg-10'),
    unreadCount: 0,
    isTyping: false,
  },
  {
    id: 'chat-5',
    type: 'group',
    name: 'Development Team',
    participants: ['user-1', 'user-7', 'user-8', 'user-9', 'user-10'],
    lastMessage: messages.find(m => m.id === 'msg-13'),
    unreadCount: 0,
    isTyping: false,
    description: 'Development team coordination, code reviews, technical discussions, and sprint planning.',
    createdBy: 'user-8', // Maria Garcia created this group
  },
  {
    id: 'chat-6',
    type: 'group',
    name: 'Product Strategy Team',
    participants: ['user-1', 'user-2', 'user-3'],
    lastMessage: messages.find(m => m.id === 'msg-16'),
    unreadCount: 0,
    isTyping: false,
    description: 'Align on product strategy, roadmap, and feature development.',
    createdBy: 'user-1', // You created this group
  },
];

export function getUserById(id: string): User | undefined {
  if (id === 'user-1') return currentUser;
  return users.find(u => u.id === id);
}

export function getChatName(chat: Chat): string {
  if (chat.type === 'group') {
    return chat.name || 'Group Chat';
  }
  const otherUserId = chat.participants.find(p => p !== currentUser.id);
  const otherUser = getUserById(otherUserId || '');
  return otherUser?.name || 'Unknown';
}

export function getMessagesByChat(chatId: string): Message[] {
  return messages.filter(m => m.chatId === chatId).sort((a, b) => 
    a.timestamp.getTime() - b.timestamp.getTime()
  );
}

export function getMediaByType(chatId: string, type: 'image' | 'video' | 'voice' | 'link'): Message[] {
  return messages
    .filter(m => m.chatId === chatId && m.type === type)
    .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
}

export function getAllUsers(): User[] {
  return [currentUser, ...users];
}