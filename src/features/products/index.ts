export { default as ProductCard } from "./components/ProductCard";
export { default as ProductDetailsInfo } from "./components/ProductDetailsInfo";
export { default as ProductDetailsSkeleton } from "./components/ProductDetailsSkeleton";
export { default as ProductFilters } from "./components/ProductFilters";
export { ProductForm } from "./components/ProductForm";
export { default as ProductGrid } from "./components/ProductGrid";
export { default as ProductImageGallery } from "./components/ProductImageGallery";
export { default as ProductPagination } from "./components/ProductPagination";
export { default as ProductSkeleton } from "./components/ProductSkeleton";
export { default as ProductDetailsPage } from "./pages/ProductDetailsPage";
export { default as ProductsPage } from "./pages/ProductPage";

export { useProductDetails } from "./hooks/useProductDetails";
export { useProducts } from "./hooks/useProducts";

export { AdminProductCreatePage } from "./pages/AdminProductCreatePage";
export { AdminProductEditPage } from "./pages/AdminProductEditPage";

export { useCreateProduct } from "./hooks/useCreateProduct";
export { useProduct } from "./hooks/useProduct";
export { useUpdateProduct } from "./hooks/useUpdateProduct";

export { createProduct, updateProduct } from "./store/product.slice";

export type {
  CreateProductPayload,
  Product,
  ProductDetails,
  ProductDetailsResponse,
  ProductFilters as ProductFilterParams,
  ProductListResponse,
  ProductPaginationMeta,
  ProductSort,
  UpdateProductPayload,
} from "./types/product.type";
