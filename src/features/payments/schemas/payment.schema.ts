import { z } from "zod";

import { PaymentProvider } from "../types/payment.type";

export const createPaymentIntentSchema = z.object({
  orderId: z.string().min(1, "Order ID is required"),

  provider: z.enum(PaymentProvider),
});

export type CreatePaymentIntentFormValues = z.infer<
  typeof createPaymentIntentSchema
>;

export const paymentProviderSchema = z.enum(["stripe", "razorpay"]);

export const paymentStatusSchema = z.enum(["CREATED", "SUCCESS", "FAILED"]);

export const paymentSchema = z.object({
  paymentId: z.string(),
  orderId: z.string(),

  provider: paymentProviderSchema,

  providerPaymentId: z.string().optional(),
  providerOrderId: z.string().optional(),
  providerClientSecret: z.string().optional(),

  status: paymentStatusSchema,

  /**
   * INR major units.
   */
  amount: z.number().finite().nonnegative(),

  /**
   * INR major units.
   */
  refundedAmount: z.number().finite().nonnegative(),

  createdAt: z.string(),
  updatedAt: z.string(),
});

export const paymentIntentSchema = z.object({
  paymentId: z.string(),
  orderId: z.string(),

  provider: paymentProviderSchema,

  providerPaymentId: z.string().optional(),
  providerOrderId: z.string().optional(),
  providerClientSecret: z.string().optional(),

  status: paymentStatusSchema,

  amount: z.number().finite().nonnegative(),

  createdAt: z.string(),
});

export const createPaymentIntentResponseSchema = z.object({
  success: z.boolean(),
  message: z.string(),
  data: paymentIntentSchema,
});

export const getPaymentResponseSchema = z.object({
  success: z.boolean(),
  data: z.object({
    payment: paymentSchema,
  }),
});

export const retryPaymentSchema = z.object({
  provider: paymentProviderSchema,
});

export const refundPaymentSchema = z.object({
  amount: z
    .number()
    .positive("Refund amount must be greater than zero")
    .finite("Refund amount must be a valid number")
    .optional(),

  reason: z
    .string()
    .trim()
    .min(1, "Refund reason is required")
    .max(500, "Refund reason must not exceed 500 characters"),
});

export const refundStatusSchema = z.enum(["PENDING", "SUCCESS", "FAILED"]);

export const refundSchema = z.object({
  id: z.string(),
  paymentId: z.string(),
  orderId: z.string(),

  provider: paymentProviderSchema,

  providerRefundId: z.string().optional(),

  amount: z.number().finite().nonnegative(),

  reason: z.string(),

  status: refundStatusSchema,

  createdAt: z.string(),
  updatedAt: z.string(),
});

export const refundPaymentResponseSchema = z.object({
  success: z.boolean(),
  message: z.string().optional(),
  data: refundSchema,
});

export type RefundPaymentFormValues = z.infer<typeof refundPaymentSchema>;

export type RefundSchema = z.infer<typeof refundSchema>;

export type PaymentSchema = z.infer<typeof paymentSchema>;
