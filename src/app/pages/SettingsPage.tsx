import { useNavigate } from 'react-router';
import { 
  ArrowLeft, 
  User, 
  Bell, 
  Lock, 
  Palette, 
  HelpCircle,
  LogOut,
  Moon,
  Sun,
  Mail,
  Phone as PhoneIcon,
  Building,
  Briefcase,
  Save,
  X,
  Image as ImageIcon,
  Globe,
  Volume2
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Avatar, AvatarFallback } from '../components/ui/avatar';
import { currentUser } from '../data/mockData';
import { Switch } from '../components/ui/switch';
import { Separator } from '../components/ui/separator';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select';

export function SettingsPage() {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const { language, setLanguage, t } = useLanguage();
  const [notifications, setNotifications] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [isEditingAccount, setIsEditingAccount] = useState(false);
  const [isEditingAppearance, setIsEditingAppearance] = useState(false);
  
  // Account information state
  const [accountInfo, setAccountInfo] = useState({
    name: currentUser.name === 'You' ? t('you') : currentUser.name,
    surname: '',
    position: currentUser.position || '',
    department: currentUser.department || '',
    email: currentUser.email || '',
    phone: currentUser.phone || ''
  });
  
  const [editedAccountInfo, setEditedAccountInfo] = useState(accountInfo);
  
  // Appearance settings state
  const [appearanceSettings, setAppearanceSettings] = useState({
    theme: theme,
    chatBackground: 'default',
    language: language,
    messageSound: 'default'
  });
  
  const [editedAppearanceSettings, setEditedAppearanceSettings] = useState(appearanceSettings);
  
  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  const handleSaveAccountInfo = () => {
    setAccountInfo(editedAccountInfo);
    setIsEditingAccount(false);
    console.log('Saving account info:', editedAccountInfo);
  };

  const handleCancelEdit = () => {
    setEditedAccountInfo(accountInfo);
    setIsEditingAccount(false);
  };

  const handleSaveAppearance = () => {
    setAppearanceSettings(editedAppearanceSettings);
    if (editedAppearanceSettings.theme !== theme) {
      toggleTheme();
    }
    if (editedAppearanceSettings.language !== language) {
      setLanguage(editedAppearanceSettings.language as 'english' | 'russian');
    }
    setIsEditingAppearance(false);
    console.log('Saving appearance settings:', editedAppearanceSettings);
  };

  const handleCancelAppearance = () => {
    setEditedAppearanceSettings(appearanceSettings);
    setIsEditingAppearance(false);
  };

  const SettingsItem = ({ 
    icon: Icon, 
    title, 
    subtitle, 
    onClick,
    rightElement
  }: { 
    icon: any; 
    title: string; 
    subtitle?: string;
    onClick?: () => void;
    rightElement?: React.ReactNode;
  }) => {
    const content = (
      <>
        <div className="h-10 w-10 bg-muted rounded-full flex items-center justify-center">
          <Icon className="h-5 w-5" />
        </div>
        <div className="flex-1">
          <div>{title}</div>
          {subtitle && (
            <div className="text-sm text-muted-foreground">{subtitle}</div>
          )}
        </div>
        {rightElement}
      </>
    );

    // If there's a rightElement (like a Switch), use a div to avoid nested buttons
    if (rightElement) {
      return (
        <div className="w-full p-4 hover:bg-accent transition-colors flex items-center gap-3">
          {content}
        </div>
      );
    }

    // Otherwise use a button for clickable items
    return (
      <button
        onClick={onClick}
        className="w-full p-4 hover:bg-accent transition-colors text-left flex items-center gap-3"
      >
        {content}
      </button>
    );
  };

  const getPageTitle = () => {
    if (isEditingAccount) return t('editProfile');
    if (isEditingAppearance) return t('appearance');
    return t('settings');
  };

  const handleBackClick = () => {
    if (isEditingAccount) {
      handleCancelEdit();
    } else if (isEditingAppearance) {
      handleCancelAppearance();
    } else {
      navigate('/');
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="border-b p-4">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={handleBackClick}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-xl">{getPageTitle()}</h1>
        </div>
      </div>

      {/* Settings Options */}
      <div className="flex-1 overflow-auto">
        {/* Main Settings Menu */}
        {!isEditingAccount && !isEditingAppearance && (
          <>
            {/* Profile Section */}
            <div className="p-6 border-b">
              <div className="flex items-center gap-4">
                <Avatar className="h-20 w-20">
                  <AvatarFallback className="text-2xl">
                    {getInitials(currentUser.name)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <h2 className="text-2xl">{currentUser.name === 'You' ? t('you') : currentUser.name}</h2>
                  <p className="text-muted-foreground">{t(currentUser.status)}</p>
                </div>
              </div>
            </div>

            <div className="divide-y">
              <SettingsItem
                icon={User}
                title={t('profile')}
                subtitle={t('updatePersonalInfo')}
                onClick={() => setIsEditingAccount(true)}
              />
              
              <SettingsItem
                icon={Bell}
                title={t('notifications')}
                subtitle={notifications ? t('enabled') : t('disabled')}
                rightElement={
                  <Switch
                    checked={notifications}
                    onCheckedChange={setNotifications}
                  />
                }
              />
              
              <SettingsItem
                icon={Bell}
                title={t('messageSounds')}
                subtitle={soundEnabled ? t('enabled') : t('disabled')}
                rightElement={
                  <Switch
                    checked={soundEnabled}
                    onCheckedChange={setSoundEnabled}
                  />
                }
              />
              
              <SettingsItem
                icon={Lock}
                title={t('privacySecurity')}
                subtitle={t('managePrivacy')}
                onClick={() => {}}
              />
              
              <SettingsItem
                icon={Palette}
                title={t('appearance')}
                subtitle={t('customizeAppLook')}
                onClick={() => setIsEditingAppearance(true)}
              />
              
              <SettingsItem
                icon={HelpCircle}
                title={t('helpSupport')}
                subtitle={t('getHelp')}
                onClick={() => {}}
              />
            </div>
            
            <Separator className="my-4" />
            
            <div className="p-4">
              <Button variant="destructive" className="w-full" onClick={() => {}}>
                <LogOut className="h-4 w-4 mr-2" />
                {t('logOut')}
              </Button>
            </div>
            
            <div className="p-4 text-center text-sm text-muted-foreground">
              {t('version')} 1.0.0
            </div>
          </>
        )}

        {/* Edit Profile */}
        {isEditingAccount && (
          <div className="p-6">
            <div className="max-w-2xl mx-auto">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-semibold">{t('editProfile')}</h2>
                  <p className="text-muted-foreground">{t('updatePersonalDetails')}</p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleCancelEdit}
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>

              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">{t('firstName')}</Label>
                    <Input
                      id="name"
                      placeholder={t('firstNamePlaceholder')}
                      value={editedAccountInfo.name}
                      onChange={(e) => setEditedAccountInfo({ ...editedAccountInfo, name: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="surname">{t('lastName')}</Label>
                    <Input
                      id="surname"
                      placeholder={t('lastNamePlaceholder')}
                      value={editedAccountInfo.surname}
                      onChange={(e) => setEditedAccountInfo({ ...editedAccountInfo, surname: e.target.value })}
                    />
                  </div>
                </div>
                
                <Separator />
                
                <div className="space-y-2">
                  <Label htmlFor="position" className="flex items-center gap-2">
                    <Briefcase className="h-4 w-4 text-muted-foreground" />
                    {t('position')}
                  </Label>
                  <Input
                    id="position"
                    placeholder={t('positionPlaceholder')}
                    value={editedAccountInfo.position}
                    onChange={(e) => setEditedAccountInfo({ ...editedAccountInfo, position: e.target.value })}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="department" className="flex items-center gap-2">
                    <Building className="h-4 w-4 text-muted-foreground" />
                    {t('department')}
                  </Label>
                  <Input
                    id="department"
                    placeholder={t('departmentPlaceholder')}
                    value={editedAccountInfo.department}
                    onChange={(e) => setEditedAccountInfo({ ...editedAccountInfo, department: e.target.value })}
                  />
                </div>
                
                <Separator />
                
                <div className="space-y-2">
                  <Label htmlFor="email" className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    {t('email')}
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder={t('emailPlaceholder')}
                    value={editedAccountInfo.email}
                    onChange={(e) => setEditedAccountInfo({ ...editedAccountInfo, email: e.target.value })}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="phone" className="flex items-center gap-2">
                    <PhoneIcon className="h-4 w-4 text-muted-foreground" />
                    {t('phone')}
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder={t('phonePlaceholder')}
                    value={editedAccountInfo.phone}
                    onChange={(e) => setEditedAccountInfo({ ...editedAccountInfo, phone: e.target.value })}
                  />
                </div>

                <div className="flex gap-3 pt-4">
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={handleCancelEdit}
                  >
                    {t('cancel')}
                  </Button>
                  <Button
                    className="flex-1"
                    onClick={handleSaveAccountInfo}
                  >
                    <Save className="h-4 w-4 mr-2" />
                    {t('saveChanges')}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Edit Appearance */}
        {isEditingAppearance && (
          <div className="p-6">
            <div className="max-w-2xl mx-auto">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-semibold">{t('appearanceSettings')}</h2>
                  <p className="text-muted-foreground">{t('customizeLookFeel')}</p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleCancelAppearance}
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>

              <div className="space-y-6">
                {/* Theme */}
                <div className="space-y-2">
                  <Label htmlFor="theme" className="flex items-center gap-2">
                    {editedAppearanceSettings.theme === 'dark' ? <Moon className="h-4 w-4 text-muted-foreground" /> : <Sun className="h-4 w-4 text-muted-foreground" />}
                    {t('theme')}
                  </Label>
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 bg-muted rounded-full flex items-center justify-center">
                        {editedAppearanceSettings.theme === 'dark' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
                      </div>
                      <div>
                        <div className="font-medium">{t('darkMode')}</div>
                        <div className="text-sm text-muted-foreground">
                          {editedAppearanceSettings.theme === 'dark' ? t('enabled') : t('disabled')}
                        </div>
                      </div>
                    </div>
                    <Switch
                      checked={editedAppearanceSettings.theme === 'dark'}
                      onCheckedChange={(checked) => {
                        setEditedAppearanceSettings({ 
                          ...editedAppearanceSettings, 
                          theme: checked ? 'dark' : 'light' 
                        });
                        toggleTheme();
                      }}
                    />
                  </div>
                </div>
                
                <Separator />
                
                {/* Chat Background */}
                <div className="space-y-2">
                  <Label htmlFor="chatBackground" className="flex items-center gap-2">
                    <ImageIcon className="h-4 w-4 text-muted-foreground" />
                    {t('chatBackground')}
                  </Label>
                  <Select
                    value={editedAppearanceSettings.chatBackground}
                    onValueChange={(value) => setEditedAppearanceSettings({ ...editedAppearanceSettings, chatBackground: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder={t('selectBackground')} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="default">{t('default')}</SelectItem>
                      <SelectItem value="pattern1">{t('pattern1')}</SelectItem>
                      <SelectItem value="pattern2">{t('pattern2')}</SelectItem>
                      <SelectItem value="gradient1">{t('gradient1')}</SelectItem>
                      <SelectItem value="gradient2">{t('gradient2')}</SelectItem>
                      <SelectItem value="solid">{t('solidColor')}</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-muted-foreground">{t('backgroundDescription')}</p>
                </div>
                
                <Separator />
                
                {/* Language */}
                <div className="space-y-2">
                  <Label htmlFor="language" className="flex items-center gap-2">
                    <Globe className="h-4 w-4 text-muted-foreground" />
                    {t('language')}
                  </Label>
                  <Select
                    value={editedAppearanceSettings.language}
                    onValueChange={(value) => setEditedAppearanceSettings({ ...editedAppearanceSettings, language: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder={t('selectLanguage')} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="english">English</SelectItem>
                      <SelectItem value="russian">Русский (Russian)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <Separator />
                
                {/* Message Sound */}
                <div className="space-y-2">
                  <Label htmlFor="messageSound" className="flex items-center gap-2">
                    <Volume2 className="h-4 w-4 text-muted-foreground" />
                    {t('messageSound')}
                  </Label>
                  <Select
                    value={editedAppearanceSettings.messageSound}
                    onValueChange={(value) => setEditedAppearanceSettings({ ...editedAppearanceSettings, messageSound: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder={t('selectSound')} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="default">{t('default')}</SelectItem>
                      <SelectItem value="notification1">{t('notification1')}</SelectItem>
                      <SelectItem value="notification2">{t('notification2')}</SelectItem>
                      <SelectItem value="chime">{t('chime')}</SelectItem>
                      <SelectItem value="bell">{t('bell')}</SelectItem>
                      <SelectItem value="pop">{t('pop')}</SelectItem>
                      <SelectItem value="none">{t('none')}</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-muted-foreground">{t('soundDescription')}</p>
                </div>

                <div className="flex gap-3 pt-4">
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={handleCancelAppearance}
                  >
                    {t('cancel')}
                  </Button>
                  <Button
                    className="flex-1"
                    onClick={handleSaveAppearance}
                  >
                    <Save className="h-4 w-4 mr-2" />
                    {t('saveChanges')}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}