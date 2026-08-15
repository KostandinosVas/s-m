import { getAvailableProducts, type ProductQuery } from "../services/product-service";
import { Pagination } from "./pagination";
import { ProductCard } from "./product-card";

type ProductListProps = {
  query: ProductQuery;
};

export async function ProductList({ query }: ProductListProps) {
  const page = await getAvailableProducts(query);

  if (page.items.length === 0) {
    return (
      <p className="text-gray-600">
        No products found
        {query.search !== undefined && ` for "${query.search}"`}.
      </p>
    );
  }

  return (
    <>
      <p className="mb-4 text-sm text-gray-500">
        {page.totalItems} {page.totalItems === 1 ? "product" : "products"}
      </p>

      <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {page.items.map((product) => (
          <ProductCard key={product.slug} product={product} />
        ))}
      </ul>

      <Pagination
        currentPage={page.currentPage}
        totalPages={page.totalPages}
        search={query.search}
        category={query.category}
      />
    </>
  );
}