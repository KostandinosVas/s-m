import { and, asc, count, eq, ilike, type SQL } from "drizzle-orm";

import { db } from "@/infrastructure/db";
import { categories } from "@/infrastructure/db/schema/categories";
import { products } from "@/infrastructure/db/schema/products";

export type ProductWithCategory = {
  id: string;
  slug: string;
  name: string;
  description: string | null;
  priceCents: number;
  currency: string;
  stockQuantity: number;
  isActive: boolean;
  category: {
    slug: string;
    name: string;
  };
};

export type ProductFilters = {
  search?: string | undefined;
  categorySlug?: string | undefined;
  limit: number;
  offset: number;
};

export type PaginatedProducts = {
  items: ProductWithCategory[];
  total: number;
};

const productColumns = {
  id: products.id,
  slug: products.slug,
  name: products.name,
  description: products.description,
  priceCents: products.priceCents,
  currency: products.currency,
  stockQuantity: products.stockQuantity,
  isActive: products.isActive,
  category: {
    slug: categories.slug,
    name: categories.name,
  },
};

function buildConditions(filters: ProductFilters): SQL[] {
  const conditions: SQL[] = [eq(products.isActive, true)];

  if (filters.search !== undefined) {
    conditions.push(ilike(products.name, `%${filters.search}%`));
  }

  if (filters.categorySlug !== undefined) {
    conditions.push(eq(categories.slug, filters.categorySlug));
  }

  return conditions;
}

export async function findProducts(
  filters: ProductFilters,
): Promise<PaginatedProducts> {
  const conditions = buildConditions(filters);

  const [items, totalResult] = await Promise.all([
    db
      .select(productColumns)
      .from(products)
      .innerJoin(categories, eq(products.categoryId, categories.id))
      .where(and(...conditions))
      .orderBy(asc(products.name))
      .limit(filters.limit)
      .offset(filters.offset),

    db
      .select({ value: count() })
      .from(products)
      .innerJoin(categories, eq(products.categoryId, categories.id))
      .where(and(...conditions)),
  ]);

  return {
    items,
    total: totalResult[0]?.value ?? 0,
  };
}

export async function findProductBySlug(
  slug: string,
): Promise<ProductWithCategory | undefined> {
  const rows = await db
    .select(productColumns)
    .from(products)
    .innerJoin(categories, eq(products.categoryId, categories.id))
    .where(eq(products.slug, slug))
    .limit(1);

  return rows[0];
}