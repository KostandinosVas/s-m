import { err, ok, type Result } from "@/core/result/result";
import { findAllCategories } from "@/infrastructure/repositories/category-repository";
import {
  findProductBySlug,
  findProducts,
} from "@/infrastructure/repositories/product-repository";

import { toProductDto, type ProductDto } from "../dto/product-dto";
import type { ProductError } from "../errors";

export const PAGE_SIZE = 12;

export type ProductQuery = {
  search?: string | undefined;
  category?: string | undefined;
  page?: number | undefined;
};

export type CategoryDto = {
  slug: string;
  name: string;
};

export type ProductPage = {
  items: ProductDto[];
  currentPage: number;
  totalPages: number;
  totalItems: number;
};

export async function getAvailableProducts(
  query: ProductQuery = {},
): Promise<ProductPage> {
  const search = query.search?.trim();
  const category = query.category?.trim();
  const currentPage = Math.max(1, query.page ?? 1);

  const { items, total } = await findProducts({
    ...(search !== undefined && search.length > 0 ? { search } : {}),
    ...(category !== undefined && category.length > 0
      ? { categorySlug: category }
      : {}),
    limit: PAGE_SIZE,
    offset: (currentPage - 1) * PAGE_SIZE,
  });

  return {
    items: items.map(toProductDto),
    currentPage,
    totalPages: Math.max(1, Math.ceil(total / PAGE_SIZE)),
    totalItems: total,
  };
}

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