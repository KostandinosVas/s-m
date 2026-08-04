import type { Product } from "@/infrastructure/db/schema/products";
import { formatPrice } from "@/lib/format";

type ProductCardProps = {
  product: Product;
};

export function ProductCard({ product }: ProductCardProps) {
  const isOutOfStock = product.stockQuantity === 0;

  return (
    <li className="rounded border p-4">
      <h2 className="font-medium">{product.name}</h2>

      {product.description !== null && (
        <p className="text-sm text-gray-600">{product.description}</p>
      )}

      <p className="mt-2">
        {formatPrice(product.priceCents, product.currency)}
      </p>

      {isOutOfStock && (
        <p className="mt-1 text-sm text-red-600">Out of stock</p>
      )}
    </li>
  );
}