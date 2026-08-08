export { default as PaymentPage } from "./pages/PaymentPage";

export { useCreatePaymentIntent } from "./hooks/useCreatePaymentIntent";

export type {
  PaymentIntent,
  PaymentProvider,
  CreatePaymentIntentRequest,
} from "./types/payment.type";
