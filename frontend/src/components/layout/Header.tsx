import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, Bell, User, Search } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Container from "@/components/ui/container";
import { Input } from "@/components/ui/input";

interface HeaderProps {
  onToggleSidebar?: () => void;
}

const Header = ({ onToggleSidebar }: HeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchVisible, setIsSearchVisible] = useState(false);

  return (
    <header className="border-b border-border bg-background sticky top-0 z-50">
      <Container>
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Button 
              variant="ghost" 
              size="icon" 
              className="md:hidden"
              onClick={onToggleSidebar}
            >
              <Menu className="h-5 w-5" />
            </Button>
            <Link to="/home" className="font-bold text-xl">
              Cardly Connect
            </Link>
          </div>

          {/* Search bar - visible on larger screens */}
          <div className="hidden md:flex flex-1 max-w-md mx-4">
            <div className="relative w-full">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input 
                type="search" 
                placeholder="Search cards..." 
                className="pl-8 bg-muted/50 border-none focus-visible:ring-0"
              />
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/home" className="text-sm font-medium hover:text-primary transition-colors">
              Home
            </Link>
            <Link to="/wallet" className="text-sm font-medium hover:text-primary transition-colors">
              Wallet
            </Link>
            <Link to="/contacts" className="text-sm font-medium hover:text-primary transition-colors">
              Contacts
            </Link>
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="ghost" size="icon">
              <Bell className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <User className="h-5 w-5" />
            </Button>
          </div>

          {/* Mobile Actions */}
          <div className="md:hidden flex items-center space-x-2">
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => setIsSearchVisible(!isSearchVisible)}
            >
              <Search className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <Bell className="h-5 w-5" />
            </Button>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-64">
                <div className="flex flex-col h-full">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="font-bold text-lg">Menu</h2>
                    <SheetTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <X className="h-5 w-5" />
                      </Button>
                    </SheetTrigger>
                  </div>
                  <nav className="flex flex-col space-y-4">
                    <Link 
                      to="/home" 
                      className="text-sm font-medium hover:text-primary transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Home
                    </Link>
                    <Link 
                      to="/wallet" 
                      className="text-sm font-medium hover:text-primary transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Wallet
                    </Link>
                    <Link 
                      to="/contacts" 
                      className="text-sm font-medium hover:text-primary transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Contacts
                    </Link>
                  </nav>
                  <div className="mt-auto pt-4 border-t border-border">
                    <Button variant="outline" className="w-full">
                      <User className="mr-2 h-4 w-4" />
                      Profile
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
        
        {/* Mobile Search - appears below header when toggled */}
        {isSearchVisible && (
          <div className="py-2 md:hidden animate-in slide-in-from-top duration-200">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input 
                type="search" 
                placeholder="Search cards..." 
                className="pl-8 bg-muted/50 border-none focus-visible:ring-0"
                autoFocus
              />
            </div>
          </div>
        )}
      </Container>
    </header>
  );
};

export default Header; 