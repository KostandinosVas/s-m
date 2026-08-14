import { asc } from "drizzle-orm";

import { db } from "@/infrastructure/db";
import { categories } from "@/infrastructure/db/schema/categories";

export type CategoryRow = {
  slug: string;
  name: string;
};

export async function findAllCategories(): Promise<CategoryRow[]> {
  return db
    .select({
      slug: categories.slug,
      name: categories.name,
    })
    .from(categories)
    .orderBy(asc(categories.name));
}