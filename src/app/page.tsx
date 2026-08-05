import Link from "next/link";

export default function HomePage() {
  return (
    <main className="mx-auto max-w-4xl p-8">
      <h1 className="text-3xl font-semibold">Supermarket</h1>

      <p className="mt-3 text-gray-600">
        Fresh groceries delivered to your door.
      </p>

      <Link
        href="/products"
        className="mt-6 inline-block rounded bg-black px-5 py-2 text-white hover:bg-gray-800"
      >
        Browse products
      </Link>
    </main>
  );
}