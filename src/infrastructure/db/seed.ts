import { db } from "./index";
import { products } from "./schema/products";


const seedProducts = [
  {
    slug: "red-apples",
    name: "Red Apples",
    description: "Fresh red apples, class A",
    priceCents: 249,
    stockQuantity: 120,
  },
  {
    slug: "fresh-milk-1lt",
    name: "Fresh Milk 1lt",
    description: "Whole cow milk, daily delivery",
    priceCents: 189,
    stockQuantity: 45,
  },
  {
    slug: "wholemeal-bread",
    name: "Wholemeal Bread",
    description: null,
    priceCents: 165,
    stockQuantity: 30,
  },
  {
    slug: "feta-cheese-400gr",
    name: "Feta Cheese 400gr",
    description: "Traditional PDO feta",
    priceCents: 549,
    stockQuantity: 0,
  },
];

async function seed(): Promise<void> {
  console.log("Seeding products...");

  await db.delete(products);
  await db.insert(products).values(seedProducts);

  console.log(`Inserted ${seedProducts.length} products.`);
  process.exit(0);
}

seed().catch((error: unknown) => {
  console.error("Seed failed:", error);
  process.exit(1);
});