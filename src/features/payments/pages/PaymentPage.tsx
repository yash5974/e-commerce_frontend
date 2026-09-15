import { Button } from "@/ui/button";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import PaymentError from "../components/PaymentError";
import PaymentGateway from "../components/PaymentGateway";
import PaymentMethodSelector from "../components/PaymentMethodSelector";
import PaymentSummary from "../components/PaymentSummary";
import { useCreatePaymentIntent } from "../hooks/useCreatePaymentIntent";
import type { PaymentProvider } from "../types/payment.type";

export default function PaymentPage() {
  const { orderId } = useParams<{ orderId: string }>();
  const [provider, setProvider] = useState<PaymentProvider | null>(null);
  const [paymentError, setPaymentError] = useState<string | null>(null);
  const { intent, isCreatingIntent, error, createIntent, dismissError } =
    useCreatePaymentIntent();
  const handleCreateIntent = () => {
    if (!orderId || !provider) {
      return;
    }
    dismissError();
    setPaymentError(null);
    void createIntent(orderId, provider);
  };
  const handleRetry = () => {
    if (!orderId || !provider) {
      return;
    }
    dismissError();
    setPaymentError(null);
    void createIntent(orderId, provider);
  };
  if (!orderId) {
    return (
      <main className="container mx-auto px-4 py-10">
        {" "}
        <div className="mx-auto max-w-xl text-center">
          {" "}
          <h1 className="text-2xl font-semibold">
            {" "}
            Invalid payment request{" "}
          </h1>{" "}
          <Button className="mt-6">
            {" "}
            <Link to="/orders">My Orders</Link>{" "}
          </Button>{" "}
        </div>{" "}
      </main>
    );
  }
  const displayError = error ?? paymentError;
  return (
    <main className="container mx-auto px-4 py-10">
      {" "}
      <div className="mx-auto max-w-2xl">
        {" "}
        <div className="mb-8">
          {" "}
          <h1 className="text-3xl font-bold"> Payment </h1>{" "}
          <p className="mt-1 text-sm text-muted-foreground">
            {" "}
            Complete payment securely for your order.{" "}
          </p>{" "}
        </div>{" "}
        {displayError && (
          <div className="mb-6">
            {" "}
            <PaymentError
              message={displayError}
              onRetry={handleRetry}
              onDismiss={() => {
                dismissError();
                setPaymentError(null);
              }}
              isRetrying={isCreatingIntent}
            />{" "}
          </div>
        )}{" "}
        {!intent && (
          <div className="space-y-6">
            {" "}
            <div>
              {" "}
              <h2 className="mb-3 text-lg font-semibold">
                {" "}
                Choose payment method{" "}
              </h2>{" "}
              <PaymentMethodSelector
                value={provider}
                onChange={setProvider}
                disabled={isCreatingIntent}
              />{" "}
            </div>{" "}
            <div className="rounded-xl border p-6">
              {" "}
              <Button
                type="button"
                className="w-full"
                disabled={!provider || isCreatingIntent}
                onClick={handleCreateIntent}
              >
                {" "}
                {isCreatingIntent
                  ? "Initializing secure payment..."
                  : "Continue to Payment"}{" "}
              </Button>{" "}
            </div>{" "}
            <Button variant="outline" className="w-full">
              {" "}
              <Link to={`/orders/${orderId}`}> Back to Order </Link>{" "}
            </Button>{" "}
          </div>
        )}{" "}
        {intent && (
          <div className="space-y-6">
            {" "}
            <PaymentSummary intent={intent} />{" "}
            <div className="rounded-xl border p-6">
              {" "}
              <h2 className="text-lg font-semibold"> Secure Payment </h2>{" "}
              <p className="mt-2 mb-6 text-sm text-muted-foreground">
                {" "}
                Complete your payment securely using{" "}
                {intent.provider === "stripe" ? "Stripe" : "Razorpay"}.{" "}
              </p>{" "}
              <PaymentGateway
                intent={intent}
                onPaymentError={setPaymentError}
              />{" "}
            </div>{" "}
            <Button variant="outline" className="w-full">
              {" "}
              <Link to={`/orders/${orderId}`}> Back to Order </Link>{" "}
            </Button>{" "}
          </div>
        )}{" "}
      </div>{" "}
    </main>
  );
}
