import { Suspense } from "react";

import { ProductList } from "@/modules/products/components/product-list";
import { ProductListSkeleton } from "@/modules/products/components/product-list-skeleton";
import { ProductSearch } from "@/modules/products/components/product-search";

type ProductsPageProps = {
  searchParams: Promise<{ search?: string }>;
};

export default async function ProductsPage({
  searchParams,
}: ProductsPageProps) {
  const { search } = await searchParams;

  return (
    <main className="mx-auto max-w-4xl p-8">
      <h1 className="mb-6 text-2xl font-semibold">Products</h1>

      <ProductSearch defaultValue={search} />

      <Suspense key={search} fallback={<ProductListSkeleton />}>
        <ProductList search={search} />
      </Suspense>
    </main>
  );
}