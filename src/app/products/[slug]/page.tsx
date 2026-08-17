import Link from "next/link";
import { notFound } from "next/navigation";
import { ProductImage } from "@/modules/products/components/product-image";
import { getProductBySlug } from "@/modules/products/services/product-service";

type ProductPageProps = {
  params: Promise<{ slug: string }>;
};

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const result = await getProductBySlug(slug);

  if (!result.ok) {
    notFound();
  }

  const product = result.value;

  return (
    <main className="mx-auto max-w-2xl p-8">
      <Link href="/products" className="text-sm text-gray-500 hover:underline">
        ← Back to products
      </Link>

      <div className="mt-4 max-w-sm">
        <ProductImage src={product.imageUrl} alt={product.name} priority />
      </div>

      <p className="mt-4 text-sm uppercase tracking-wide text-gray-500">
        {product.category.name}
      </p>

      <h1 className="mt-1 text-3xl font-semibold">{product.name}</h1>

      {product.description !== null && (
        <p className="mt-3 text-gray-600">{product.description}</p>
      )}

      <p className="mt-6 text-2xl">{product.priceFormatted}</p>

      <p className="mt-2 text-sm text-gray-500">
        {product.isAvailable ? "In stock" : "Out of stock"}
      </p>
    </main>
  );
}