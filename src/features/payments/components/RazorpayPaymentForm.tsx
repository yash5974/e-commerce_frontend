import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Button } from "@/ui/button";

interface RazorpayPaymentFormProps {
  orderId: string;
  paymentId: string;
  razorpayOrderId: string;
  amount: number;
  onPaymentError: (message: string) => void;
}

interface RazorpaySuccessResponse {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
}

interface RazorpayInstance {
  open: () => void;

  on: (
    event: string,
    handler: (response: {
      error?: {
        description?: string;
      };
    }) => void,
  ) => void;
}

declare global {
  interface Window {
    Razorpay?: new (options: RazorpayOptions) => RazorpayInstance;
  }
}

interface RazorpayOptions {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description: string;
  order_id: string;
  handler: (response: RazorpaySuccessResponse) => void;

  modal?: {
    ondismiss?: () => void;
  };
}

function loadRazorpayScript(): Promise<boolean> {
  return new Promise((resolve) => {
    if (window.Razorpay) {
      resolve(true);
      return;
    }

    const existingScript = document.querySelector(
      'script[src="https://checkout.razorpay.com/v1/checkout.js"]',
    );

    if (existingScript) {
      existingScript.addEventListener("load", () => resolve(true), {
        once: true,
      });

      existingScript.addEventListener("error", () => resolve(false), {
        once: true,
      });

      return;
    }

    const script = document.createElement("script");

    script.src = "https://checkout.razorpay.com/v1/checkout.js";

    script.async = true;

    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);

    document.body.appendChild(script);
  });
}

export default function RazorpayPaymentForm({
  orderId,
  paymentId,
  razorpayOrderId,
  amount,
  onPaymentError,
}: RazorpayPaymentFormProps) {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);

  const isMounted = useRef(true);

  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);

  const handlePayment = async () => {
    if (isLoading) {
      return;
    }

    setIsLoading(true);
    onPaymentError("");

    try {
      const loaded = await loadRazorpayScript();

      if (!loaded || !window.Razorpay) {
        throw new Error("Unable to load Razorpay Checkout. Please try again.");
      }

      const normalizedOrderId = razorpayOrderId.trim();

      if (!normalizedOrderId) {
        throw new Error("Razorpay order ID is missing.");
      }

      if (!Number.isFinite(amount) || amount <= 0) {
        throw new Error("Invalid payment amount.");
      }

      const amountInPaise = Math.round(amount * 100);

      if (!Number.isSafeInteger(amountInPaise) || amountInPaise <= 0) {
        throw new Error("Invalid payment amount.");
      }

      const razorpayKey = import.meta.env.VITE_RAZORPAY_KEY_ID?.trim();

      if (!razorpayKey) {
        throw new Error("Razorpay key is not configured.");
      }

      const razorpay = new window.Razorpay({
        key: razorpayKey,
        amount: amountInPaise,
        currency: "INR",
        name: "Your Store",
        description: `Payment for order ${orderId}`,
        order_id: normalizedOrderId,

        handler: () => {
          navigate(`/payments/${paymentId}`, {
            replace: true,
          });
        },

        modal: {
          ondismiss: () => {
            if (isMounted.current) {
              setIsLoading(false);
            }
          },
        },
      });

      razorpay.on("payment.failed", (response) => {
        if (!isMounted.current) {
          return;
        }

        onPaymentError(
          response.error?.description ?? "Razorpay payment failed.",
        );

        setIsLoading(false);
      });

      razorpay.open();
    } catch (error) {
      onPaymentError(
        error instanceof Error
          ? error.message
          : "Unable to initialize Razorpay.",
      );

      setIsLoading(false);
    }
  };

  return (
    <Button
      type="button"
      className="mt-6 w-full"
      disabled={isLoading}
      onClick={handlePayment}
    >
      {isLoading
        ? "Opening Razorpay..."
        : `Pay ₹${amount.toLocaleString("en-IN", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}`}
    </Button>
  );
}
