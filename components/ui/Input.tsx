import { forwardRef, type InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, id, ...props }, ref) => (
    <div className="w-full">
      {label && (
        <label htmlFor={id} className="mb-2 block text-sm font-medium text-charcoal">
          {label}
        </label>
      )}
      <input
        ref={ref}
        id={id}
        className={cn(
          "w-full rounded-lg border border-charcoal/20 bg-white px-4 py-3 text-charcoal transition-colors focus:border-sky focus:outline-none focus:ring-2 focus:ring-sky/20",
          error && "border-urgency focus:border-urgency focus:ring-urgency/20",
          className
        )}
        {...props}
      />
      {error && <p className="mt-1 text-sm text-urgency">{error}</p>}
    </div>
  )
);

Input.displayName = "Input";
