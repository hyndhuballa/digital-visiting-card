
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

interface CardStackProps {
  cards: {
    id: string;
    name: string;
    company: string;
    designation: string;
  }[];
}

const CardStack = ({ cards }: CardStackProps) => {
  const navigate = useNavigate();
  
  const handleCardClick = () => {
    navigate("/wallet/cards");
  };

  return (
    <div 
      className="business-card-stack cursor-pointer relative mx-auto" 
      onClick={handleCardClick}
    >
      {cards.slice(0, 3).map((card, index) => (
        <div 
          key={card.id}
          className="card-stack-item"
          style={{ 
            transform: `rotate(${(index - 1) * 5}deg) translateY(${index * 5}px)`,
            zIndex: cards.length - index
          }}
        >
          <div className="h-full w-full flex flex-col justify-center items-center">
            <div className="w-16 h-1 bg-primary/20 mb-1 rounded-full" />
            {index === 0 && (
              <p className="text-xs text-center text-muted-foreground">
                {cards.length} Business Cards
              </p>
            )}
          </div>
        </div>
      ))}

      <div className="absolute bottom-4 left-0 right-0 text-center text-primary text-xs font-medium">
        Tap to view all cards
      </div>
    </div>
  );
};

export default CardStack;
