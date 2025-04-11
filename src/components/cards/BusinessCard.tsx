import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  MoreVertical, Edit, Share2, QrCode, 
  Phone, Mail, Linkedin, Instagram, Twitter, Globe 
} from "lucide-react";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";

interface BusinessCardProps {
  editable?: boolean;
  initialData?: {
    name: string;
    designation: string;
    company: string;
    phone?: string;
    email?: string;
    linkedin?: string;
    instagram?: string;
    twitter?: string;
    website?: string;
  };
}

const BusinessCard = ({ 
  editable = false, 
  initialData = {
    name: "John Doe",
    designation: "Product Manager",
    company: "Acme Corporation",
    phone: "+1 (555) 123-4567",
    email: "john.doe@acme.com",
    linkedin: "johndoe",
    instagram: "johndoe",
    twitter: "johndoe",
  }
}: BusinessCardProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [cardData, setCardData] = useState(initialData);
  const { toast } = useToast();

  const handleEdit = () => {
    if (editable) {
      setIsEditing(true);
    }
  };

  const handleShare = () => {
    toast({
      title: "Shared successfully",
      description: "Business card has been shared",
    });
  };

  const handleGenerateQR = () => {
    toast({
      title: "QR Code Generated",
      description: "QR code has been generated for your card",
    });
  };

  return (
    <div className="business-card bg-white shadow-lg rounded-lg p-3 sm:p-4 md:p-6 relative h-full flex flex-col">
      {editable && (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="absolute top-2 right-2 h-8 w-8 p-0">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={handleEdit}>
              <Edit className="mr-2 h-4 w-4" />
              <span>Edit</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleShare}>
              <Share2 className="mr-2 h-4 w-4" />
              <span>Share</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleGenerateQR}>
              <QrCode className="mr-2 h-4 w-4" />
              <span>Generate QR</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}

      <div className="flex flex-col h-full justify-between">
        <div className="space-y-1">
          <h2 className="font-bold text-base sm:text-lg md:text-xl truncate">{cardData.name}</h2>
          <p className="text-xs sm:text-sm text-muted-foreground truncate">{cardData.designation}</p>
          <p className="text-xs sm:text-sm font-medium truncate">{cardData.company}</p>
        </div>

        <div className="flex flex-wrap gap-2 mt-3 sm:mt-4">
          {cardData.phone && (
            <div className="flex items-center text-xs text-muted-foreground">
              <Phone className="h-3 w-3 mr-1 flex-shrink-0" />
              <span className="hidden sm:inline truncate">{cardData.phone}</span>
              <span className="sm:hidden truncate">{cardData.phone.replace(/\d(?=\d{4})/g, '*')}</span>
            </div>
          )}
          
          {cardData.email && (
            <div className="flex items-center text-xs text-muted-foreground">
              <Mail className="h-3 w-3 mr-1 flex-shrink-0" />
              <span className="hidden sm:inline truncate">{cardData.email}</span>
              <span className="sm:hidden truncate">{cardData.email.split('@')[0].slice(0, 2) + '...'}</span>
            </div>
          )}
          
          <div className="flex gap-1 mt-2 w-full sm:w-auto justify-center sm:justify-start">
            {cardData.linkedin && (
              <Button variant="outline" size="icon" className="h-6 w-6 rounded-full">
                <Linkedin className="h-3 w-3" />
              </Button>
            )}
            
            {cardData.instagram && (
              <Button variant="outline" size="icon" className="h-6 w-6 rounded-full">
                <Instagram className="h-3 w-3" />
              </Button>
            )}
            
            {cardData.twitter && (
              <Button variant="outline" size="icon" className="h-6 w-6 rounded-full">
                <Twitter className="h-3 w-3" />
              </Button>
            )}
            
            {cardData.website && (
              <Button variant="outline" size="icon" className="h-6 w-6 rounded-full">
                <Globe className="h-3 w-3" />
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessCard;
