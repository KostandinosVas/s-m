import type { Product } from "@/infrastructure/db/schema/products";
import { formatPrice } from "@/lib/format";

export type ProductDto = {
  slug: string;
  name: string;
  description: string | null;
  price: {
    cents: number;
    currency: string;
    formatted: string;
  };
  isAvailable: boolean;
};

export function toProductDto(product: Product): ProductDto {
  return {
    slug: product.slug,
    name: product.name,
    description: product.description,
    price: {
      cents: product.priceCents,
      currency: product.currency,
      formatted: formatPrice(product.priceCents, product.currency),
    },
    isAvailable: product.stockQuantity > 0,
  };
}