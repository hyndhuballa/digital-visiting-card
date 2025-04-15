
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import CardList from "@/components/cards/CardList";
import { ArrowLeft, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";

const WalletCardsPage = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  
  const [cards, setCards] = useState([
    {
      id: "1",
      name: "Jane Smith",
      company: "Tech Innovations",
      designation: "CEO",
      tags: ["Tech", "CEO"],
      phone: "+1 (555) 123-4567",
      email: "jane@techinnovations.com",
      linkedin: "janesmith",
      twitter: "janesmith"
    },
    {
      id: "2",
      name: "Michael Johnson",
      company: "Global Marketing",
      designation: "Marketing Director",
      tags: ["Marketing"],
      phone: "+1 (555) 234-5678",
      email: "michael@globalmarketing.com",
      linkedin: "michaeljohnson",
      instagram: "michaelj"
    },
    {
      id: "3",
      name: "Sarah Wilson",
      company: "Creative Studios",
      designation: "Lead Designer",
      tags: ["Design", "Creative"],
      phone: "+1 (555) 345-6789",
      email: "sarah@creativestudios.com",
      instagram: "sarahwilson",
      website: "sarahwilson.design"
    }
  ]);
  
  const filteredCards = cards.filter(
    card => 
      card.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      card.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      card.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );
  
  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="container px-4 py-6 space-y-4 max-w-md mx-auto">
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" onClick={handleGoBack}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-xl font-bold flex-1">All Cards</h1>
      </div>
      
      <div className="relative">
        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search by name, company, or tags..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-9"
        />
      </div>
      
      {filteredCards.length > 0 ? (
        <CardList cards={filteredCards} />
      ) : (
        <div className="text-center py-8 text-muted-foreground">
          <p>No cards found matching "{searchQuery}"</p>
          <Button variant="link" onClick={() => setSearchQuery("")}>
            Clear search
          </Button>
        </div>
      )}
    </div>
  );
};

export default WalletCardsPage;
