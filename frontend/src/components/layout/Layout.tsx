import { ReactNode, useState, useEffect } from "react";
import BottomNavbar from "./BottomNavbar";
import { useLocation } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const location = useLocation();
  const isAuthPage = location.pathname === "/" || location.pathname === "/login" || location.pathname === "/signup";
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [sidebarOpen, setSidebarOpen] = useState(!isMobile);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      setSidebarOpen(!mobile);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (isAuthPage) {
    return (
      <div className="flex flex-col min-h-screen">
        <main className="flex-1">{children}</main>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen">
      {/* Sidebar for desktop */}
      <div 
        className={`hidden md:block transition-all duration-300 ease-in-out ${
          sidebarOpen ? 'w-64 opacity-100' : 'w-0 opacity-0'
        }`}
      >
        <Sidebar isCollapsed={!sidebarOpen} onToggleCollapse={() => setSidebarOpen(!sidebarOpen)} />
      </div>
      
      {/* Main content */}
      <div className="flex-1 flex flex-col w-full">
        <Header onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
        <main className="flex-1 p-4 sm:p-6 pb-16 md:pb-6 overflow-x-hidden">{children}</main>
        
        {/* Bottom navigation for mobile */}
        <div className="md:hidden">
          <BottomNavbar />
        </div>
      </div>
    </div>
  );
};

export default Layout;
