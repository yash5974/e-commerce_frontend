import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { useState, type FormEvent } from "react";

import { Button } from "@/ui/button";

interface StripePaymentFormProps {
  paymentId: string;
  amount: number;
  onPaymentError: (message: string) => void;
}

export default function StripePaymentForm({
  paymentId,
  amount,
  onPaymentError,
}: StripePaymentFormProps) {
  const stripe = useStripe();
  const elements = useElements();

  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!stripe || !elements || isProcessing) {
      return;
    }

    setIsProcessing(true);
    onPaymentError("");

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/payments/${paymentId}`,
      },
    });

    if (error) {
      onPaymentError(error.message ?? "Unable to complete Stripe payment.");

      setIsProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <PaymentElement />

      <Button
        type="submit"
        className="w-full"
        disabled={!stripe || !elements || isProcessing}
      >
        {isProcessing
          ? "Processing payment..."
          : `Pay ₹${amount.toLocaleString("en-IN")}`}
      </Button>
    </form>
  );
}
