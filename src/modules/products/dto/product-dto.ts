import { formatMoney, money, parseCurrency, type Money } from "@/core/money/money";
import type { ProductWithCategory } from "@/infrastructure/repositories/product-repository";

export type ProductDto = {
  slug: string;
  name: string;
  description: string | null;
  price: Money;
  priceFormatted: string;
  isAvailable: boolean;
  category: {
    slug: string;
    name: string;
  };
};

export function toProductDto(product: ProductWithCategory): ProductDto {
  const price = money(product.priceCents, parseCurrency(product.currency));

  return {
    slug: product.slug,
    name: product.name,
    description: product.description,
    price,
    priceFormatted: formatMoney(price),
    isAvailable: product.stockQuantity > 0,
    category: {
      slug: product.category.slug,
      name: product.category.name,
    },
  };
}