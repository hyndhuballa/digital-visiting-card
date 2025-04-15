import { Home, Wallet, Users, PlusCircle, Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";

interface SidebarProps {
  isCollapsed?: boolean;
  onToggleCollapse?: () => void;
}

const Sidebar = ({ isCollapsed = false, onToggleCollapse }: SidebarProps) => {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const navItems = [
    { path: "/home", icon: Home, label: "Home" },
    { path: "/wallet", icon: Wallet, label: "Wallet" },
    { path: "/contacts", icon: Users, label: "Contacts" },
  ];

  return (
    <div className={`h-screen bg-background border-r border-border flex flex-col transition-all duration-300 ${isCollapsed ? 'w-16' : 'w-64'}`}>
      <div className="p-4 flex items-center justify-between">
        {!isCollapsed && <h2 className="font-bold text-xl">Cardly Connect</h2>}
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={onToggleCollapse}
          className="ml-auto"
        >
          {isCollapsed ? <Menu className="h-5 w-5" /> : <X className="h-5 w-5" />}
        </Button>
      </div>
      
      <div className="flex-1 py-4">
        <nav className="space-y-1 px-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link 
                key={item.path}
                to={item.path} 
                className={`flex items-center p-3 rounded-lg transition-colors ${
                  isActive(item.path) 
                    ? 'bg-primary/10 text-primary' 
                    : 'text-muted-foreground hover:bg-muted'
                }`}
              >
                <Icon className="h-5 w-5" />
                {!isCollapsed && <span className="ml-3">{item.label}</span>}
              </Link>
            );
          })}
        </nav>
      </div>
      
      <div className="p-4 border-t border-border">
        <Link to="/add-card" className="w-full">
          <Button className="w-full flex items-center justify-center gap-2">
            <PlusCircle className="h-5 w-5" />
            {!isCollapsed && <span>Add Card</span>}
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Sidebar; 