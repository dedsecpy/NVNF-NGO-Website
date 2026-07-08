import Image from "next/image";
import type { OnlinePaymentMethod } from "@/lib/payments/bank";
import { cn } from "@/lib/utils";

const LOGO_CONFIG: Record<
  Exclude<OnlinePaymentMethod, "card">,
  { src: string; alt: string; width: number; height: number; className: string }
> = {
  esewa: {
    src: "/ngo/payment/esewa.webp",
    alt: "eSewa",
    width: 196,
    height: 60,
    className: "h-8 w-auto max-w-full object-contain sm:h-11",
  },
  khalti: {
    src: "/ngo/payment/khalti.png",
    alt: "Khalti",
    width: 140,
    height: 44,
    className: "h-7 w-auto max-w-full object-contain sm:h-9",
  },
};

interface PaymentMethodLogoProps {
  method: OnlinePaymentMethod;
  className?: string;
}

export function PaymentMethodLogo({ method, className }: PaymentMethodLogoProps) {
  if (method === "card") {
    return (
      <span className={cn("flex items-center justify-center", className)} aria-hidden="true">
        <Image
          src="/ngo/payment/card-icon.png"
          alt=""
          width={64}
          height={64}
          className="h-8 w-8 object-contain sm:h-9 sm:w-9"
        />
      </span>
    );
  }

  const config = LOGO_CONFIG[method];

  return (
    <Image
      src={config.src}
      alt=""
      width={config.width}
      height={config.height}
      className={cn(config.className, className)}
    />
  );
}
