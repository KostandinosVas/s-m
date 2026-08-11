import { ProductCard } from "@/modules/products/components/product-card";
import { ProductSearch } from "@/modules/products/components/product-search";
import { getAvailableProducts } from "@/modules/products/services/product-service";

type ProductsPageProps = {
  searchParams: Promise<{ search?: string }>;
};

export default async function ProductsPage({
  searchParams,
}: ProductsPageProps) {
  const { search } = await searchParams;
  const products = await getAvailableProducts(search);

  return (
    <main className="mx-auto max-w-4xl p-8">
      <h1 className="mb-6 text-2xl font-semibold">Products</h1>

      <ProductSearch defaultValue={search} />

      {products.length === 0 ? (
        <p className="text-gray-600">
          No products found
          {search !== undefined && ` for "${search}"`}.
        </p>
      ) : (
        <ul className="space-y-3">
          {products.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </ul>
      )}
    </main>
  );
}