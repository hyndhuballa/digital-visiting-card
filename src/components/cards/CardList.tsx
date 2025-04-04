
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

interface CardItem {
  id: string;
  name: string;
  company: string;
  designation: string;
  tags: string[];
}

interface CardListProps {
  cards: CardItem[];
}

const CardList = ({ cards }: CardListProps) => {
  const navigate = useNavigate();
  
  const handleCardClick = (id: string) => {
    navigate(`/wallet/card/${id}`);
  };

  return (
    <div className="space-y-4">
      {cards.map((card) => (
        <Card 
          key={card.id} 
          className="cursor-pointer hover:shadow-md transition-shadow animate-fade-in"
          onClick={() => handleCardClick(card.id)}
        >
          <CardContent className="p-4">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium">
                {card.name.slice(0, 2).toUpperCase()}
              </div>
              <div className="flex-1">
                <h3 className="font-semibold">{card.name}</h3>
                <p className="text-sm text-muted-foreground">{card.designation} at {card.company}</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-1 mt-2">
              {card.tags.map((tag) => (
                <Badge key={tag} variant="outline" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default CardList;
