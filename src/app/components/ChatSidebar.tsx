import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router';
import { Search, Settings, MessageSquarePlus } from 'lucide-react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Avatar, AvatarFallback } from './ui/avatar';
import { chats, getChatName, getUserById, currentUser } from '../data/mockData';
import { ScrollArea } from './ui/scroll-area';
import { formatDistanceToNow } from 'date-fns';
import { useLanguage } from '../context/LanguageContext';

export function ChatSidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  
  const filteredChats = chats.filter(chat => {
    const chatName = getChatName(chat);
    return chatName.toLowerCase().includes(searchQuery.toLowerCase());
  });

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  const formatMessageTime = (date?: Date) => {
    if (!date) return '';
    const now = new Date();
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);
    
    if (diffInHours < 24) {
      return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
    } else if (diffInHours < 48) {
      return 'Yesterday';
    } else {
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    }
  };

  const SidebarMenu = () => (
    <div className="p-4 space-y-2 border-b">
      <Button
        variant="ghost"
        className="w-full justify-start"
        onClick={() => navigate('/settings')}
      >
        <Settings className="mr-2 h-4 w-4" />
        Settings
      </Button>
    </div>
  );

  return (
    <div className="flex flex-col h-full bg-background">
      {/* Header */}
      <div className="p-4 border-b space-y-4 flex-shrink-0">
        <div className="flex items-center justify-between">
          <h1 className="text-xl">{t('chats')}</h1>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate('/new-chat')}
              title={t('newChat')}
            >
              <MessageSquarePlus className="h-5 w-5" />
            </Button>
          </div>
        </div>
        
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder={t('searchChats')}
            className="pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Chat List */}
      <ScrollArea className="flex-1 overflow-y-auto">
        <div className="divide-y">
          {filteredChats.map(chat => {
            const chatName = getChatName(chat);
            const isActive = location.pathname === `/chat/${chat.id}`;
            const otherUserId = chat.type === 'direct' 
              ? chat.participants.find(p => p !== currentUser.id)
              : undefined;
            const otherUser = otherUserId ? getUserById(otherUserId) : undefined;
            
            return (
              <button
                key={chat.id}
                onClick={() => navigate(`/chat/${chat.id}`)}
                className={`w-full p-4 hover:bg-accent transition-colors text-left ${
                  isActive ? 'bg-accent' : ''
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="relative">
                    <Avatar className="h-12 w-12">
                      <AvatarFallback>{getInitials(chatName)}</AvatarFallback>
                    </Avatar>
                    {chat.type === 'direct' && otherUser?.status === 'online' && (
                      <div className="absolute bottom-0 right-0 h-3 w-3 bg-green-500 rounded-full border-2 border-background" />
                    )}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-medium truncate">{chatName}</span>
                      <span className="text-xs text-muted-foreground flex-shrink-0 ml-2">
                        {formatMessageTime(chat.lastMessage?.timestamp)}
                      </span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex-1 min-w-0">
                        {chat.isTyping ? (
                          <span className="text-sm text-green-600">typing...</span>
                        ) : (
                          <p className="text-sm text-muted-foreground truncate">
                            {chat.lastMessage?.senderId === currentUser.id && `${t('you')}: `}
                            {chat.lastMessage?.content || 'No messages yet'}
                          </p>
                        )}
                      </div>
                      {chat.unreadCount > 0 && (
                        <div className="ml-2 flex-shrink-0 h-5 min-w-5 px-1 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs">
                          {chat.unreadCount}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </ScrollArea>

      {/* Account and Settings - Now using flex-shrink-0 instead of absolute positioning */}
      <div className="flex-shrink-0 p-4 bg-background border-t">
        <button
          onClick={() => navigate('/settings')}
          className="flex items-center gap-3 w-full hover:bg-accent rounded-lg p-2 transition-colors"
        >
          <Avatar className="h-10 w-10">
            <AvatarFallback>{getInitials(currentUser.name === 'You' ? t('you') : currentUser.name)}</AvatarFallback>
          </Avatar>
          <div className="flex-1 text-left">
            <div className="font-medium">{currentUser.name === 'You' ? t('you') : currentUser.name}</div>
            <div className="text-xs text-muted-foreground capitalize">{currentUser.status}</div>
          </div>
          <Settings className="h-5 w-5 text-muted-foreground" />
        </button>
      </div>
    </div>
  );
}