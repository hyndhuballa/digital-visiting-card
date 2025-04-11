import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface ContainerProps {
  children: ReactNode;
  className?: string;
  fluid?: boolean;
  size?: "sm" | "md" | "lg" | "xl" | "full";
}

const Container = ({ 
  children, 
  className, 
  fluid = false,
  size = "lg"
}: ContainerProps) => {
  const maxWidthClass = fluid 
    ? "max-w-full" 
    : size === "sm" 
      ? "max-w-3xl" 
      : size === "md" 
        ? "max-w-5xl" 
        : size === "lg" 
          ? "max-w-7xl" 
          : size === "xl" 
            ? "max-w-[1400px]" 
            : "max-w-full";

  return (
    <div
      className={cn(
        "mx-auto px-3 sm:px-4 md:px-6 lg:px-8",
        maxWidthClass,
        className
      )}
    >
      {children}
    </div>
  );
};

export default Container; 