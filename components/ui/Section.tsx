import { type HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface SectionProps extends HTMLAttributes<HTMLElement> {
  as?: "section" | "div";
  id?: string;
}

export function Section({ className, as: Component = "section", children, ...props }: SectionProps) {
  return (
    <Component
      className={cn("py-12 md:py-16", className)}
      {...props}
    >
      {children}
    </Component>
  );
}

export function Container({ className, children, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("mx-auto max-w-7xl px-4 sm:px-6 lg:px-8", className)}
      {...props}
    >
      {children}
    </div>
  );
}
