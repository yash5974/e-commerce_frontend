import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm, type DefaultValues } from "react-hook-form";

import { Button } from "@/ui/button";
import { Input } from "@/ui/input";
import { Textarea } from "@/ui/textarea";

import {
  createProductSchema,
  type CreateProductFormValues,
} from "../schemas/product.schema";

import type { Product } from "../types/product.type";

interface ProductFormProps {
  product?: Product | null;
  categories: Array<{
    _id: string;
    name: string;
  }>;
  isSubmitting: boolean;
  serverError?: string | null;
  onSubmit: (values: CreateProductFormValues) => Promise<void>;
  onCancel?: () => void;
}

const defaultValues: DefaultValues<CreateProductFormValues> = {
  name: "",
  description: "",
  categoryId: "",
  brand: "",
  price: 0,
  discountPrice: 0,
  stock: 0,
  mainImage: "",
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
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors, isDirty },
  } = useForm<CreateProductFormValues>({
    resolver: zodResolver(createProductSchema),
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
      mainImage: product.mainImage,
      galleryImages: product.galleryImages,
      tags: product.tags,
    });
  }, [product, reset]);

  const galleryImages = watch("galleryImages");

  const tags = watch("tags");

  const addGalleryImage = () => {
    setValue("galleryImages", [...galleryImages, ""], {
      shouldDirty: true,
      shouldValidate: true,
    });
  };

  const removeGalleryImage = (index: number) => {
    setValue(
      "galleryImages",
      galleryImages.filter((_, currentIndex) => currentIndex !== index),
      {
        shouldDirty: true,
        shouldValidate: true,
      },
    );
  };

  const addTag = () => {
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

  const submit = async (values: CreateProductFormValues) => {
    await onSubmit({
      ...values,

      galleryImages: values.galleryImages
        .map((image) => image.trim())
        .filter(Boolean),

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
        </div>

        <div className="space-y-2">
          <label htmlFor="mainImage" className="text-sm font-medium">
            Main image URL
          </label>

          <Input
            id="mainImage"
            {...register("mainImage")}
            placeholder="https://..."
          />

          {errors.mainImage && (
            <p className="text-sm text-destructive">
              {errors.mainImage.message}
            </p>
          )}
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium">Gallery images</label>

            <Button
              type="button"
              variant="outline"
              onClick={addGalleryImage}
              disabled={galleryImages.length >= 10}
            >
              Add image
            </Button>
          </div>

          {galleryImages.map((_, index) => (
            <div key={index} className="flex gap-2">
              <Input
                {...register(`galleryImages.${index}`)}
                placeholder="https://..."
              />

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
