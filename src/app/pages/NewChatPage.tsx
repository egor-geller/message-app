import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { ArrowLeft, Search, Users } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Avatar, AvatarFallback } from '../components/ui/avatar';
import { ScrollArea } from '../components/ui/scroll-area';
import { users, currentUser, chats } from '../data/mockData';
import { Checkbox } from '../components/ui/checkbox';
import { useLanguage } from '../context/LanguageContext';

export function NewChatPage() {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [isGroupMode, setIsGroupMode] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  
  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  const handleUserSelect = (userId: string) => {
    if (isGroupMode) {
      setSelectedUsers(prev => 
        prev.includes(userId) 
          ? prev.filter(id => id !== userId)
          : [...prev, userId]
      );
    } else {
      // Find or create direct chat
      const existingChat = chats.find(chat => 
        chat.type === 'direct' && 
        chat.participants.includes(userId) && 
        chat.participants.includes(currentUser.id)
      );
      
      if (existingChat) {
        navigate(`/chat/${existingChat.id}`);
      } else {
        // In a real app, this would create a new chat
        navigate('/');
      }
    }
  };

  const handleCreateGroup = () => {
    if (selectedUsers.length >= 2) {
      // In a real app, this would create a new group chat
      navigate('/');
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="border-b p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate('/')}
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-xl">
              {isGroupMode ? t('newGroupChat') : t('newChat')}
            </h1>
          </div>
          
          <Button
            variant={isGroupMode ? 'default' : 'outline'}
            size="sm"
            onClick={() => {
              setIsGroupMode(!isGroupMode);
              setSelectedUsers([]);
            }}
          >
            <Users className="h-4 w-4 mr-2" />
            {isGroupMode ? t('cancelGroup') : t('newGroup')}
          </Button>
        </div>
        
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder={t('searchContacts')}
            className="pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        {isGroupMode && selectedUsers.length > 0 && (
          <div className="mt-4 flex items-center justify-between">
            <span className="text-sm text-muted-foreground">
              {selectedUsers.length} {t('selected')}
            </span>
            <Button 
              onClick={handleCreateGroup}
              disabled={selectedUsers.length < 2}
            >
              {t('createGroup')}
            </Button>
          </div>
        )}
      </div>

      {/* Contacts List */}
      <ScrollArea className="flex-1">
        <div className="divide-y">
          {filteredUsers.map(user => {
            const isSelected = selectedUsers.includes(user.id);
            
            return (
              <div
                key={user.id}
                onClick={() => handleUserSelect(user.id)}
                className="w-full p-4 hover:bg-accent transition-colors cursor-pointer flex items-center gap-3"
              >
                {isGroupMode && (
                  <Checkbox
                    checked={isSelected}
                    onCheckedChange={() => handleUserSelect(user.id)}
                  />
                )}
                
                <div className="relative">
                  <Avatar className="h-12 w-12">
                    <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
                  </Avatar>
                  {user.status === 'online' && (
                    <div className="absolute bottom-0 right-0 h-3 w-3 bg-green-500 rounded-full border-2 border-background" />
                  )}
                </div>
                
                <div className="flex-1">
                  <div className="font-medium">{user.name}</div>
                  <div className="text-sm text-muted-foreground">
                    {t(user.status)}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </ScrollArea>
    </div>
  );
}