import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/lib/auth-context';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { LogOut, User } from 'lucide-react';

// Define the User interface to match the backend model
interface User {
  id: string;
  username: string;
  email: string;
  profilePicture?: string;
  bio?: string;
}

export function UserProfile() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  if (!user) {
    return null;
  }

  // Get initials for avatar fallback
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="flex flex-row items-center gap-4">
        <Avatar className="h-16 w-16">
          <AvatarImage src={user.profilePicture} alt={user.username} />
          <AvatarFallback className="text-lg">{getInitials(user.username)}</AvatarFallback>
        </Avatar>
        <div>
          <CardTitle>{user.username}</CardTitle>
          <CardDescription>{user.email}</CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <User className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">Account ID: {user.id}</span>
          </div>
          {user.bio && (
            <div className="mt-4">
              <h3 className="text-sm font-medium">Bio</h3>
              <p className="text-sm text-muted-foreground">{user.bio}</p>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter>
        <Button 
          variant="outline" 
          className="w-full" 
          onClick={handleLogout}
        >
          <LogOut className="mr-2 h-4 w-4" />
          Logout
        </Button>
      </CardFooter>
    </Card>
  );
} 