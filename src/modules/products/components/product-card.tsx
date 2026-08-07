import Link from "next/link";

import type { ProductDto } from "../dto/product-dto";

type ProductCardProps = {
  product: ProductDto;
};

export function ProductCard({ product }: ProductCardProps) {
  return (
    <li className="rounded border p-4">
      <Link href={`/products/${product.slug}`} className="block">
        <h2 className="font-medium hover:underline">{product.name}</h2>

        {product.description !== null && (
          <p className="text-sm text-gray-600">{product.description}</p>
        )}

        <p className="mt-2">{product.priceFormatted}</p>

        {!product.isAvailable && (
          <p className="mt-1 text-sm text-red-600">Out of stock</p>
        )}
      </Link>
    </li>
  );
}