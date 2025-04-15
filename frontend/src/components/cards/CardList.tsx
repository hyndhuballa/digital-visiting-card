import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import Grid from "@/components/ui/grid";
import { useNavigate } from "react-router-dom";

interface CardItem {
  id: string;
  name: string;
  company: string;
  designation: string;
  email: string;
  phone: string;
  status: "active" | "inactive";
}

interface CardListProps {
  cards: CardItem[];
}

const CardList = ({ cards }: CardListProps) => {
  const navigate = useNavigate();

  const handleCardClick = (cardId: string) => {
    navigate(`/cards/${cardId}`);
  };

  return (
    <Grid cols={1} md={2} lg={3} gap={4}>
      {cards.map((card) => (
        <Card 
          key={card.id}
          className="cursor-pointer hover:shadow-lg transition-shadow"
          onClick={() => handleCardClick(card.id)}
        >
          <CardContent className="p-4">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="font-semibold text-lg truncate">{card.name}</h3>
                <p className="text-sm text-muted-foreground truncate">{card.designation}</p>
              </div>
              <Badge variant={card.status === "active" ? "default" : "secondary"}>
                {card.status}
              </Badge>
            </div>
            <div className="space-y-1 text-sm">
              <p className="truncate">{card.company}</p>
              <p className="truncate">{card.email}</p>
              <p className="truncate">{card.phone}</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </Grid>
  );
};

export default CardList;
