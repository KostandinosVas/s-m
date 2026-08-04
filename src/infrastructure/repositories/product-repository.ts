import { eq } from "drizzle-orm";

import { db } from "@/infrastructure/db";
import { products, type Product } from "@/infrastructure/db/schema/products";

export async function findAllActiveProducts(): Promise<Product[]> {
  return db.select().from(products).where(eq(products.isActive, true));
}

export async function findProductBySlug( slug: string,): Promise<Product | undefined> {
  const rows = await db
    .select()
    .from(products)
    .where(eq(products.slug, slug))
    .limit(1);

  return rows[0];
}