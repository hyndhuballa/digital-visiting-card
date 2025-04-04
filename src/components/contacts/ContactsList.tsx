
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Phone, Mail, Linkedin, Instagram, Twitter, MessageCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Contact {
  id: string;
  name: string;
  company: string;
  type: "phone" | "email" | "linkedin" | "instagram" | "twitter" | "message";
  value: string;
}

interface ContactsListProps {
  contacts: Contact[];
}

const ContactsList = ({ contacts: initialContacts }: ContactsListProps) => {
  const [filter, setFilter] = useState<string>("all");
  const { toast } = useToast();
  
  const filteredContacts = filter === "all" 
    ? initialContacts 
    : initialContacts.filter(contact => contact.type === filter);
  
  const handleSaveContact = (contact: Contact) => {
    toast({
      title: "Contact saved",
      description: `${contact.name}'s contact has been saved to your phone`,
    });
  };
  
  const getContactIcon = (type: string) => {
    switch (type) {
      case "phone":
        return <Phone className="h-4 w-4" />;
      case "email":
        return <Mail className="h-4 w-4" />;
      case "linkedin":
        return <Linkedin className="h-4 w-4" />;
      case "instagram":
        return <Instagram className="h-4 w-4" />;
      case "twitter":
        return <Twitter className="h-4 w-4" />;
      case "message":
        return <MessageCircle className="h-4 w-4" />;
      default:
        return <Phone className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-4">
      <div className="pb-2 overflow-x-auto">
        <ToggleGroup type="single" value={filter} onValueChange={(value) => value && setFilter(value)} className="flex space-x-1 p-1 bg-muted/40 rounded-full w-full">
          <ToggleGroupItem value="all" className="rounded-full flex-1 text-xs h-8">
            All
          </ToggleGroupItem>
          <ToggleGroupItem value="phone" className="rounded-full flex-1 text-xs h-8">
            <Phone className="h-3 w-3 mr-1" />
            Phone
          </ToggleGroupItem>
          <ToggleGroupItem value="email" className="rounded-full flex-1 text-xs h-8">
            <Mail className="h-3 w-3 mr-1" />
            Email
          </ToggleGroupItem>
          <ToggleGroupItem value="linkedin" className="rounded-full flex-1 text-xs h-8">
            <Linkedin className="h-3 w-3 mr-1" />
            LinkedIn
          </ToggleGroupItem>
        </ToggleGroup>
      </div>
      
      <div className="space-y-2">
        {filteredContacts.map((contact) => (
          <div key={contact.id} className="border rounded-lg p-3 animate-fade-in">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-medium text-sm">{contact.name}</h3>
                <p className="text-xs text-muted-foreground">{contact.company}</p>
              </div>
              <Button variant="outline" size="sm" onClick={() => handleSaveContact(contact)}>
                Save
              </Button>
            </div>
            <div className="flex items-center mt-2 text-sm">
              {getContactIcon(contact.type)}
              <span className="ml-2">{contact.value}</span>
            </div>
          </div>
        ))}
        
        {filteredContacts.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            No contacts found for this filter
          </div>
        )}
      </div>
    </div>
  );
};

export default ContactsList;
