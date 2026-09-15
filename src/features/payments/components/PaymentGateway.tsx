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
      razorpayOrderId={intent.razorpayOrderId}
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
  return (
    <Elements
      stripe={stripePromise}
      options={{
        clientSecret: intent.clientSecret,
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
