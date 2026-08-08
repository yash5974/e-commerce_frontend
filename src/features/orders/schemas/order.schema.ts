import { z } from "zod";

export const createOrderItemSchema = z.object({
  productId: z.string().min(1, "Product is required."),
  quantity: z
    .number()
    .int("Quantity must be a whole number.")
    .min(1, "Quantity must be at least 1."),
});

export const createOrderSchema = z.object({
  items: z.array(createOrderItemSchema).min(1, "Your cart is empty."),
});

export type CreateOrderFormValues = z.infer<typeof createOrderSchema>;
