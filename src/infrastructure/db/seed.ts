import { db } from "./index";
import { categories } from "./schema/categories";
import { products } from "./schema/products";

const seedCategories = [
  { slug: "fruits-vegetables", name: "Fruits & Vegetables" },
  { slug: "dairy", name: "Dairy" },
  { slug: "bakery", name: "Bakery" },
];

async function seed(): Promise<void> {
  console.log("Seeding...");

  await db.delete(products);
  await db.delete(categories);

  const insertedCategories = await db
    .insert(categories)
    .values(seedCategories)
    .returning();

  const categoryBySlug = new Map(
    insertedCategories.map((category) => [category.slug, category.id]),
  );

  function categoryId(slug: string): string {
    const id = categoryBySlug.get(slug);

    if (id === undefined) {
      throw new Error(`Category not found: ${slug}`);
    }

    return id;
  }

  await db.insert(products).values([
    {
      categoryId: categoryId("fruits-vegetables"),
      slug: "red-apples",
      name: "Red Apples",
      description: "Fresh red apples, class A",
      priceCents: 249,
      stockQuantity: 120,
    },
    {
      categoryId: categoryId("dairy"),
      slug: "fresh-milk-1lt",
      name: "Fresh Milk 1lt",
      description: "Whole cow milk, daily delivery",
      priceCents: 189,
      stockQuantity: 45,
    },
    {
      categoryId: categoryId("bakery"),
      slug: "wholemeal-bread",
      name: "Wholemeal Bread",
      description: null,
      priceCents: 165,
      stockQuantity: 30,
    },
    {
      categoryId: categoryId("dairy"),
      slug: "feta-cheese-400gr",
      name: "Feta Cheese 400gr",
      description: "Traditional PDO feta",
      priceCents: 549,
      stockQuantity: 0,
    },
  ]);

  console.log("Done.");
  process.exit(0);
}

seed().catch((error: unknown) => {
  console.error("Seed failed:", error);
  process.exit(1);
});