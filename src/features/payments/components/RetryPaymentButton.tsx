import { Button } from "@/ui/button";

interface RetryPaymentButtonProps {
  onRetry: () => void;
  isRetrying?: boolean;
  disabled?: boolean;
}

export default function RetryPaymentButton({
  onRetry,
  isRetrying = false,
  disabled = false,
}: RetryPaymentButtonProps) {
  return (
    <Button
      type="button"
      className="w-full"
      onClick={onRetry}
      disabled={disabled || isRetrying}
    >
      {isRetrying ? "Initializing retry..." : "Retry Payment"}
    </Button>
  );
}
