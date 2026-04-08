import { Outlet, useLocation } from 'react-router';
import { ChatSidebar } from './ChatSidebar';
import { useEffect, useState } from 'react';

export function MainLayout() {
  const location = useLocation();
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  // On mobile, show sidebar only on home page, show content on all other pages
  const showSidebar = !isMobile || location.pathname === '/';
  const showContent = !isMobile || location.pathname !== '/';

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {showSidebar && (
        <div className={`${isMobile ? 'w-full' : 'w-80 border-r'} flex-shrink-0`}>
          <ChatSidebar />
        </div>
      )}
      {showContent && (
        <div className="flex-1 flex flex-col overflow-hidden">
          <Outlet />
        </div>
      )}
    </div>
  );
}