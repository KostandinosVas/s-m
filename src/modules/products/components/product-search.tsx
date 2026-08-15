"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { buildProductsHref } from "../lib/build-products-href";

type ProductSearchProps = {
  defaultValue?: string | undefined;
};

export function ProductSearch({ defaultValue }: ProductSearchProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const term = String(formData.get("search") ?? "").trim();
    const category = searchParams.get("category") ?? undefined;

    router.push(
      buildProductsHref({
        ...(term.length > 0 ? { search: term } : {}),
        ...(category !== null && category !== undefined ? { category } : {}),
      }),
    );
  }

  return (
    <form
      action="/products"
      onSubmit={handleSubmit}
      className="mb-6 flex items-end gap-2"
    >
      <div className="flex-1">
        <label htmlFor="product-search" className="mb-1 block text-sm">
          Search
        </label>
        <input
          id="product-search"
          type="search"
          name="search"
          defaultValue={defaultValue}
          placeholder="e.g. milk"
          className="w-full rounded border px-3 py-2"
        />
      </div>

      <button
        type="submit"
        className="rounded bg-black px-5 py-2 text-white hover:bg-gray-800"
      >
        Search
      </button>
    </form>
  );
}