import { ProductForm, useCreateProduct } from "@/features/products";
import type { CreateProductFormValues } from "@/features/products/schemas/product.schema";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useCategories } from "../hooks/useCategories";

export const AdminProductCreatePage = () => {
  const navigate = useNavigate();

  const { submit, isCreating, error } = useCreateProduct();

  const {
    categories,
    isLoading: isLoadingCategories,
    error: categoryError,
    refresh: refreshCategories,
  } = useCategories();

  const handleSubmit = async (values: CreateProductFormValues) => {
    try {
      await submit(values);

      toast.success("Product created successfully.");
      navigate("/admin/products");
    } catch {
      // The existing product hook handles the server error.
    }
  };

  return (
    <div className="mx-auto w-full max-w-5xl space-y-6 p-4 sm:p-6">
      <div>
        <h1 className="text-2xl font-semibold">Create product</h1>

        <p className="text-sm text-muted-foreground">
          Add a new product to your catalog.
        </p>
      </div>

      {categoryError && (
        <div
          role="alert"
          className="space-y-3 rounded-md border border-destructive/30 bg-destructive/10 p-4 text-sm text-destructive"
        >
          <p>Unable to load product categories: {categoryError}</p>

          <button
            type="button"
            disabled={isLoadingCategories}
            onClick={() => {
              void refreshCategories().catch(() => {
                // The Redux slice retains the error for display.
              });
            }}
            className="rounded-md border border-current px-3 py-2"
          >
            Retry loading categories
          </button>
        </div>
      )}

      {isLoadingCategories ? (
        <div
          role="status"
          className="rounded-md border p-6 text-sm text-muted-foreground"
        >
          Loading categories...
        </div>
      ) : (
        <ProductForm
          categories={categories.map(({ _id, name }) => ({
            _id,
            name,
          }))}
          isSubmitting={isCreating}
          serverError={error}
          onSubmit={handleSubmit}
          onCancel={() => navigate("/admin/products")}
        />
      )}
    </div>
  );
};
