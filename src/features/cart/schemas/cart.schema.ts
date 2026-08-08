import { z } from "zod";

export const productIdSchema = z
  .string()
  .trim()
  .regex(/^[a-f\d]{24}$/i, "Invalid product ID");

export const quantitySchema = z
  .number()
  .int("Quantity must be an integer")
  .positive("Quantity must be greater than zero");

export const addToCartSchema = z.object({
  productId: productIdSchema,
  quantity: quantitySchema,
});

export const updateCartItemSchema = z.object({
  quantity: quantitySchema,
});

export type AddToCartInput = z.infer<typeof addToCartSchema>;

export type UpdateCartItemInput = z.infer<typeof updateCartItemSchema>;
