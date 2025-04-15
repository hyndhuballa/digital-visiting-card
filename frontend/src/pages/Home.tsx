
import { useState, useEffect } from "react";
import BusinessCard from "@/components/cards/BusinessCard";
import NotificationList from "@/components/notifications/NotificationList";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Bell, UserPlus } from "lucide-react";

const HomePage = () => {
  const [notifications, setNotifications] = useState([
    {
      id: "1",
      type: "connection" as const,
      title: "Connection Request",
      message: "Jane Smith wants to connect with you",
      time: "5m ago",
      read: false,
    },
    {
      id: "2", 
      type: "system" as const,
      title: "Welcome to Cardly",
      message: "Thanks for joining! Set up your digital business card.",
      time: "1h ago",
      read: true,
    },
    {
      id: "3",
      type: "connection" as const,
      title: "Connection Request",
      message: "Michael Johnson wants to connect with you",
      time: "2h ago",
      read: false,
    }
  ]);

  return (
    <div className="container px-4 py-6 space-y-6 max-w-md mx-auto">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">VISTO CARDS</h1>
        <Bell className="h-6 w-6" />
      </div>
      
      <div className="flex justify-center">
        <BusinessCard editable={true} />
      </div>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center">
            <UserPlus className="h-5 w-5 mr-2 text-primary" />
            Notifications
          </CardTitle>
        </CardHeader>
        <CardContent>
          <NotificationList notifications={notifications} />
        </CardContent>
      </Card>
    </div>
  );
};

export default HomePage;

