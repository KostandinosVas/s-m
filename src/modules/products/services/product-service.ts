import {
  findAllActiveProducts,
  findProductBySlug,
} from "@/infrastructure/repositories/product-repository";
import { err, ok, type Result } from "@/core/result/result";

import { toProductDto, type ProductDto } from "../dto/product-dto";
import type { ProductError } from "../errors";

export async function getAvailableProducts(): Promise<ProductDto[]> {
  const products = await findAllActiveProducts();
  return products.map(toProductDto);
}

export async function getProductBySlug(
  slug: string,
): Promise<Result<ProductDto, ProductError>> {
  const product = await findProductBySlug(slug);

  if (product === undefined) {
    return err("not-found");
  }

  if (!product.isActive) {
    return err("inactive");
  }

  return ok(toProductDto(product));
}