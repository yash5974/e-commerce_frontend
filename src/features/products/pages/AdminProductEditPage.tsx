import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

import { ProductForm } from "../components/ProductForm";
import { useProduct } from "../hooks/useProduct";
import { useUpdateProduct } from "../hooks/useUpdateProduct";

import { UpdateInventoryDialog } from "@/features/inventory";
import { Button } from "@/ui/button";
import { useState } from "react";
import ProductDeleteDialog from "../components/ProductDeleteDialog";
import type {
  ProductFormValues,
  UpdateProductFormValues,
} from "../schemas/product.schema";

export const AdminProductEditPage = () => {
  const navigate = useNavigate();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [inventoryDialogOpen, setInventoryDialogOpen] = useState(false);

  const { id } = useParams();

  const {
    product,
    isLoading: isProductLoading,
    error: productError,
  } = useProduct(id);

  const { submit, isUpdating, error: updateError } = useUpdateProduct();

  const handleSubmit = async (values: ProductFormValues): Promise<void> => {
    if (!id) {
      toast.error("Product ID is missing.");
      return;
    }

    const payload: UpdateProductFormValues = {
      name: values.name,
      description: values.description,
      categoryId: values.categoryId,
      brand: values.brand,
      price: values.price,
      discountPrice: values.discountPrice,
      stock: values.stock,
      tags: values.tags.map((tag) => tag.trim()).filter(Boolean),
      ...(values.mainImage ? { mainImage: values.mainImage } : {}),
      ...(values.galleryImages.length > 0
        ? { galleryImages: values.galleryImages }
        : {}),
    };

    try {
      await submit(id, payload);
      toast.success("Product updated successfully.");
      navigate("/admin/products");
    } catch {
      // Keep the update error visible in the form.
    }
  };

  if (isProductLoading) {
    return <div className="p-6">Loading product...</div>;
  }

  if (productError || !product) {
    return (
      <div className="p-6">
        <div className="rounded-md border border-destructive/30 bg-destructive/10 p-4 text-sm text-destructive">
          {productError ?? "Product not found."}
        </div>
      </div>
    );
  }

  /*
   * Replace with your category query.
   */
  const categories: Array<{
    _id: string;
    name: string;
  }> = [];

  return (
    <div className="mx-auto w-full max-w-5xl space-y-6 p-6">
      <div>
        <h1 className="text-2xl font-semibold">Edit product</h1>

        <p className="text-sm text-muted-foreground">Update {product.name}.</p>
      </div>

      <ProductForm
        product={product}
        categories={categories}
        isSubmitting={isUpdating}
        serverError={updateError}
        onSubmit={handleSubmit}
        onCancel={() => navigate("/admin/products")}
      />

      <div className="flex gap-3">
        <Button
          type="button"
          variant="outline"
          onClick={() => setInventoryDialogOpen(true)}
        >
          Update Inventory
        </Button>
      </div>

      <div className="rounded-lg border border-destructive/30 p-6">
        <div>
          <h2 className="font-semibold text-destructive">Danger zone</h2>

          <p className="mt-1 text-sm text-muted-foreground">
            Deactivating this product will remove it from the customer-facing
            product catalog.
          </p>
        </div>

        <Button
          type="button"
          variant="destructive"
          className="mt-4"
          onClick={() => setDeleteDialogOpen(true)}
        >
          Deactivate Product
        </Button>
      </div>

      <UpdateInventoryDialog
        productId={product._id}
        productName={product.name}
        currentStock={product.stock}
        open={inventoryDialogOpen}
        onOpenChange={setInventoryDialogOpen}
      />

      <ProductDeleteDialog
        product={product}
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
      />
    </div>
  );
};
