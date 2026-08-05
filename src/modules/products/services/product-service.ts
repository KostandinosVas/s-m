import {
  findAllActiveProducts,
  findProductBySlug,
} from "@/infrastructure/repositories/product-repository";

import { toProductDto, type ProductDto } from "../dto/product-dto";

export async function getAvailableProducts(): Promise<ProductDto[]> {
  const products = await findAllActiveProducts();
  return products.map(toProductDto);
}

export async function getProductBySlug(
  slug: string,
): Promise<ProductDto | undefined> {
  const product = await findProductBySlug(slug);

  if (product === undefined || !product.isActive) {
    return undefined;
  }

  return toProductDto(product);
}