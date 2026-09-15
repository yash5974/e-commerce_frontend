import { CreditCard, Wallet } from "lucide-react";

import { Button } from "@/ui/button";
import { Card, CardContent } from "@/ui/card";

import { PaymentProvider } from "../types/payment.type";

interface PaymentMethodSelectorProps {
  value: PaymentProvider | null;
  onChange: (provider: PaymentProvider) => void;
  disabled?: boolean;
}

export default function PaymentMethodSelector({
  value,
  onChange,
  disabled = false,
}: PaymentMethodSelectorProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <Card
        className={[
          "cursor-pointer transition",
          value === PaymentProvider.STRIPE
            ? "border-primary ring-2 ring-primary/20"
            : "",
          disabled ? "pointer-events-none opacity-60" : "",
        ].join(" ")}
        onClick={() => onChange(PaymentProvider.STRIPE)}
      >
        <CardContent className="p-5">
          <Button
            type="button"
            variant="ghost"
            className="h-auto w-full justify-start p-0 hover:bg-transparent"
            disabled={disabled}
            onClick={(event) => {
              event.stopPropagation();
              onChange(PaymentProvider.STRIPE);
            }}
          >
            <CreditCard className="mr-3 size-5" />

            <span className="flex flex-col items-start">
              <span className="font-medium">Stripe</span>

              <span className="text-sm text-muted-foreground">
                Pay securely with Stripe
              </span>
            </span>
          </Button>
        </CardContent>
      </Card>

      <Card
        className={[
          "cursor-pointer transition",
          value === PaymentProvider.RAZORPAY
            ? "border-primary ring-2 ring-primary/20"
            : "",
          disabled ? "pointer-events-none opacity-60" : "",
        ].join(" ")}
        onClick={() => onChange(PaymentProvider.RAZORPAY)}
      >
        <CardContent className="p-5">
          <Button
            type="button"
            variant="ghost"
            className="h-auto w-full justify-start p-0 hover:bg-transparent"
            disabled={disabled}
            onClick={(event) => {
              event.stopPropagation();
              onChange(PaymentProvider.RAZORPAY);
            }}
          >
            <Wallet className="mr-3 size-5" />

            <span className="flex flex-col items-start">
              <span className="font-medium">Razorpay</span>

              <span className="text-sm text-muted-foreground">
                UPI, cards & more
              </span>
            </span>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
