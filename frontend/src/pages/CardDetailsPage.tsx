
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import CardDetail from "@/components/cards/CardDetail";

const CardDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const [card, setCard] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  
  // Mock data - in a real app, fetch from API or local storage
  const mockCards = [
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
  ];
  
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      const foundCard = mockCards.find(card => card.id === id);
      if (foundCard) {
        setCard(foundCard);
      }
      setLoading(false);
    }, 500);
  }, [id]);
  
  if (loading) {
    return (
      <div className="container px-4 py-6 flex justify-center items-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }
  
  if (!card) {
    return (
      <div className="container px-4 py-6 text-center">
        <h1 className="text-xl font-bold mb-4">Card Not Found</h1>
        <p className="text-muted-foreground">The card you're looking for doesn't exist or has been removed.</p>
      </div>
    );
  }

  return (
    <div className="container px-4 py-6 max-w-md mx-auto">
      <CardDetail card={card} />
    </div>
  );
};

export default CardDetailsPage;
