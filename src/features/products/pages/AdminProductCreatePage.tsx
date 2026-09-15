import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

import { ProductForm } from "../components/ProductForm";
import { useCreateProduct } from "../hooks/useCreateProduct";

import type { CreateProductFormValues } from "../schemas/product.schema";

export const AdminProductCreatePage = () => {
  const navigate = useNavigate();

  const { submit, isCreating, error } = useCreateProduct();

  /*
   * Replace this with your category query/hook.
   *
   * Example:
   * const { categories, isLoading } = useCategories();
   */
  const categories: Array<{
    _id: string;
    name: string;
  }> = [];

  const handleSubmit = async (values: CreateProductFormValues) => {
    try {
      await submit(values);

      toast.success("Product created successfully.");

      navigate("/admin/products");
    } catch {
      // Redux hook already exposes server error.
      // Do not show duplicate notifications here.
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
};
