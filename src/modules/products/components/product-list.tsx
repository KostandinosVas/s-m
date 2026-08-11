import { getAvailableProducts } from "../services/product-service";

import { ProductCard } from "./product-card";

type ProductListProps = {
  search?: string | undefined;
};

export async function ProductList({ search }: ProductListProps) {
  const products = await getAvailableProducts(search);

  if (products.length === 0) {
    return (
      <p className="text-gray-600">
        No products found
        {search !== undefined && ` for "${search}"`}.
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