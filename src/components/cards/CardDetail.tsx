
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Phone, Mail, Linkedin, Instagram, Twitter, Globe, Share2, Download, ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

interface CardDetailProps {
  card: {
    id: string;
    name: string;
    company: string;
    designation: string;
    phone?: string;
    email?: string;
    linkedin?: string;
    instagram?: string;
    twitter?: string;
    website?: string;
    tags: string[];
  };
}

const CardDetail = ({ card }: CardDetailProps) => {
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const handleShare = () => {
    toast({
      title: "Card shared",
      description: "Card has been shared successfully",
    });
  };
  
  const handleSaveContact = () => {
    toast({
      title: "Contact saved",
      description: "Contact has been saved to your phone",
    });
  };
  
  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center">
        <Button variant="ghost" size="icon" onClick={handleBack}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-xl font-bold flex-1 text-center mr-10">Card Details</h1>
      </div>
      
      <Card className="animate-scale-in">
        <CardHeader className="pb-2">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-xl font-bold">{card.name}</h2>
              <p className="text-sm text-muted-foreground">{card.designation}</p>
              <p className="text-sm font-medium">{card.company}</p>
            </div>
            <Button variant="outline" size="icon" onClick={handleShare}>
              <Share2 className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 gap-3">
            {card.phone && (
              <div className="flex items-center text-sm">
                <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
                <span>{card.phone}</span>
              </div>
            )}
            
            {card.email && (
              <div className="flex items-center text-sm">
                <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
                <span>{card.email}</span>
              </div>
            )}
            
            {card.linkedin && (
              <div className="flex items-center text-sm">
                <Linkedin className="h-4 w-4 mr-2 text-muted-foreground" />
                <span>linkedin.com/in/{card.linkedin}</span>
              </div>
            )}
            
            {card.instagram && (
              <div className="flex items-center text-sm">
                <Instagram className="h-4 w-4 mr-2 text-muted-foreground" />
                <span>instagram.com/{card.instagram}</span>
              </div>
            )}
            
            {card.twitter && (
              <div className="flex items-center text-sm">
                <Twitter className="h-4 w-4 mr-2 text-muted-foreground" />
                <span>twitter.com/{card.twitter}</span>
              </div>
            )}
            
            {card.website && (
              <div className="flex items-center text-sm">
                <Globe className="h-4 w-4 mr-2 text-muted-foreground" />
                <span>{card.website}</span>
              </div>
            )}
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full" onClick={handleSaveContact}>
            <Download className="mr-2 h-4 w-4" />
            Save Contact
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default CardDetail;
