import { CheckCircle2, CircleAlert, Clock3 } from "lucide-react";
import { PaymentStatus as PaymentStatusEnum } from "../types/payment.type";

export interface PaymentStatusProps {
  status: PaymentStatusEnum;
}

const statusConfig: Record<
  PaymentStatusEnum,
  {
    label: string;
    description: string;
    icon: typeof CheckCircle2;
  }
> = {
  [PaymentStatusEnum.CREATED]: {
    label: "Payment Pending",
    description: "Your payment is awaiting completion.",
    icon: Clock3,
  },

  [PaymentStatusEnum.SUCCESS]: {
    label: "Payment Successful",
    description: "Your payment has been completed successfully.",
    icon: CheckCircle2,
  },

  [PaymentStatusEnum.FAILED]: {
    label: "Payment Failed",
    description: "The payment attempt was unsuccessful.",
    icon: CircleAlert,
  },
};

const fallbackConfig = {
  label: "Payment Status Unknown",
  description: "We could not determine the current payment status.",
  icon: CircleAlert,
};

export default function PaymentStatus({ status }: PaymentStatusProps) {
  const config = statusConfig[status] ?? fallbackConfig;
  const Icon = config.icon;

  return (
    <div className="flex items-start gap-3 rounded-xl border p-4">
      <Icon className="mt-0.5 size-5 shrink-0" />

      <div>
        <p className="font-medium">{config.label}</p>

        <p className="mt-1 text-sm text-muted-foreground">
          {config.description}
        </p>
      </div>
    </div>
  );
}
