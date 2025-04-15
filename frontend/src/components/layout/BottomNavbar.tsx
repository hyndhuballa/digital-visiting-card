
import { Home, Wallet, Users, PlusCircle } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const BottomNavbar = () => {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-background border-t border-border z-10">
      <div className="flex justify-around items-center h-16">
        <Link to="/home" className={`flex flex-col items-center justify-center w-full h-full transition-colors ${isActive('/home') ? 'text-primary' : 'text-muted-foreground'}`}>
          <Home className="h-5 w-5" />
          <span className="text-xs mt-1">Home</span>
        </Link>
        
        <Link to="/wallet" className={`flex flex-col items-center justify-center w-full h-full transition-colors ${isActive('/wallet') ? 'text-primary' : 'text-muted-foreground'}`}>
          <Wallet className="h-5 w-5" />
          <span className="text-xs mt-1">Wallet</span>
        </Link>
        
        <Link to="/add-card" className="relative flex flex-col items-center justify-center w-full h-full">
          <div className="absolute -top-6 bg-primary rounded-full p-3 shadow-lg">
            <PlusCircle className="h-6 w-6 text-white" />
          </div>
          <span className="text-xs mt-8 text-muted-foreground">Add</span>
        </Link>
        
        <Link to="/contacts" className={`flex flex-col items-center justify-center w-full h-full transition-colors ${isActive('/contacts') ? 'text-primary' : 'text-muted-foreground'}`}>
          <Users className="h-5 w-5" />
          <span className="text-xs mt-1">Contacts</span>
        </Link>
      </div>
    </div>
  );
};

export default BottomNavbar;
