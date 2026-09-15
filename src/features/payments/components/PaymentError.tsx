import { AlertCircle, X } from "lucide-react";

import { Button } from "@/ui/button";

interface PaymentErrorProps {
  message: string;
  onRetry: () => void;
  onDismiss: () => void;
  isRetrying?: boolean;
}

export default function PaymentError({
  message,
  onRetry,
  onDismiss,
  isRetrying = false,
}: PaymentErrorProps) {
  return (
    <div className="rounded-xl border border-destructive/30 bg-destructive/5 p-4">
      <div className="flex items-start gap-3">
        <AlertCircle className="mt-0.5 size-5 text-destructive" />

        <div className="min-w-0 flex-1">
          <h2 className="font-medium text-destructive">
            Payment initialization failed
          </h2>

          <p className="mt-1 text-sm text-muted-foreground">{message}</p>

          <Button
            type="button"
            size="sm"
            className="mt-4"
            onClick={onRetry}
            disabled={isRetrying}
          >
            {isRetrying ? "Retrying..." : "Try Again"}
          </Button>
        </div>

        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={onDismiss}
          aria-label="Dismiss error"
        >
          <X className="size-4" />
        </Button>
      </div>
    </div>
  );
}
