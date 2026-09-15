import { inventoryApi } from "../api/inventory.api";

import type {
  UpdateInventoryRequest,
  UpdateInventoryResponse,
} from "../types/inventory.type";

export const inventoryService = {
  updateInventory(
    productId: string,
    body: UpdateInventoryRequest,
  ): Promise<UpdateInventoryResponse> {
    return inventoryApi.updateInventory(productId, body);
  },
};
