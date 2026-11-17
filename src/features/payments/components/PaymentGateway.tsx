import { Elements } from "@stripe/react-stripe-js";

import { stripePromise } from "@/config/payment.config";

import RazorpayPaymentForm from "./RazorpayPaymentForm";
import StripePaymentForm from "./StripePaymentForm";

import type {
  PaymentIntentProvider,
  StripePaymentIntent,
} from "../types/payment.type";

interface PaymentGatewayProps {
  intent: PaymentIntentProvider;
  onPaymentError: (message: string) => void;
}

export default function PaymentGateway({
  intent,
  onPaymentError,
}: PaymentGatewayProps) {
  if (intent.provider === "stripe") {
    return <StripeGateway intent={intent} onPaymentError={onPaymentError} />;
  }

  return (
    <RazorpayPaymentForm
      orderId={intent.orderId}
      paymentId={intent.paymentId}
      razorpayOrderId={intent.providerOrderId}
      amount={intent.amount}
      onPaymentError={onPaymentError}
    />
  );
}

function StripeGateway({
  intent,
  onPaymentError,
}: {
  intent: StripePaymentIntent;
  onPaymentError: (message: string) => void;
}) {
  const clientSecret = intent.providerClientSecret?.trim();

  if (!clientSecret) {
    return (
      <div className="rounded-lg border border-destructive/30 bg-destructive/5 p-4">
        <p className="text-sm text-destructive">
          Stripe payment could not be initialized because the payment client
          secret is missing.
        </p>

        <button
          type="button"
          className="mt-3 text-sm font-medium underline"
          onClick={() =>
            onPaymentError(
              "Stripe payment could not be initialized. Please try again.",
            )
          }
        >
          Try again
        </button>
      </div>
    );
  }

  return (
    <Elements
      stripe={stripePromise}
      options={{
        clientSecret,
        appearance: {
          theme: "stripe",
        },
      }}
    >
      <StripePaymentForm
        paymentId={intent.paymentId}
        amount={intent.amount}
        onPaymentError={onPaymentError}
      />
    </Elements>
  );
}
