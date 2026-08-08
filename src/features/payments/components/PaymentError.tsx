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
    <div className="rounded-xl border border-destructive/30 bg-destructive/5 p-5">
      <h2 className="font-semibold text-destructive">
        Payment initialization failed
      </h2>

      <p className="mt-2 text-sm text-destructive">{message}</p>

      <div className="mt-4 flex gap-3">
        <Button type="button" onClick={onRetry} disabled={isRetrying}>
          {isRetrying ? "Retrying..." : "Try Again"}
        </Button>

        <Button type="button" variant="ghost" onClick={onDismiss}>
          Dismiss
        </Button>
      </div>
    </div>
  );
}
