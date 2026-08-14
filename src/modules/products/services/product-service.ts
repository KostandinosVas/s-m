import { err, ok, type Result } from "@/core/result/result";
import { findAllCategories } from "@/infrastructure/repositories/category-repository";
import {
  findProductBySlug,
  findProducts,
} from "@/infrastructure/repositories/product-repository";

import { toProductDto, type ProductDto } from "../dto/product-dto";
import type { ProductError } from "../errors";

export type ProductQuery = {
  search?: string | undefined;
  category?: string | undefined;
};

export async function getAvailableProducts(
  query: ProductQuery = {},
): Promise<ProductDto[]> {
  const search = query.search?.trim();
  const category = query.category?.trim();

  const products = await findProducts({
    ...(search !== undefined && search.length > 0 ? { search } : {}),
    ...(category !== undefined && category.length > 0
      ? { categorySlug: category }
      : {}),
  });

  return products.map(toProductDto);
}

export type CategoryDto = {
  slug: string;
  name: string;
};

export async function getCategories(): Promise<CategoryDto[]> {
  return findAllCategories();
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