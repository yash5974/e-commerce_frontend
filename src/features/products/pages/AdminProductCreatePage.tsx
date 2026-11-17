import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

import { useCategories } from "@/features/categories";
import { ProductForm, type ProductFormValues } from "../components/ProductForm";
import { useCreateProduct } from "../hooks/useCreateProduct";
import type { CreateProductFormValues } from "../schemas/product.schema";

export function AdminProductCreatePage() {
  const navigate = useNavigate();
  const { categories } = useCategories();
  const { submit, isCreating, error } = useCreateProduct();

  const handleSubmit = async (values: ProductFormValues): Promise<void> => {
    if (!values.mainImage) {
      toast.error("Please select a main product image.");
      return;
    }

    const payload: CreateProductFormValues = {
      name: values.name,
      description: values.description,
      categoryId: values.categoryId,
      brand: values.brand,
      price: values.price,
      discountPrice: values.discountPrice,
      stock: values.stock,
      mainImage: values.mainImage,
      galleryImages: values.galleryImages,
      tags: values.tags.map((tag) => tag.trim()).filter(Boolean),
    };

    try {
      await submit(payload);
      toast.success("Product created successfully.");
      navigate("/admin/products");
    } catch {
      // Keep the error visible through the existing hook.
    }
  };

  return (
    <div className="mx-auto w-full max-w-5xl space-y-6 p-6">
      <div>
        <h1 className="text-2xl font-semibold">Create product</h1>
        <p className="text-sm text-muted-foreground">
          Add a new product to your catalog.
        </p>
      </div>

      <ProductForm
        categories={categories}
        isSubmitting={isCreating}
        serverError={error}
        onSubmit={handleSubmit}
        onCancel={() => navigate("/admin/products")}
      />
    </div>
  );
}
