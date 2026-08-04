import { notFound } from "next/navigation";

import { formatPrice } from "@/lib/format";
import { getProductBySlug } from "@/modules/products/services/product-service";

type ProductPageProps = {
  params: Promise<{ slug: string }>;
};

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (product === undefined) {
    notFound();
  }

  return (
    <main className="mx-auto max-w-2xl p-8">
      <h1 className="text-3xl font-semibold">{product.name}</h1>

      {product.description !== null && (
        <p className="mt-3 text-gray-600">{product.description}</p>
      )}

      <p className="mt-6 text-2xl">
        {formatPrice(product.priceCents, product.currency)}
      </p>

      <p className="mt-2 text-sm text-gray-500">
        {product.stockQuantity > 0
          ? `${product.stockQuantity} in stock`
          : "Out of stock"}
      </p>
    </main>
  );
}