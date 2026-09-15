import API_ENDPOINTS from "@/api/endpoints";
import { apiClient } from "@/api/client";

import type {
  UpdateInventoryRequest,
  UpdateInventoryResponse,
} from "../types/inventory.type";

export const inventoryApi = {
  updateInventory(
    productId: string,
    body: UpdateInventoryRequest,
  ): Promise<UpdateInventoryResponse> {
    return apiClient.patch<UpdateInventoryResponse, UpdateInventoryRequest>(
      API_ENDPOINTS.ADMIN.INVENTORY.UPDATE(productId),
      body,
    );
  },
};
