
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Users, Search } from "lucide-react";
import ContactsList from "@/components/contacts/ContactsList";

const ContactsPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  
  const [contacts, setContacts] = useState([
    {
      id: "1",
      name: "Jane Smith",
      company: "Tech Innovations",
      type: "phone" as const,
      value: "+1 (555) 123-4567"
    },
    {
      id: "2",
      name: "Jane Smith",
      company: "Tech Innovations",
      type: "email" as const,
      value: "jane@techinnovations.com"
    },
    {
      id: "3",
      name: "Jane Smith",
      company: "Tech Innovations",
      type: "linkedin" as const,
      value: "linkedin.com/in/janesmith"
    },
    {
      id: "4",
      name: "Michael Johnson",
      company: "Global Marketing",
      type: "phone" as const,
      value: "+1 (555) 234-5678"
    },
    {
      id: "5",
      name: "Michael Johnson",
      company: "Global Marketing",
      type: "email" as const,
      value: "michael@globalmarketing.com"
    },
    {
      id: "6",
      name: "Michael Johnson",
      company: "Global Marketing",
      type: "linkedin" as const,
      value: "linkedin.com/in/michaeljohnson"
    },
    {
      id: "7",
      name: "Sarah Wilson",
      company: "Creative Studios",
      type: "phone" as const,
      value: "+1 (555) 345-6789"
    },
    {
      id: "8",
      name: "Sarah Wilson",
      company: "Creative Studios",
      type: "email" as const,
      value: "sarah@creativestudios.com"
    },
    {
      id: "9",
      name: "Sarah Wilson",
      company: "Creative Studios",
      type: "instagram" as const,
      value: "instagram.com/sarahwilson"
    }
  ]);
  
  const filteredContacts = contacts.filter(
    contact => 
      contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contact.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contact.value.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container px-4 py-6 space-y-4 max-w-md mx-auto">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Contacts</h1>
        <Users className="h-6 w-6" />
      </div>
      
      <div className="relative">
        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search contacts..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-9"
        />
      </div>
      
      <div className="pb-4">
        <ContactsList contacts={filteredContacts} />
      </div>
    </div>
  );
};

export default ContactsPage;
