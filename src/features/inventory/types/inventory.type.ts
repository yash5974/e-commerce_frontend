export type InventoryLogType = "ORDER" | "RESTOCK";

export interface UpdateInventoryRequest {
  quantity: number;
  type: InventoryLogType;
}

export interface UpdateInventoryResponse {
  success: boolean;
  message: string;
  data: {
    productId: string;
    stock: number;
  };
}
