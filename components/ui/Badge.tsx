import { type HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "sky" | "navy" | "warning" | "success";
}

const variants = {
  default: "bg-charcoal/10 text-charcoal",
  sky: "bg-sky/10 text-sky",
  navy: "bg-navy-deep/10 text-navy-deep",
  warning: "bg-action/20 text-charcoal",
  success: "bg-forest/15 text-forest",
};

export function Badge({ className, variant = "default", children, ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-xs font-medium",
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
