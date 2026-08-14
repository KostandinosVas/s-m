import { and, asc, eq, ilike, type SQL } from "drizzle-orm";

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

export type ProductFilters = {
  search?: string | undefined;
  categorySlug?: string | undefined;
};

export async function findProducts(
  filters: ProductFilters,
): Promise<ProductWithCategory[]> {
  const conditions: SQL[] = [eq(products.isActive, true)];

  if (filters.search !== undefined) {
    conditions.push(ilike(products.name, `%${filters.search}%`));
  }

  if (filters.categorySlug !== undefined) {
    conditions.push(eq(categories.slug, filters.categorySlug));
  }

  return db
    .select(productColumns)
    .from(products)
    .innerJoin(categories, eq(products.categoryId, categories.id))
    .where(and(...conditions))
    .orderBy(asc(products.name));
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