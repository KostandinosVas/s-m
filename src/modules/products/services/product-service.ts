import {
  findAllActiveProducts,
  findProductBySlug,
} from "@/infrastructure/repositories/product-repository";
import type { Product } from "@/infrastructure/db/schema/products";

export async function getAvailableProducts(): Promise<Product[]> {
  return findAllActiveProducts();
}

export async function getProductBySlug(
  slug: string,
): Promise<Product | undefined> {
  const product = await findProductBySlug(slug);

  if (product === undefined || !product.isActive) {
    return undefined;
  }

  return product;
}