import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { Controller, useForm, type DefaultValues } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/ui/button";
import { Input } from "@/ui/input";
import { Textarea } from "@/ui/textarea";

import type { Product } from "../types/product.type";

const productFormSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(1, "Product name is required")
      .max(150, "Product name must be at most 150 characters"),

    description: z
      .string()
      .trim()
      .min(1, "Description is required")
      .max(5000, "Description must be at most 5000 characters"),

    categoryId: z.string().trim().min(1, "Category is required"),

    brand: z
      .string()
      .trim()
      .min(1, "Brand is required")
      .max(100, "Brand must be at most 100 characters"),

    price: z
      .number({ error: "Price is required" })
      .finite("Price must be a valid number")
      .nonnegative("Price cannot be negative"),

    discountPrice: z
      .number({ error: "Discount price is required" })
      .finite("Discount price must be a valid number")
      .nonnegative("Discount price cannot be negative"),

    stock: z
      .number({ error: "Stock is required" })
      .int("Stock must be a whole number")
      .nonnegative("Stock cannot be negative"),

    mainImage: z.instanceof(File).optional(),

    galleryImages: z
      .array(z.instanceof(File))
      .max(10, "Maximum 10 gallery images are allowed"),

    tags: z
      .array(
        z
          .string()
          .trim()
          .min(1, "Tag cannot be empty")
          .max(50, "Tag cannot exceed 50 characters"),
      )
      .max(20, "Maximum 20 tags are allowed"),
  })
  .superRefine((data, ctx) => {
    if (data.discountPrice > data.price) {
      ctx.addIssue({
        code: "custom",
        path: ["discountPrice"],
        message: "Discount price cannot be greater than price",
      });
    }
  });

export type ProductFormValues = z.infer<typeof productFormSchema>;

interface ProductFormProps {
  product?: Product | null;

  categories: Array<{
    _id: string;
    name: string;
  }>;

  isSubmitting: boolean;
  serverError?: string | null;

  onSubmit: (values: ProductFormValues) => Promise<void>;
  onCancel?: () => void;
}

const defaultValues: DefaultValues<ProductFormValues> = {
  name: "",
  description: "",
  categoryId: "",
  brand: "",
  price: 0,
  discountPrice: 0,
  stock: 0,
  mainImage: undefined,
  galleryImages: [],
  tags: [],
};

export const ProductForm = ({
  product,
  categories,
  isSubmitting,
  serverError,
  onSubmit,
  onCancel,
}: ProductFormProps) => {
  const {
    register,
    control,
    handleSubmit,
    reset,
    setValue,
    setError,
    watch,
    formState: { errors, isDirty },
  } = useForm<ProductFormValues>({
    resolver: zodResolver(productFormSchema),
    defaultValues,
    mode: "onBlur",
  });

  useEffect(() => {
    if (!product) {
      reset(defaultValues);
      return;
    }

    reset({
      name: product.name,
      description: product.description,
      categoryId: product.categoryId,
      brand: product.brand,
      price: product.price,
      discountPrice: product.discountPrice,
      stock: product.stock,
      mainImage: undefined,
      galleryImages: [],
      tags: product.tags ?? [],
    });
  }, [product, reset]);

  const galleryImages = watch("galleryImages") ?? [];
  const tags = watch("tags") ?? [];

  const removeGalleryImage = (index: number) => {
    const updatedFiles = galleryImages.filter(
      (_, currentIndex) => currentIndex !== index,
    );

    setValue("galleryImages", updatedFiles, {
      shouldDirty: true,
      shouldValidate: true,
    });
  };

  const addTag = () => {
    if (tags.length >= 20) {
      return;
    }

    setValue("tags", [...tags, ""], {
      shouldDirty: true,
      shouldValidate: true,
    });
  };

  const removeTag = (index: number) => {
    setValue(
      "tags",
      tags.filter((_, currentIndex) => currentIndex !== index),
      {
        shouldDirty: true,
        shouldValidate: true,
      },
    );
  };

  const submit = async (values: ProductFormValues) => {
    if (!product && !values.mainImage) {
      setError("mainImage", {
        type: "required",
        message: "Main image is required",
      });

      return;
    }

    await onSubmit({
      ...values,
      tags: values.tags.map((tag) => tag.trim()).filter(Boolean),
    });
  };

  return (
    <form onSubmit={handleSubmit(submit)} className="space-y-8">
      {serverError && (
        <div className="rounded-md border border-destructive/30 bg-destructive/10 p-4 text-sm text-destructive">
          {serverError}
        </div>
      )}

      {/* BASIC INFORMATION */}

      <section className="space-y-4">
        <div>
          <h2 className="text-lg font-semibold">Basic information</h2>

          <p className="text-sm text-muted-foreground">
            Provide the main information about the product.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-medium">
              Product name
            </label>

            <Input
              id="name"
              {...register("name")}
              placeholder="Enter product name"
            />

            {errors.name && (
              <p className="text-sm text-destructive">{errors.name.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <label htmlFor="brand" className="text-sm font-medium">
              Brand
            </label>

            <Input
              id="brand"
              {...register("brand")}
              placeholder="Enter brand"
            />

            {errors.brand && (
              <p className="text-sm text-destructive">{errors.brand.message}</p>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="description" className="text-sm font-medium">
            Description
          </label>

          <Textarea
            id="description"
            {...register("description")}
            placeholder="Enter product description"
            rows={6}
          />

          {errors.description && (
            <p className="text-sm text-destructive">
              {errors.description.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <label htmlFor="categoryId" className="text-sm font-medium">
            Category
          </label>

          <select
            id="categoryId"
            {...register("categoryId")}
            className="h-10 w-full rounded-md border bg-background px-3 text-sm"
          >
            <option value="">Select category</option>

            {categories.map((category) => (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            ))}
          </select>

          {errors.categoryId && (
            <p className="text-sm text-destructive">
              {errors.categoryId.message}
            </p>
          )}
        </div>
      </section>

      {/* PRICING */}

      <section className="space-y-4">
        <div>
          <h2 className="text-lg font-semibold">Pricing</h2>

          <p className="text-sm text-muted-foreground">
            Configure product pricing.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <label htmlFor="price" className="text-sm font-medium">
              Price
            </label>

            <Input
              id="price"
              type="number"
              min={0}
              step="0.01"
              {...register("price", {
                valueAsNumber: true,
              })}
            />

            {errors.price && (
              <p className="text-sm text-destructive">{errors.price.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <label htmlFor="discountPrice" className="text-sm font-medium">
              Discount price
            </label>

            <Input
              id="discountPrice"
              type="number"
              min={0}
              step="0.01"
              {...register("discountPrice", {
                valueAsNumber: true,
              })}
            />

            {errors.discountPrice && (
              <p className="text-sm text-destructive">
                {errors.discountPrice.message}
              </p>
            )}
          </div>
        </div>
      </section>

      {/* INVENTORY */}

      <section className="space-y-4">
        <div>
          <h2 className="text-lg font-semibold">Inventory</h2>
        </div>

        <div className="space-y-2">
          <label htmlFor="stock" className="text-sm font-medium">
            Stock
          </label>

          <Input
            id="stock"
            type="number"
            min={0}
            step={1}
            {...register("stock", {
              valueAsNumber: true,
            })}
          />

          {errors.stock && (
            <p className="text-sm text-destructive">{errors.stock.message}</p>
          )}
        </div>
      </section>

      {/* MEDIA */}

      <section className="space-y-4">
        <div>
          <h2 className="text-lg font-semibold">Media</h2>

          <p className="text-sm text-muted-foreground">
            Upload product images.
          </p>
        </div>

        {/* MAIN IMAGE */}

        <div className="space-y-2">
          <label htmlFor="mainImage" className="text-sm font-medium">
            Main image
          </label>

          <Controller
            name="mainImage"
            control={control}
            render={({ field }) => (
              <input
                id="mainImage"
                name={field.name}
                ref={field.ref}
                type="file"
                accept="image/*"
                onBlur={field.onBlur}
                onChange={(event) => {
                  const file = event.currentTarget.files?.item(0) ?? undefined;
                  field.onChange(file);
                }}
                className="block w-full cursor-pointer rounded-md border border-input bg-background px-3 py-2 text-sm file:mr-4 file:rounded-md file:border-0 file:bg-primary file:px-3 file:py-1 file:text-primary-foreground"
              />
            )}
          />

          {/* <Input
            id="mainImage"
            type="file"
            accept="image/*"
            {...register("mainImage", {
              onChange: (event) => {
                const file = event.target.files?.[0];

                setValue("mainImage", file, {
                  shouldDirty: true,
                  shouldValidate: true,
                });
              },
            })}
          /> */}

          <p className="text-xs text-muted-foreground">
            Select the primary product image.
          </p>

          {errors.mainImage && (
            <p className="text-sm text-destructive">
              {errors.mainImage.message}
            </p>
          )}

          {product?.mainImage && (
            <p className="text-xs text-muted-foreground">
              Existing main image will remain unchanged unless you select a new
              image.
            </p>
          )}
        </div>

        {/* GALLERY IMAGES */}

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label htmlFor="galleryImages" className="text-sm font-medium">
              Gallery images
            </label>
          </div>

          <Controller
            name="galleryImages"
            control={control}
            render={({ field }) => (
              <input
                id="galleryImages"
                name={field.name}
                ref={field.ref}
                type="file"
                accept="image/*"
                multiple
                onBlur={field.onBlur}
                onChange={(event) => {
                  const files = Array.from(
                    event.currentTarget.files ?? [],
                  ).slice(0, 10);

                  field.onChange(files);
                }}
                className="block w-full cursor-pointer rounded-md border border-input bg-background px-3 py-2 text-sm file:mr-4 file:rounded-md file:border-0 file:bg-primary file:px-3 file:py-1 file:text-primary-foreground"
              />
            )}
          />

          {/* <Input
            id="galleryImages"
            type="file"
            accept="image/*"
            multiple
            {...register("galleryImages", {
              onChange: (event) => {
                const fileList = event.target.files;
                const files: File[] = fileList ? Array.from(fileList) : [];

                setValue("galleryImages", files.slice(0, 10), {
                  shouldDirty: true,
                  shouldValidate: true,
                });
              },
            })}
          /> */}

          <p className="text-xs text-muted-foreground">
            Select up to 10 gallery images.
          </p>

          {errors.galleryImages && (
            <p className="text-sm text-destructive">
              {errors.galleryImages.message}
            </p>
          )}

          {galleryImages.length > 0 && (
            <div className="space-y-2">
              {galleryImages.map((file, index) => (
                <div
                  key={`${file.name}-${index}`}
                  className="flex items-center justify-between gap-2 rounded-md border p-3"
                >
                  <span className="min-w-0 truncate text-sm">{file.name}</span>

                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => removeGalleryImage(index)}
                  >
                    Remove
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* TAGS */}

      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold">Tags</h2>
          </div>

          <Button
            type="button"
            variant="outline"
            onClick={addTag}
            disabled={tags.length >= 20}
          >
            Add tag
          </Button>
        </div>

        {tags.map((_, index) => (
          <div key={index} className="flex gap-2">
            <Input
              {...register(`tags.${index}`)}
              placeholder="e.g. electronics"
            />

            <Button
              type="button"
              variant="outline"
              onClick={() => removeTag(index)}
            >
              Remove
            </Button>
          </div>
        ))}
      </section>

      {/* ACTIONS */}

      <div className="flex justify-end gap-3 border-t pt-6">
        {onCancel && (
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
        )}

        <Button
          type="submit"
          disabled={isSubmitting || (!!product && !isDirty)}
        >
          {isSubmitting
            ? "Saving..."
            : product
              ? "Update product"
              : "Create product"}
        </Button>
      </div>
    </form>
  );
};
