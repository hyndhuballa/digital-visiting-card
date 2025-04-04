
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Bell, UserPlus, Check, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Notification {
  id: string;
  type: "connection" | "system";
  title: string;
  message: string;
  time: string;
  read: boolean;
}

interface NotificationListProps {
  notifications: Notification[];
}

const NotificationList = ({ notifications }: NotificationListProps) => {
  const { toast } = useToast();
  
  const handleAccept = (id: string) => {
    toast({
      title: "Connection accepted",
      description: "You have accepted the connection request",
    });
  };
  
  const handleDecline = (id: string) => {
    toast({
      title: "Connection declined",
      description: "You have declined the connection request",
    });
  };

  return (
    <div className="space-y-3">
      {notifications.length === 0 ? (
        <div className="text-center py-8 text-muted-foreground">
          <Bell className="h-10 w-10 mx-auto mb-2 text-muted-foreground/50" />
          <p>No notifications yet</p>
        </div>
      ) : (
        notifications.map((notification) => (
          <Card key={notification.id} className={`animate-fade-in ${!notification.read ? 'border-l-4 border-l-primary' : ''}`}>
            <CardContent className="p-4">
              <div className="flex gap-3">
                <div className={`mt-1 rounded-full p-2 ${notification.type === 'connection' ? 'bg-accent/50' : 'bg-muted'}`}>
                  {notification.type === 'connection' ? (
                    <UserPlus className="h-4 w-4 text-accent-foreground" />
                  ) : (
                    <Bell className="h-4 w-4 text-muted-foreground" />
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <h3 className="font-medium text-sm">{notification.title}</h3>
                    <span className="text-xs text-muted-foreground">{notification.time}</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">{notification.message}</p>
                  
                  {notification.type === 'connection' && (
                    <div className="flex gap-2 mt-3">
                      <Button size="sm" className="h-8" onClick={() => handleAccept(notification.id)}>
                        <Check className="mr-1 h-4 w-4" />
                        Accept
                      </Button>
                      <Button size="sm" variant="outline" className="h-8" onClick={() => handleDecline(notification.id)}>
                        <X className="mr-1 h-4 w-4" />
                        Decline
                      </Button>
                    </div>
                  )}
                  
                  {!notification.read && (
                    <Badge variant="outline" className="mt-2 bg-primary/10 text-primary text-xs">New</Badge>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))
      )}
    </div>
  );
};

export default NotificationList;
