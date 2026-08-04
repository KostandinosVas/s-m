import { ProductCard } from "@/modules/products/components/product-card";
import { getAvailableProducts } from "@/modules/products/services/product-service";

export default async function ProductsPage() {
  const products = await getAvailableProducts();

  return (
    <main className="mx-auto max-w-4xl p-8">
      <h1 className="mb-6 text-2xl font-semibold">Products</h1>

      <ul className="space-y-3">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </ul>
    </main>
  );
}