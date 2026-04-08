export interface User {
  id: string;
  name: string;
  avatar?: string;
  status: 'online' | 'offline' | 'away';
  lastSeen?: Date;
  email?: string;
  department?: string;
  position?: string;
  phone?: string;
}

export interface Message {
  id: string;
  chatId: string;
  senderId: string;
  content: string;
  timestamp: Date;
  status: 'sent' | 'delivered' | 'read';
  type: 'text' | 'image' | 'file' | 'video' | 'voice' | 'link';
  fileUrl?: string;
  fileName?: string;
  thumbnailUrl?: string;
  duration?: number; // for voice/video in seconds
  linkUrl?: string;
  linkTitle?: string;
  linkDescription?: string;
}

export interface Chat {
  id: string;
  type: 'direct' | 'group';
  name?: string;
  participants: string[];
  lastMessage?: Message;
  unreadCount: number;
  avatar?: string;
  isTyping?: boolean;
  description?: string; // for group chats
  createdBy?: string; // admin/creator of the group chat
}