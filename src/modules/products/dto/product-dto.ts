import { formatMoney, money, parseCurrency, type Money } from "@/core/money/money";
import type { Product } from "@/infrastructure/db/schema/products";

export type ProductDto = {
  slug: string;
  name: string;
  description: string | null;
  price: Money;
  priceFormatted: string;
  isAvailable: boolean;
};

export function toProductDto(product: Product): ProductDto {
const price = money(product.priceCents, parseCurrency(product.currency));

  return {
    slug: product.slug,
    name: product.name,
    description: product.description,
    price,
    priceFormatted: formatMoney(price),
    isAvailable: product.stockQuantity > 0,
  };
}