import { Suspense } from "react";

import { CategoryFilter } from "@/modules/products/components/category-filter";
import { ProductList } from "@/modules/products/components/product-list";
import { ProductListSkeleton } from "@/modules/products/components/product-list-skeleton";
import { ProductSearch } from "@/modules/products/components/product-search";
import { getCategories } from "@/modules/products/services/product-service";

type ProductsPageProps = {
  searchParams: Promise<{ search?: string; category?: string }>;
};

export default async function ProductsPage({
  searchParams,
}: ProductsPageProps) {
  const { search, category } = await searchParams;
  const categories = await getCategories();

  return (
    <main className="mx-auto max-w-4xl p-8">
      <h1 className="mb-6 text-2xl font-semibold">Products</h1>

      <ProductSearch defaultValue={search} />

      <CategoryFilter
        categories={categories}
        activeCategory={category}
        search={search}
      />

      <Suspense
        key={`${search ?? ""}-${category ?? ""}`}
        fallback={<ProductListSkeleton />}
      >
        <ProductList query={{ search, category }} />
      </Suspense>
    </main>
  );
}