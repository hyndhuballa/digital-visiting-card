
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import CardStack from "@/components/cards/CardStack";
import { Wallet } from "lucide-react";

const WalletPage = () => {
  const [cards, setCards] = useState([
    {
      id: "1",
      name: "Jane Smith",
      company: "Tech Innovations",
      designation: "CEO",
      tags: ["Tech", "CEO"]
    },
    {
      id: "2",
      name: "Michael Johnson",
      company: "Global Marketing",
      designation: "Marketing Director",
      tags: ["Marketing"]
    },
    {
      id: "3",
      name: "Sarah Wilson",
      company: "Creative Studios",
      designation: "Lead Designer",
      tags: ["Design", "Creative"]
    }
  ]);

  return (
    <div className="container px-4 py-6 space-y-6 max-w-md mx-auto">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Digital Wallet</h1>
        <Wallet className="h-6 w-6" />
      </div>
      
      <Card className="border-dashed">
        <CardHeader className="pb-4">
          <CardTitle className="text-center text-lg">Your Cards</CardTitle>
        </CardHeader>
        <CardContent className="py-6">
          <CardStack cards={cards} />
        </CardContent>
      </Card>
      
      <div className="text-center text-sm text-muted-foreground">
        <p>Tap on the card stack to view all saved cards</p>
      </div>
    </div>
  );
};

export default WalletPage;
