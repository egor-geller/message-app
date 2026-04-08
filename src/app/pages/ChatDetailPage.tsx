import React, { useState, useRef, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Avatar, AvatarFallback } from '../components/ui/avatar';
import { ScrollArea } from '../components/ui/scroll-area';
import { Checkbox } from '../components/ui/checkbox';
import { Badge } from '../components/ui/badge';
import { 
  ArrowLeft, 
  MoreVertical, 
  Phone, 
  Video, 
  Send, 
  Paperclip, 
  Smile,
  Check,
  CheckCheck,
  Mail,
  Building,
  Briefcase,
  Phone as PhoneIcon,
  Search,
  Image as ImageIcon,
  FileVideo,
  Mic,
  Link as LinkIcon,
  Play,
  ExternalLink,
  Bell,
  BellOff,
  Clock,
  UserPlus,
  Users,
  X,
  Shield,
  MessageSquarePlus,
  Settings,
  Edit2
} from 'lucide-react';
import { Message } from '../types';
import { formatDistanceToNow } from 'date-fns';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '../components/ui/dialog';
import { SearchMessagesDialog } from '../components/SearchMessagesDialog';
import { 
  chats, 
  getChatName, 
  getUserById, 
  currentUser,
  getMessagesByChat,
  getMediaByType,
  getAllUsers
} from '../data/mockData';
import { useLanguage } from '../context/LanguageContext';

export function ChatDetailPage() {
  const { chatId } = useParams();
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [showProfileDialog, setShowProfileDialog] = useState(false);
  const [showSearchDialog, setShowSearchDialog] = useState(false);
  const [showMuteDialog, setShowMuteDialog] = useState(false);
  const [showAddMembersDialog, setShowAddMembersDialog] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [isEditingDescription, setIsEditingDescription] = useState(false);
  const [editedDescription, setEditedDescription] = useState('');
  const [isEditingName, setIsEditingName] = useState(false);
  const [editedName, setEditedName] = useState('');
  const [isEditingIcon, setIsEditingIcon] = useState(false);
  const [editedIcon, setEditedIcon] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);
  const descriptionInputRef = useRef<HTMLInputElement>(null);
  const nameInputRef = useRef<HTMLInputElement>(null);
  
  const chat = chats.find(c => c.id === chatId);
  
  // Check if current user is admin
  const isCurrentUserAdmin = chat?.type === 'group' && chat.createdBy === currentUser.id;
  
  useEffect(() => {
    if (chatId) {
      setMessages(getMessagesByChat(chatId));
    }
  }, [chatId]);
  
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  const scrollToBottom = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (!chat) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <p>Chat not found</p>
      </div>
    );
  }

  const chatName = getChatName(chat);
  const otherUserId = chat.type === 'direct' 
    ? chat.participants.find(p => p !== currentUser.id)
    : undefined;
  const otherUser = otherUserId ? getUserById(otherUserId) : undefined;
  
  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newMessage.trim()) return;
    
    const message: Message = {
      id: `msg-${Date.now()}`,
      chatId: chatId!,
      senderId: currentUser.id,
      content: newMessage,
      timestamp: new Date(),
      status: 'sent',
      type: 'text',
    };
    
    setMessages([...messages, message]);
    setNewMessage('');
  };

  const formatMessageTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
  };

  const getStatusIcon = (status: string) => {
    if (status === 'read') {
      return <CheckCheck className="h-4 w-4 text-blue-500" />;
    } else if (status === 'delivered') {
      return <CheckCheck className="h-4 w-4 text-muted-foreground" />;
    } else {
      return <Check className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const getStatusText = () => {
    if (chat.isTyping) {
      return t('typing');
    }
    if (chat.type === 'group') {
      return `${chat.participants.length} ${t('members').toLowerCase()}`;
    }
    if (otherUser?.status === 'online') {
      return t('online');
    }
    if (otherUser?.lastSeen) {
      return `last seen ${formatDistanceToNow(otherUser.lastSeen, { addSuffix: true })}`;
    }
    return t('offline');
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="border-b p-4 flex items-center justify-between bg-background flex-shrink-0">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => navigate('/')}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          
          <div 
            className="flex items-center gap-3 cursor-pointer hover:bg-muted/50 rounded-lg p-2 -m-2 transition-colors"
            onClick={() => setShowProfileDialog(true)}
          >
            <div className="relative">
              <Avatar className="h-10 w-10">
                <AvatarFallback>{getInitials(chatName)}</AvatarFallback>
              </Avatar>
              {chat.type === 'direct' && otherUser?.status === 'online' && (
                <div className="absolute bottom-0 right-0 h-3 w-3 bg-green-500 rounded-full border-2 border-background" />
              )}
            </div>
            
            <div>
              <div>{chatName}</div>
              <div className="text-sm text-muted-foreground">
                {getStatusText()}
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="hidden md:flex">
            <Video className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="hidden md:flex">
            <Phone className="h-5 w-5" />
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <MoreVertical className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setShowProfileDialog(true)}>
                {chat.type === 'group' ? t('info') : t('viewProfile')}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setShowSearchDialog(true)}>{t('searchMessages')}</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setShowMuteDialog(true)}>{t('muteNotifications')}</DropdownMenuItem>
              <DropdownMenuItem className="text-destructive">{t('deleteChat')}</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="space-y-4 max-w-4xl mx-auto">
          {messages.map((message, index) => {
            const isCurrentUser = message.senderId === currentUser.id;
            const sender = getUserById(message.senderId);
            const showSenderName = chat.type === 'group' && !isCurrentUser;
            const showDateSeparator = index === 0 || 
              new Date(messages[index - 1].timestamp).toDateString() !== new Date(message.timestamp).toDateString();
            
            return (
              <div key={message.id}>
                {showDateSeparator && (
                  <div className="flex justify-center my-4">
                    <div className="bg-muted px-3 py-1 rounded-full text-xs text-muted-foreground">
                      {new Date(message.timestamp).toLocaleDateString('en-US', { 
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </div>
                  </div>
                )}
                
                <div className={`flex ${isCurrentUser ? 'justify-end' : 'justify-start'}`}>
                  <div className={`flex gap-2 max-w-[70%] ${isCurrentUser ? 'flex-row-reverse' : ''}`}>
                    {!isCurrentUser && chat.type === 'group' && (
                      <Avatar className="h-8 w-8 mt-auto">
                        <AvatarFallback className="text-xs">
                          {getInitials(sender?.name || '')}
                        </AvatarFallback>
                      </Avatar>
                    )}
                    
                    <div>
                      {showSenderName && (
                        <div className="text-xs text-muted-foreground mb-1 ml-2">
                          {sender?.name}
                        </div>
                      )}
                      
                      <div
                        className={`rounded-2xl px-4 py-2 ${
                          isCurrentUser
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-muted'
                        }`}
                      >
                        <p className="break-words">{message.content}</p>
                      </div>
                      
                      <div className={`flex items-center gap-1 mt-1 text-xs text-muted-foreground ${
                        isCurrentUser ? 'justify-end' : 'justify-start'
                      }`}>
                        <span>{formatMessageTime(message.timestamp)}</span>
                        {isCurrentUser && getStatusIcon(message.status)}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
          <div ref={scrollRef} />
        </div>
      </div>

      {/* Input */}
      <div className="border-t p-4 bg-background flex-shrink-0">
        <form onSubmit={handleSendMessage} className="flex items-center gap-2 max-w-4xl mx-auto">
          <Button type="button" variant="ghost" size="icon">
            <Paperclip className="h-5 w-5" />
          </Button>
          
          <div className="flex-1 relative">
            <Input
              placeholder={t('typeMessage')}
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              className="pr-10"
            />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="absolute right-0 top-0"
            >
              <Smile className="h-5 w-5" />
            </Button>
          </div>
          
          <Button type="submit" size="icon">
            <Send className="h-5 w-5" />
          </Button>
        </form>
      </div>

      {/* Profile Dialog */}
      <Dialog open={showProfileDialog} onOpenChange={setShowProfileDialog}>
        <DialogContent className="sm:max-w-[425px] max-h-[85vh] flex flex-col p-0">
          <DialogHeader className="px-6 pt-6 pb-4 flex-shrink-0">
            <DialogTitle>{chat.type === 'group' ? t('groupInfo') : t('profile')}</DialogTitle>
            <DialogDescription>
              {chat.type === 'group' ? t('viewGroupInfo') : t('viewEmployeeProfile')}
            </DialogDescription>
          </DialogHeader>
          
          {chat.type === 'group' ? (
            <ScrollArea className="flex-1 overflow-y-auto">
              <div className="px-6 pb-6 space-y-6">
                {/* Group Avatar and Name */}
                <div className="flex flex-col items-center gap-3">
                  <div 
                    className={`relative ${isCurrentUserAdmin ? 'cursor-pointer group/avatar' : ''}`}
                    onClick={() => {
                      if (isCurrentUserAdmin) {
                        setEditedIcon(getInitials(chatName));
                        setIsEditingIcon(true);
                      }
                    }}
                  >
                    <Avatar className="h-24 w-24">
                      <AvatarFallback className="text-2xl">{getInitials(chatName)}</AvatarFallback>
                    </Avatar>
                    {isCurrentUserAdmin && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full opacity-0 group-hover/avatar:opacity-100 transition-opacity">
                        <Edit2 className="h-6 w-6 text-white" />
                      </div>
                    )}
                  </div>
                  <div className="text-center w-full">
                    {isEditingName ? (
                      <div className="space-y-2">
                        <Input
                          ref={nameInputRef}
                          value={editedName}
                          onChange={(e) => setEditedName(e.target.value)}
                          placeholder={t('groupNamePlaceholder')}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              console.log('Saving group name:', editedName);
                              setIsEditingName(false);
                            } else if (e.key === 'Escape') {
                              setIsEditingName(false);
                            }
                          }}
                          autoFocus
                          className="text-xl font-semibold text-center"
                        />
                        <div className="flex gap-2 justify-center">
                          <Button
                            size="sm"
                            onClick={() => {
                              console.log('Saving group name:', editedName);
                              setIsEditingName(false);
                            }}
                          >
                            {t('save')}
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => setIsEditingName(false)}
                          >
                            {t('cancel')}
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div 
                        className={`text-xl font-semibold inline-flex items-center gap-2 ${
                          isCurrentUserAdmin ? 'cursor-pointer hover:bg-muted px-2 py-1 rounded-lg -m-1' : ''
                        }`}
                        onClick={() => {
                          if (isCurrentUserAdmin) {
                            setEditedName(chatName);
                            setIsEditingName(true);
                          }
                        }}
                      >
                        {chatName}
                        {isCurrentUserAdmin && (
                          <Edit2 className="h-4 w-4 text-muted-foreground" />
                        )}
                      </div>
                    )}
                    <div className="text-sm text-muted-foreground mt-1">
                      {chat.participants.length} members
                    </div>
                  </div>
                </div>

                {/* Edit Icon Dialog */}
                {isEditingIcon && (
                  <Dialog open={isEditingIcon} onOpenChange={setIsEditingIcon}>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle>Change group icon</DialogTitle>
                        <DialogDescription>
                          Enter custom text for the group avatar (1-2 characters) or choose an emoji
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4 py-4">
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Custom text</label>
                          <Input
                            value={editedIcon}
                            onChange={(e) => setEditedIcon(e.target.value.slice(0, 2).toUpperCase())}
                            placeholder="e.g., MT"
                            maxLength={2}
                            className="text-center text-2xl font-semibold"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Or choose an emoji</label>
                          <div className="grid grid-cols-6 gap-2">
                            {['💼', '🚀', '💡', '🎯', '📊', '🎨', '🔧', '💻', '📱', '🌟', '🔥', '⚡'].map((emoji) => (
                              <Button
                                key={emoji}
                                variant="outline"
                                className="h-12 text-2xl hover:scale-110 transition-transform"
                                onClick={() => setEditedIcon(emoji)}
                              >
                                {emoji}
                              </Button>
                            ))}
                          </div>
                        </div>
                        <div className="flex items-center gap-3 p-4 bg-muted rounded-lg">
                          <Avatar className="h-16 w-16">
                            <AvatarFallback className="text-2xl">{editedIcon}</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">Preview</div>
                            <div className="text-sm text-muted-foreground">How it will look</div>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2 justify-end">
                        <Button
                          variant="outline"
                          onClick={() => setIsEditingIcon(false)}
                        >
                          Cancel
                        </Button>
                        <Button
                          onClick={() => {
                            console.log('Saving group icon:', editedIcon);
                            setIsEditingIcon(false);
                          }}
                        >
                          Save
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                )}

                {/* Group Description */}
                <div className="space-y-2 border-t pt-4">
                  <div className="text-sm font-medium">Description</div>
                  {isEditingDescription ? (
                    <div className="space-y-2">
                      <Input
                        ref={descriptionInputRef}
                        value={editedDescription}
                        onChange={(e) => setEditedDescription(e.target.value)}
                        placeholder="Add a description..."
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            // Save description
                            console.log('Saving description:', editedDescription);
                            setIsEditingDescription(false);
                          } else if (e.key === 'Escape') {
                            setIsEditingDescription(false);
                          }
                        }}
                        autoFocus
                      />
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          onClick={() => {
                            // Save description
                            console.log('Saving description:', editedDescription);
                            setIsEditingDescription(false);
                          }}
                        >
                          Save
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => setIsEditingDescription(false)}
                        >
                          Cancel
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div
                      className={`text-sm text-muted-foreground ${
                        isCurrentUserAdmin ? 'cursor-pointer hover:bg-muted p-2 rounded-lg -m-2' : ''
                      }`}
                      onClick={() => {
                        if (isCurrentUserAdmin) {
                          setEditedDescription(chat.description || '');
                          setIsEditingDescription(true);
                        }
                      }}
                    >
                      {chat.description || (isCurrentUserAdmin ? 'Click to add a description' : 'No description')}
                    </div>
                  )}
                </div>

                {/* Add Members Button */}
                <div className="border-t pt-4">
                  <Button 
                    variant="outline" 
                    className="w-full justify-start gap-2"
                    onClick={() => {
                      setSelectedUsers([]);
                      setShowAddMembersDialog(true);
                    }}
                  >
                    <UserPlus className="h-5 w-5" />
                    Add members
                  </Button>
                </div>

                {/* Members List */}
                <div className="space-y-3 border-t pt-4">
                  <div className="flex items-center gap-2 text-sm font-medium">
                    <Users className="h-4 w-4" />
                    <span>{chat.participants.length} Members</span>
                  </div>
                  <div className="space-y-2">
                    {chat.participants.map(participantId => {
                      const participant = getUserById(participantId);
                      if (!participant) return null;
                      const isAdmin = chat.createdBy === participantId;
                      const isParticipantCurrentUser = participantId === currentUser.id;
                      
                      return (
                        <div key={participantId} className="group flex items-center gap-3 p-2 rounded-lg hover:bg-muted transition-colors">
                          <div className="relative">
                            <Avatar className="h-10 w-10">
                              <AvatarFallback>{getInitials(participant.name)}</AvatarFallback>
                            </Avatar>
                            {participant.status === 'online' && (
                              <div className="absolute bottom-0 right-0 h-3 w-3 bg-green-500 rounded-full border-2 border-background" />
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <div className="font-medium truncate">
                                {isParticipantCurrentUser ? t('you') : participant.name}
                              </div>
                              {isAdmin && (
                                <Badge variant="secondary" className="text-xs px-1.5 py-0 h-5">
                                  {t('admin')}
                                </Badge>
                              )}
                            </div>
                            {participant.position && (
                              <div className="text-sm text-muted-foreground truncate">
                                {participant.position}
                              </div>
                            )}
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="text-xs text-muted-foreground capitalize">
                              {participant.status}
                            </div>
                            {isCurrentUserAdmin && !isParticipantCurrentUser && (
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
                                  >
                                    <MoreVertical className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  {!isAdmin && (
                                    <DropdownMenuItem
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        console.log('Making admin:', participantId);
                                        // In a real app, this would update the chat's createdBy field
                                      }}
                                    >
                                      <Shield className="h-4 w-4 mr-2" />
                                      Make admin
                                    </DropdownMenuItem>
                                  )}
                                  <DropdownMenuItem
                                    className="text-destructive"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      console.log('Removing member:', participantId);
                                      // In a real app, this would remove the participant from the group
                                    }}
                                  >
                                    <X className="h-4 w-4 mr-2" />
                                    Remove from group
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </ScrollArea>
          ) : otherUser ? (
            <ScrollArea className="flex-1 px-6 pb-6">
              <div className="space-y-6">
                {/* Avatar and name */}
                <div className="flex flex-col items-center gap-3">
                  <div className="relative">
                    <Avatar className="h-24 w-24">
                      <AvatarFallback className="text-2xl">{getInitials(otherUser.name)}</AvatarFallback>
                    </Avatar>
                    {otherUser.status === 'online' && (
                      <div className="absolute bottom-1 right-1 h-5 w-5 bg-green-500 rounded-full border-4 border-background" />
                    )}
                  </div>
                  <div className="text-center">
                    <div className="text-xl font-semibold">{otherUser.name}</div>
                    <div className="text-sm text-muted-foreground capitalize mt-1">
                      {t(otherUser.status)}
                      {otherUser.lastSeen && otherUser.status !== 'online' && (
                        <span> • {t('lastSeen')} {formatDistanceToNow(otherUser.lastSeen, { addSuffix: true })}</span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Employee Info */}
                <div className="space-y-4 border-t pt-4">
                  {otherUser.position && (
                    <div className="flex items-start gap-3">
                      <Briefcase className="h-5 w-5 text-muted-foreground mt-0.5 flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <div className="text-sm text-muted-foreground">{t('position')}</div>
                        <div className="text-base">{otherUser.position}</div>
                      </div>
                    </div>
                  )}
                  
                  {otherUser.department && (
                    <div className="flex items-start gap-3">
                      <Building className="h-5 w-5 text-muted-foreground mt-0.5 flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <div className="text-sm text-muted-foreground">{t('department')}</div>
                        <div className="text-base">{otherUser.department}</div>
                      </div>
                    </div>
                  )}
                  
                  {otherUser.email && (
                    <div className="flex items-start gap-3">
                      <Mail className="h-5 w-5 text-muted-foreground mt-0.5 flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <div className="text-sm text-muted-foreground">{t('email')}</div>
                        <a href={`mailto:${otherUser.email}`} className="text-base text-primary hover:underline break-all">
                          {otherUser.email}
                        </a>
                      </div>
                    </div>
                  )}
                  
                  {otherUser.phone && (
                    <div className="flex items-start gap-3">
                      <PhoneIcon className="h-5 w-5 text-muted-foreground mt-0.5 flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <div className="text-sm text-muted-foreground">{t('phone')}</div>
                        <a href={`tel:${otherUser.phone}`} className="text-base text-primary hover:underline">
                          {otherUser.phone}
                        </a>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </ScrollArea>
          ) : null}
        </DialogContent>
      </Dialog>

      {/* Search Messages Dialog */}
      <SearchMessagesDialog 
        open={showSearchDialog} 
        onOpenChange={setShowSearchDialog}
        chatId={chatId!}
        photos={getMediaByType(chatId!, 'image')}
        videos={getMediaByType(chatId!, 'video')}
        voiceMessages={getMediaByType(chatId!, 'voice')}
        links={getMediaByType(chatId!, 'link')}
      />

      {/* Mute Notifications Dialog */}
      <Dialog open={showMuteDialog} onOpenChange={setShowMuteDialog}>
        <DialogContent className="sm:max-w-[400px]">
          <DialogHeader>
            <DialogTitle>{t('muteNotificationsTitle')}</DialogTitle>
            <DialogDescription>
              {t('chooseHowLongToMuteFor')} {chatName}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-2 py-4">
            <Button
              variant="ghost"
              className="w-full justify-start h-auto py-3 px-4"
              onClick={() => {
                setShowMuteDialog(false);
                // Handle mute for 1 hour
              }}
            >
              <div className="flex items-center gap-3">
                <Clock className="h-5 w-5 text-muted-foreground" />
                <div className="text-left">
                  <div className="font-medium">{t('for1HourOption')}</div>
                  <div className="text-sm text-muted-foreground">
                    {t('until')} {new Date(Date.now() + 60 * 60 * 1000).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}
                  </div>
                </div>
              </div>
            </Button>

            <Button
              variant="ghost"
              className="w-full justify-start h-auto py-3 px-4"
              onClick={() => {
                setShowMuteDialog(false);
                // Handle mute for 8 hours
              }}
            >
              <div className="flex items-center gap-3">
                <Clock className="h-5 w-5 text-muted-foreground" />
                <div className="text-left">
                  <div className="font-medium">{t('for8HoursOption')}</div>
                  <div className="text-sm text-muted-foreground">
                    {t('until')} {new Date(Date.now() + 8 * 60 * 60 * 1000).toLocaleTimeString('en-US', { 
                      weekday: 'short',
                      hour: 'numeric', 
                      minute: '2-digit' 
                    })}
                  </div>
                </div>
              </div>
            </Button>

            <Button
              variant="ghost"
              className="w-full justify-start h-auto py-3 px-4"
              onClick={() => {
                setShowMuteDialog(false);
                // Handle mute for 1 day
              }}
            >
              <div className="flex items-center gap-3">
                <Clock className="h-5 w-5 text-muted-foreground" />
                <div className="text-left">
                  <div className="font-medium">{t('for1DayOption')}</div>
                  <div className="text-sm text-muted-foreground">
                    {t('until')} {new Date(Date.now() + 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { 
                      weekday: 'short',
                      month: 'short',
                      day: 'numeric',
                      hour: 'numeric', 
                      minute: '2-digit' 
                    })}
                  </div>
                </div>
              </div>
            </Button>

            <Button
              variant="ghost"
              className="w-full justify-start h-auto py-3 px-4"
              onClick={() => {
                setShowMuteDialog(false);
                // Handle mute for 1 week
              }}
            >
              <div className="flex items-center gap-3">
                <Clock className="h-5 w-5 text-muted-foreground" />
                <div className="text-left">
                  <div className="font-medium">{t('for1WeekOption')}</div>
                  <div className="text-sm text-muted-foreground">
                    {t('until')} {new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { 
                      month: 'short',
                      day: 'numeric',
                      hour: 'numeric', 
                      minute: '2-digit' 
                    })}
                  </div>
                </div>
              </div>
            </Button>

            <div className="border-t my-2" />

            <Button
              variant="ghost"
              className="w-full justify-start h-auto py-3 px-4"
              onClick={() => {
                setShowMuteDialog(false);
                // Handle mute forever
              }}
            >
              <div className="flex items-center gap-3">
                <BellOff className="h-5 w-5 text-muted-foreground" />
                <div className="text-left">
                  <div className="font-medium">{t('untilITurnItBackOnOption')}</div>
                  <div className="text-sm text-muted-foreground">
                    {t('muteIndefinitely')}
                  </div>
                </div>
              </div>
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Add Members Dialog */}
      <Dialog open={showAddMembersDialog} onOpenChange={setShowAddMembersDialog}>
        <DialogContent className="sm:max-w-[500px] max-h-[85vh] flex flex-col p-0">
          <DialogHeader className="px-6 pt-6 pb-4">
            <DialogTitle>Add members</DialogTitle>
            <DialogDescription>
              Select members to add to {chatName}
            </DialogDescription>
          </DialogHeader>
          
          <ScrollArea className="flex-1 px-6">
            <div className="space-y-2 pb-4">
              {getAllUsers()
                .filter(user => chat.type === 'group' && !chat.participants.includes(user.id))
                .map(user => {
                  const isSelected = selectedUsers.includes(user.id);
                  
                  return (
                    <div 
                      key={user.id} 
                      className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted cursor-pointer transition-colors"
                      onClick={() => {
                        setSelectedUsers(prev => 
                          prev.includes(user.id)
                            ? prev.filter(id => id !== user.id)
                            : [...prev, user.id]
                        );
                      }}
                    >
                      <Checkbox
                        checked={isSelected}
                        onCheckedChange={() => {
                          setSelectedUsers(prev => 
                            prev.includes(user.id)
                              ? prev.filter(id => id !== user.id)
                              : [...prev, user.id]
                          );
                        }}
                      />
                      <div className="relative">
                        <Avatar className="h-10 w-10">
                          <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
                        </Avatar>
                        {user.status === 'online' && (
                          <div className="absolute bottom-0 right-0 h-3 w-3 bg-green-500 rounded-full border-2 border-background" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-medium truncate">{user.name}</div>
                        {user.position && (
                          <div className="text-sm text-muted-foreground truncate">
                            {user.position}
                          </div>
                        )}
                      </div>
                      <div className="text-xs text-muted-foreground capitalize">
                        {user.status}
                      </div>
                    </div>
                  );
                })}
                
              {getAllUsers().filter(user => chat.type === 'group' && !chat.participants.includes(user.id)).length === 0 && (
                <div className="flex items-center justify-center h-40 text-muted-foreground">
                  All users are already members
                </div>
              )}
            </div>
          </ScrollArea>
          
          <div className="border-t px-6 py-4 flex gap-2">
            <Button
              variant="outline"
              className="flex-1"
              onClick={() => {
                setShowAddMembersDialog(false);
                setSelectedUsers([]);
              }}
            >
              Cancel
            </Button>
            <Button
              className="flex-1"
              disabled={selectedUsers.length === 0}
              onClick={() => {
                // In a real app, this would update the chat participants
                console.log('Adding members:', selectedUsers);
                setShowAddMembersDialog(false);
                setSelectedUsers([]);
              }}
            >
              Add {selectedUsers.length > 0 && `(${selectedUsers.length})`}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}