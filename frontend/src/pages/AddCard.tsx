
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AddCardForm from "@/components/cards/AddCardForm";

const AddCardPage = () => {
  const [cardType, setCardType] = useState("other");

  return (
    <div className="container px-4 py-6 space-y-4 max-w-md mx-auto">
      <h1 className="text-xl font-bold text-center">Add New Card</h1>
      
      <Tabs defaultValue="other" onValueChange={setCardType} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="yours">Your Card</TabsTrigger>
          <TabsTrigger value="other">Other's Card</TabsTrigger>
        </TabsList>
        
        <TabsContent value="yours" className="mt-4 animate-fade-in">
          <p className="text-sm text-muted-foreground mb-4 text-center">
            Update your personal business card information
          </p>
          <AddCardForm />
        </TabsContent>
        
        <TabsContent value="other" className="mt-4 animate-fade-in">
          <p className="text-sm text-muted-foreground mb-4 text-center">
            Add someone else's business card to your wallet
          </p>
          <AddCardForm />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AddCardPage;
