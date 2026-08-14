import { getAvailableProducts, type ProductQuery } from "../services/product-service";

import { ProductCard } from "./product-card";

type ProductListProps = {
  query: ProductQuery;
};

export async function ProductList({ query }: ProductListProps) {
  const products = await getAvailableProducts(query);

  if (products.length === 0) {
    return (
      <p className="text-gray-600">
        No products found
        {query.search !== undefined && ` for "${query.search}"`}.
      </p>
    );
  }

  return (
    <ul className="space-y-3">
      {products.map((product) => (
        <ProductCard key={product.slug} product={product} />
      ))}
    </ul>
  );
}