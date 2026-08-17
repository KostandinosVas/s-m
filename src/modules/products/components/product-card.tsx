import Link from "next/link";

import type { ProductDto } from "../dto/product-dto";

import { ProductImage } from "./product-image";

type ProductCardProps = {
  product: ProductDto;
  priority?: boolean | undefined;
};

export function ProductCard({ product, priority }: ProductCardProps) {
  return (
    <li className="rounded border p-4 transition hover:border-gray-400">
      <Link href={`/products/${product.slug}`} className="flex h-full flex-col">
        <ProductImage
          src={product.imageUrl}
          alt={product.name}
          priority={priority}
        />

        <p className="mt-3 text-xs uppercase tracking-wide text-gray-500">
          {product.category.name}
        </p>

        <h2 className="mt-1 font-medium hover:underline">{product.name}</h2>

        {product.description !== null && (
          <p className="mt-1 line-clamp-2 text-sm text-gray-600">
            {product.description}
          </p>
        )}

        <p className="mt-auto pt-3 font-medium">{product.priceFormatted}</p>

        {!product.isAvailable && (
          <p className="mt-1 text-sm text-red-600">Out of stock</p>
        )}
      </Link>
    </li>
  );
}