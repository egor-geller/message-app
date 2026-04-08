import { useState } from 'react';
import { 
  Search, 
  Image as ImageIcon, 
  FileVideo, 
  Mic, 
  Link as LinkIcon,
  Play,
  ExternalLink 
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from './ui/dialog';
import { Tabs, TabsList, TabsTrigger, TabsContent } from './ui/tabs';
import { Input } from './ui/input';
import { ScrollArea } from './ui/scroll-area';
import { Message } from '../types';
import { getUserById } from '../data/mockData';
import { formatDistanceToNow } from 'date-fns';
import { useLanguage } from '../context/LanguageContext';

interface SearchMessagesDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  chatId: string;
  photos: Message[];
  videos: Message[];
  voiceMessages: Message[];
  links: Message[];
}

export function SearchMessagesDialog({
  open,
  onOpenChange,
  chatId,
  photos,
  videos,
  voiceMessages,
  links
}: SearchMessagesDialogProps) {
  const [linkSearch, setLinkSearch] = useState('');

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const filteredLinks = links.filter(l => 
    l.content.toLowerCase().includes(linkSearch.toLowerCase()) ||
    l.linkTitle?.toLowerCase().includes(linkSearch.toLowerCase()) ||
    l.linkDescription?.toLowerCase().includes(linkSearch.toLowerCase())
  );

  const { t } = useLanguage();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[85vh] flex flex-col p-0">
        <DialogHeader className="px-6 pt-6 pb-4">
          <DialogTitle>{t('searchMessagesTitle')}</DialogTitle>
          <DialogDescription>
            {t('searchMessagesDescription')}
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="media" className="flex-1 flex flex-col overflow-hidden px-6 pb-6">
          <TabsList className="w-full">
            <TabsTrigger value="media" className="flex-1">
              <ImageIcon className="h-4 w-4 mr-2" />
              {t('media')}
            </TabsTrigger>
            <TabsTrigger value="voice" className="flex-1">
              <Mic className="h-4 w-4 mr-2" />
              {t('voice')}
            </TabsTrigger>
            <TabsTrigger value="links" className="flex-1">
              <LinkIcon className="h-4 w-4 mr-2" />
              {t('links')}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="media" className="flex-1 flex flex-col gap-4 mt-4 overflow-hidden">
            <ScrollArea className="flex-1 -mx-1 px-1">
              {photos.length === 0 && videos.length === 0 ? (
                <div className="flex items-center justify-center h-40 text-muted-foreground">
                  {t('noMediaFound')}
                </div>
              ) : (
                <div className="space-y-6 pb-2">
                  {/* Photos Section */}
                  {photos.length > 0 && (
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground mb-3">{t('photos')}</h3>
                      <div className="grid grid-cols-3 gap-2">
                        {photos.map((photo) => {
                          const sender = getUserById(photo.senderId);
                          return (
                            <div key={photo.id} className="group relative aspect-square rounded-lg overflow-hidden bg-muted cursor-pointer hover:opacity-80 transition-opacity">
                              <img 
                                src={photo.fileUrl} 
                                alt={photo.fileName || 'Photo'}
                                className="w-full h-full object-cover"
                              />
                              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-2">
                                <div className="text-white text-xs font-medium truncate">{sender?.name}</div>
                                <div className="text-white/70 text-xs">{formatDistanceToNow(photo.timestamp, { addSuffix: true })}</div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Videos Section */}
                  {videos.length > 0 && (
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground mb-3">{t('videos')}</h3>
                      <div className="grid grid-cols-2 gap-3">
                        {videos.map((video) => {
                          const sender = getUserById(video.senderId);
                          return (
                            <div key={video.id} className="group relative aspect-video rounded-lg overflow-hidden bg-muted cursor-pointer hover:opacity-80 transition-opacity">
                              {video.thumbnailUrl && (
                                <img 
                                  src={video.thumbnailUrl} 
                                  alt={video.fileName || 'Video'}
                                  className="w-full h-full object-cover"
                                />
                              )}
                              <div className="absolute inset-0 flex items-center justify-center">
                                <div className="bg-black/60 rounded-full p-3">
                                  <Play className="h-6 w-6 text-white fill-white" />
                                </div>
                              </div>
                              <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded">
                                {video.duration && formatDuration(video.duration)}
                              </div>
                              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-2">
                                <div className="text-white text-xs font-medium truncate">{sender?.name}</div>
                                <div className="text-white/70 text-xs">{formatDistanceToNow(video.timestamp, { addSuffix: true })}</div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </ScrollArea>
          </TabsContent>

          <TabsContent value="voice" className="flex-1 flex flex-col gap-4 mt-4 overflow-hidden">
            <ScrollArea className="flex-1 -mx-1 px-1">
              {voiceMessages.length > 0 ? (
                <div className="space-y-2 pb-2">
                  {voiceMessages.map((voice) => {
                    const sender = getUserById(voice.senderId);
                    return (
                      <div key={voice.id} className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted cursor-pointer transition-colors">
                        <div className="bg-primary/10 p-3 rounded-full">
                          <Mic className="h-5 w-5 text-primary" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="font-medium truncate">{sender?.name}</div>
                          <div className="text-sm text-muted-foreground">{voice.content}</div>
                        </div>
                        <div className="flex flex-col items-end gap-1">
                          <div className="text-sm text-muted-foreground">
                            {voice.duration && formatDuration(voice.duration)}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {formatDistanceToNow(voice.timestamp, { addSuffix: true })}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="flex items-center justify-center h-40 text-muted-foreground">
                  {t('noVoiceMessagesFound')}
                </div>
              )}
            </ScrollArea>
          </TabsContent>

          <TabsContent value="links" className="flex-1 flex flex-col gap-4 mt-4 overflow-hidden">
            <div className="relative flex-shrink-0">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder={t('searchLinks')}
                value={linkSearch}
                onChange={(e) => setLinkSearch(e.target.value)}
                className="pl-9"
              />
            </div>
            <ScrollArea className="flex-1 -mx-1 px-1">
              {filteredLinks.length > 0 ? (
                <div className="space-y-3 pb-2">
                  {filteredLinks.map((link) => {
                    const sender = getUserById(link.senderId);
                    return (
                      <a
                        key={link.id}
                        href={link.linkUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block p-3 rounded-lg border hover:bg-muted cursor-pointer transition-colors"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <LinkIcon className="h-4 w-4 text-primary flex-shrink-0" />
                              <div className="font-medium truncate">{link.linkTitle}</div>
                            </div>
                            {link.linkDescription && (
                              <div className="text-sm text-muted-foreground line-clamp-2 mb-2">
                                {link.linkDescription}
                              </div>
                            )}
                            <div className="flex items-center gap-2 text-xs text-muted-foreground">
                              <span>{sender?.name}</span>
                              <span>•</span>
                              <span>{formatDistanceToNow(link.timestamp, { addSuffix: true })}</span>
                            </div>
                          </div>
                          <ExternalLink className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                        </div>
                      </a>
                    );
                  })}
                </div>
              ) : (
                <div className="flex items-center justify-center h-40 text-muted-foreground">
                  {t('noLinksFound')}
                </div>
              )}
            </ScrollArea>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}