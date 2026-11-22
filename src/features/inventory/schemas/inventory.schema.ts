import { z } from "zod";

export const inventoryLogTypeSchema = z.enum(["ORDER", "RESTOCK"]);

export const updateInventorySchema = z.object({
  quantity: z.coerce
    .number()
    .int("Quantity must be a whole number.")
    .positive("Quantity must be greater than 0."),

  type: inventoryLogTypeSchema,
});

export type UpdateInventoryFormInput = z.input<typeof updateInventorySchema>;

// Output type after Zod validation and coercion
export type UpdateInventoryFormValues = z.output<typeof updateInventorySchema>;
