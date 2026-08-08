export interface Cart {
  _id: string;
  userId: string;
  items: CartItem[];
  createdAt: string;
  updatedAt: string;
}

export interface AddToCartRequest {
  productId: string;
  quantity: number;
}

export interface AddToCartResponse {
  success: boolean;
  message: string;
  data: Cart;
}

export interface CartProduct {
  _id: string;
  name: string;
  slug: string;
  mainImage: string;
  galleryImages: string[];
  price: number;
  discountPrice: number;
  stock: number;
}

export interface CartItem {
  productId: CartProduct;
  quantity: number;
}

export interface Cart {
  _id: string;
  userId: string;
  items: CartItem[];
  createdAt: string;
  updatedAt: string;
}

export interface AddToCartRequest {
  productId: string;
  quantity: number;
}

export interface AddToCartResponse {
  success: boolean;
  message: string;
  data: Cart;
}

export interface GetCartResponse {
  success: boolean;
  message: string;
  data: Cart;
}

export interface UpdateCartItemRequest {
  quantity: number;
}

export interface UpdateCartItemResponse {
  success: boolean;
  message: string;
  data: Cart;
}

export interface RemoveCartItemResponse {
  success: boolean;
  message: string;
  data: Cart;
}

export interface ClearCartResponse {
  success: boolean;
  message: string;
  data: Cart;
}
