import { db } from "./index";
import { categories } from "./schema/categories";
import { products } from "./schema/products";

const seedCategories = [
  { slug: "fruits-vegetables", name: "Fruits & Vegetables" },
  { slug: "dairy", name: "Dairy" },
  { slug: "bakery", name: "Bakery" },
];

const productNames: Record<string, string[]> = {
  "fruits-vegetables": [
    "Red Apples", "Green Apples", "Bananas", "Oranges", "Lemons",
    "Tomatoes", "Cucumbers", "Carrots", "Potatoes", "Onions",
    "Spinach", "Broccoli", "Red Peppers", "Zucchini", "Aubergines",
  ],
  dairy: [
    "Fresh Milk 1lt", "Low Fat Milk 1lt", "Greek Yogurt 500gr",
    "Feta Cheese 400gr", "Gouda Slices 200gr", "Butter 250gr",
    "Cream Cheese 200gr", "Kefir 500ml", "Halloumi 250gr", "Mozzarella 125gr",
  ],
  bakery: [
    "Wholemeal Bread", "White Bread", "Sourdough Loaf", "Baguette",
    "Croissants 4pcs", "Sesame Bagels 4pcs", "Pita Bread 6pcs",
    "Rusks 250gr", "Brioche Buns 4pcs", "Multigrain Rolls 6pcs",
  ],
};

function toSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

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

  const seedProducts = Object.entries(productNames).flatMap(
    ([categorySlug, names]) =>
      names.map((name, index) => ({
        categoryId: categoryId(categorySlug),
        slug: toSlug(name),
        name,
        description:
          index % 3 === 0 ? null : `Quality ${name.toLowerCase()}, sourced daily`,
        priceCents: 99 + index * 37 + (categorySlug.length % 5) * 20,
        stockQuantity: index % 7 === 0 ? 0 : 10 + index * 3,
      })),
  );

  await db.insert(products).values(seedProducts);

  console.log(`Inserted ${seedProducts.length} products.`);
  process.exit(0);
}

seed().catch((error: unknown) => {
  console.error("Seed failed:", error);
  process.exit(1);
});