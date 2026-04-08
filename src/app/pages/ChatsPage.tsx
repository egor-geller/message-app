import { MessageSquare } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export function ChatsPage() {
  const { t } = useLanguage();
  
  return (
    <div className="flex-1 flex items-center justify-center bg-muted/20">
      <div className="text-center">
        <MessageSquare className="h-24 w-24 mx-auto text-muted-foreground/50 mb-4" />
        <h2 className="text-2xl mb-2">{t('noChatsFound')}</h2>
        <p className="text-muted-foreground">
          {t('startNewChat')}
        </p>
      </div>
    </div>
  );
}