import { and, eq, ilike } from "drizzle-orm";

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

export async function findAllActiveProducts(): Promise<ProductWithCategory[]> {
  return db
    .select(productColumns)
    .from(products)
    .innerJoin(categories, eq(products.categoryId, categories.id))
    .where(eq(products.isActive, true));
}

export async function searchActiveProducts(
  term: string,
): Promise<ProductWithCategory[]> {
  return db
    .select(productColumns)
    .from(products)
    .innerJoin(categories, eq(products.categoryId, categories.id))
    .where(and(eq(products.isActive, true), ilike(products.name, `%${term}%`)));
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