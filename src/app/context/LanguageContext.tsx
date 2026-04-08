import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'english' | 'russian';

interface Translations {
  [key: string]: string;
}

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations: Record<Language, Translations> = {
  english: {
    // Settings Page
    'settings': 'Settings',
    'editProfile': 'Edit Profile',
    'appearance': 'Appearance',
    'profile': 'Profile',
    'updatePersonalInfo': 'Update your personal information',
    'notifications': 'Notifications',
    'enabled': 'Enabled',
    'disabled': 'Disabled',
    'messageSounds': 'Message Sounds',
    'privacySecurity': 'Privacy & Security',
    'managePrivacy': 'Manage your privacy settings',
    'customizeAppLook': 'Customize the app\'s look',
    'helpSupport': 'Help & Support',
    'getHelp': 'Get help and contact support',
    'logOut': 'Log Out',
    'version': 'Version',
    
    // Edit Profile
    'updatePersonalDetails': 'Update your personal and contact details',
    'firstName': 'First Name',
    'lastName': 'Last Name',
    'position': 'Position',
    'department': 'Department',
    'email': 'Email',
    'phone': 'Phone',
    'cancel': 'Cancel',
    'saveChanges': 'Save Changes',
    
    // Appearance Settings
    'appearanceSettings': 'Appearance Settings',
    'customizeLookFeel': 'Customize the app\'s look and feel',
    'theme': 'Theme',
    'darkMode': 'Dark Mode',
    'chatBackground': 'Chat Background',
    'backgroundDescription': 'Choose a background style for all your chats',
    'language': 'Language',
    'messageSound': 'Message Sound',
    'soundDescription': 'Sound played when you receive a new message',
    'default': 'Default',
    'pattern1': 'Pattern 1',
    'pattern2': 'Pattern 2',
    'gradient1': 'Gradient 1',
    'gradient2': 'Gradient 2',
    'solidColor': 'Solid Color',
    'notification1': 'Notification 1',
    'notification2': 'Notification 2',
    'chime': 'Chime',
    'bell': 'Bell',
    'pop': 'Pop',
    'none': 'None (Silent)',
    
    // Chat Page
    'online': 'Online',
    'offline': 'Offline',
    'away': 'Away',
    'typing': 'typing...',
    'search': 'Search',
    'newChat': 'New Chat',
    'typeMessage': 'Type a message...',
    'admin': 'Admin',
    'you': 'You',
    'leaveGroup': 'Leave Group',
    'viewProfile': 'View Profile',
    'sendMessage': 'Send Message',
    'editGroup': 'Edit Group',
    'groupName': 'Group Name',
    'groupDescription': 'Group Description',
    'groupIcon': 'Group Icon',
    'emoji': 'Emoji',
    'customTextPlaceholder': 'e.g., DEV',
    'selectAll': 'Select All',
    'done': 'Done',
    'remove': 'Remove',
    
    // Home Page / Chat List
    'chats': 'Chats',
    'searchChats': 'Search chats...',
    'noChatsFound': 'No chats found',
    'startNewChat': 'Start a new chat',
    
    // Chat Options Menu
    'info': 'Info',
    'searchMessages': 'Search messages',
    'muteNotifications': 'Mute notifications',
    'deleteChat': 'Delete chat',
    
    // New Chat Page
    'newGroupChat': 'New Group Chat',
    'newGroup': 'New Group',
    'cancelGroup': 'Cancel Group',
    'searchContacts': 'Search contacts...',
    'selected': 'selected',
    'createGroup': 'Create Group',
    
    // Settings Page - Edit Profile Section
    'selectBackground': 'Select background',
    'selectLanguage': 'Select language',
    'selectSound': 'Select sound',
    
    // Placeholders
    'firstNamePlaceholder': 'John',
    'lastNamePlaceholder': 'Doe',
    'positionPlaceholder': 'e.g., Senior Product Manager',
    'departmentPlaceholder': 'e.g., Product Management',
    'emailPlaceholder': 'john.doe@company.com',
    'phonePlaceholder': '+1 (555) 123-4567',
    
    // Profile Dialog (previously under Chat Page section)
    'groupInfo': 'Group Info',
    'members': 'Members',
    'addMembers': 'Add members',
    'removeFromGroup': 'Remove from group',
    'makeAdmin': 'Make admin',
    'description': 'Description',
    'customText': 'Custom text',
    'save': 'Save',
    'viewEmployeeProfile': 'View employee profile information.',
    'viewGroupInfo': 'View group information and members.',
    'addDescriptionPlaceholder': 'Add a description...',
    'clickToAddDescription': 'Click to add a description',
    'noDescription': 'No description',
    'changeGroupIcon': 'Change group icon',
    'enterCustomText': 'Enter custom text for the group avatar (1-2 characters) or choose an emoji',
    'orChooseEmoji': 'Or choose an emoji',
    'preview': 'Preview',
    'howItWillLook': 'How it will look',
    'groupNamePlaceholder': 'Group name',
    'muteNotificationsDialog': 'Mute notifications',
    'chooseHowLongToMute': 'Choose how long to mute notifications for',
    'for1Hour': 'For 1 hour',
    'for8Hours': 'For 8 hours',
    'for1Week': 'For 1 week',
    'untilITurnItBackOn': 'Until I turn it back on',
    'until': 'Until',
    'lastSeen': 'last seen',
    
    // Search Messages Dialog
    'searchMessagesTitle': 'Search Messages',
    'searchMessagesDescription': 'Search for photos, videos, voice messages, and links shared in this chat.',
    'media': 'Media',
    'voice': 'Voice',
    'links': 'Links',
    'noMediaFound': 'No media found',
    'photos': 'Photos',
    'videos': 'Videos',
    'noVoiceMessagesFound': 'No voice messages found',
    'searchLinks': 'Search links...',
    'noLinksFound': 'No links found',
    
    // Mute Notifications Dialog
    'muteNotificationsTitle': 'Mute notifications',
    'chooseHowLongToMuteFor': 'Choose how long to mute notifications for',
    'for30Minutes': 'For 30 minutes',
    'for1HourOption': 'For 1 hour',
    'for8HoursOption': 'For 8 hours',
    'for1DayOption': 'For 1 day',
    'for1WeekOption': 'For 1 week',
    'untilITurnItBackOnOption': 'Until I turn it back on',
    'muteIndefinitely': 'Mute indefinitely',
  },
  russian: {
    // Settings Page
    'settings': 'Настройки',
    'editProfile': 'Редактировать профиль',
    'appearance': 'Внешний вид',
    'profile': 'Профиль',
    'updatePersonalInfo': 'Обновить личную информацию',
    'notifications': 'Уведомления',
    'enabled': 'Включено',
    'disabled': 'Выключено',
    'messageSounds': 'Звуки сообщений',
    'privacySecurity': 'Конфиденциальность',
    'managePrivacy': 'Управление настройками конфиденциальности',
    'customizeAppLook': 'Настройка внешнего вида приложения',
    'helpSupport': 'Помощь и поддержка',
    'getHelp': 'Получить помощь и связаться с поддержкой',
    'logOut': 'Выйти',
    'version': 'Версия',
    
    // Edit Profile
    'updatePersonalDetails': 'Обновить личные и контактные данные',
    'firstName': 'Имя',
    'lastName': 'Фамилия',
    'position': 'Должность',
    'department': 'Отдел',
    'email': 'Электронная почта',
    'phone': 'Телефон',
    'cancel': 'Отмена',
    'saveChanges': 'Сохранить изменения',
    
    // Appearance Settings
    'appearanceSettings': 'Настройки внешнего вида',
    'customizeLookFeel': 'Настройка внешнего вида приложения',
    'theme': 'Тема',
    'darkMode': 'Темный режим',
    'chatBackground': 'Фон чата',
    'backgroundDescription': 'Выберите стиль фона для всех чатов',
    'language': 'Язык',
    'messageSound': 'Звук сообщения',
    'soundDescription': 'Звук при получении нового сообщения',
    'default': 'По умолчанию',
    'pattern1': 'Узор 1',
    'pattern2': 'Узор 2',
    'gradient1': 'Градиент 1',
    'gradient2': 'Градиент 2',
    'solidColor': 'Сплошной цвет',
    'notification1': 'Уведомление 1',
    'notification2': 'Уведомление 2',
    'chime': 'Звон',
    'bell': 'Колокольчик',
    'pop': 'Поп',
    'none': 'Нет (Тихо)',
    
    // Chat Page
    'online': 'В сети',
    'offline': 'Не в сети',
    'away': 'Отошел',
    'typing': 'печатает...',
    'search': 'Поиск',
    'newChat': 'Новый чат',
    'typeMessage': 'Введите сообщение...',
    'admin': 'Админ',
    'you': 'Вы',
    'leaveGroup': 'Покинуть группу',
    'viewProfile': 'Посмотреть профиль',
    'sendMessage': 'Отправить сообщение',
    'editGroup': 'Редактировать группу',
    'groupName': 'Название группы',
    'groupDescription': 'Описание группы',
    'groupIcon': 'Иконка группы',
    'emoji': 'Эмодзи',
    'customTextPlaceholder': 'напр., DEV',
    'selectAll': 'Выбрать все',
    'done': 'Готово',
    'remove': 'Удалить',
    
    // Home Page / Chat List
    'chats': 'Чаты',
    'searchChats': 'Поиск чатов...',
    'noChatsFound': 'Чаты не найдены',
    'startNewChat': 'Начать новый чат',
    
    // Chat Options Menu
    'info': 'Информация',
    'searchMessages': 'Поиск сообщений',
    'muteNotifications': 'Отключить уведомления',
    'deleteChat': 'Удалить чат',
    
    // New Chat Page
    'newGroupChat': 'Новая групповая беседа',
    'newGroup': 'Новая группа',
    'cancelGroup': 'Отменить группу',
    'searchContacts': 'Поиск контактов...',
    'selected': 'выбрано',
    'createGroup': 'Создать группу',
    
    // Settings Page - Edit Profile Section
    'selectBackground': 'Выберите фон',
    'selectLanguage': 'Выберите язык',
    'selectSound': 'Выберите звук',
    
    // Placeholders
    'firstNamePlaceholder': 'Иван',
    'lastNamePlaceholder': 'Иванов',
    'positionPlaceholder': 'напр., Старший менеджер по продукту',
    'departmentPlaceholder': 'напр., Управление продуктами',
    'emailPlaceholder': 'ivan.ivanov@company.com',
    'phonePlaceholder': '+7 (999) 123-4567',
    
    // Profile Dialog (previously under Chat Page section)
    'groupInfo': 'Информация о группе',
    'members': 'Участники',
    'addMembers': 'Добавить участников',
    'removeFromGroup': 'Удалить из группы',
    'makeAdmin': 'Сделать админом',
    'description': 'Описание',
    'customText': 'Свой текст',
    'save': 'Сохранить',
    'viewEmployeeProfile': 'Просмотр информации о сотруднике.',
    'viewGroupInfo': 'Просмотр информации о группе и участниках.',
    'addDescriptionPlaceholder': 'Добавить описание...',
    'clickToAddDescription': 'Нажмите, чтобы добавить описание',
    'noDescription': 'Нет описания',
    'changeGroupIcon': 'Изменить иконку группы',
    'enterCustomText': 'Введите текст для аватара группы (1-2 символа) или выберите эмодзи',
    'orChooseEmoji': 'Или выберите эмодзи',
    'preview': 'Предпросмотр',
    'howItWillLook': 'Как это будет выглядеть',
    'groupNamePlaceholder': 'Название группы',
    'muteNotificationsDialog': 'Отключить уведомления',
    'chooseHowLongToMute': 'Выберите, на сколько отключить уведомления для',
    'for1Hour': 'На 1 час',
    'for8Hours': 'На 8 часов',
    'for1Week': 'На 1 неделю',
    'untilITurnItBackOn': 'Пока я не включу обратно',
    'until': 'До',
    'lastSeen': 'был(-а) в сети',
    
    // Search Messages Dialog
    'searchMessagesTitle': 'Поиск сообщений',
    'searchMessagesDescription': 'Поиск фотографий, видео, голосовых сообщений и ссылок, отправленных в этом чате.',
    'media': 'Медиа',
    'voice': 'Голос',
    'links': 'Ссылки',
    'noMediaFound': 'Медиа не найдено',
    'photos': 'Фотографии',
    'videos': 'Видео',
    'noVoiceMessagesFound': 'Голосовых сообщений нет',
    'searchLinks': 'Поиск ссылок...',
    'noLinksFound': 'Ссылок нет',
    
    // Mute Notifications Dialog
    'muteNotificationsTitle': 'Отключить уведомления',
    'chooseHowLongToMuteFor': 'Выберите, на сколько отключить уведомления для',
    'for30Minutes': 'На 30 минут',
    'for1HourOption': 'На 1 час',
    'for8HoursOption': 'На 8 часов',
    'for1DayOption': 'На 1 день',
    'for1WeekOption': 'На 1 неделю',
    'untilITurnItBackOnOption': 'Пока я не включу обратно',
    'muteIndefinitely': 'Отключить навсегда',
  }
};

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('app-language');
    return (saved as Language) || 'russian';
  });

  useEffect(() => {
    localStorage.setItem('app-language', language);
  }, [language]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
}