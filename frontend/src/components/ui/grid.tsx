import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface GridProps {
  children: ReactNode;
  className?: string;
  cols?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
  sm?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
  md?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
  lg?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
  xl?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
  gap?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 8 | 10 | 12 | 16;
}

const Grid = ({ 
  children, 
  className,
  cols = 1,
  sm,
  md,
  lg,
  xl,
  gap = 4
}: GridProps) => {
  const getColsClass = (cols: number) => {
    return `grid-cols-${cols}`;
  };

  return (
    <div 
      className={cn(
        "grid",
        getColsClass(cols),
        sm && `sm:${getColsClass(sm)}`,
        md && `md:${getColsClass(md)}`,
        lg && `lg:${getColsClass(lg)}`,
        xl && `xl:${getColsClass(xl)}`,
        `gap-${gap}`,
        className
      )}
    >
      {children}
    </div>
  );
};

export default Grid; 