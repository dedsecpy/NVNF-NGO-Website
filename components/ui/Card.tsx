import { type HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  hover?: boolean;
}

export function Card({ className, hover = false, children, ...props }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-xl bg-white shadow-card",
        hover && "transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover border border-charcoal/5",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
