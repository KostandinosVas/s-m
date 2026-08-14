import Link from "next/link";

import type { CategoryDto } from "../services/product-service";

type CategoryFilterProps = {
  categories: CategoryDto[];
  activeCategory?: string | undefined;
  search?: string | undefined;
};

function buildHref(
  category: string | undefined,
  search: string | undefined,
): string {
  const params = new URLSearchParams();

  if (search !== undefined && search.length > 0) {
    params.set("search", search);
  }

  if (category !== undefined) {
    params.set("category", category);
  }

  const query = params.toString();
  return query.length === 0 ? "/products" : `/products?${query}`;
}

export function CategoryFilter({
  categories,
  activeCategory,
  search,
}: CategoryFilterProps) {
  const baseClass = "rounded-full border px-3 py-1 text-sm";
  const activeClass = "bg-black text-white";
  const inactiveClass = "hover:bg-gray-100";

  return (
    <nav aria-label="Filter by category" className="mb-6 flex flex-wrap gap-2">
      <Link
        href={buildHref(undefined, search)}
        className={`${baseClass} ${activeCategory === undefined ? activeClass : inactiveClass}`}
      >
        All
      </Link>

      {categories.map((category) => (
        <Link
          key={category.slug}
          href={buildHref(category.slug, search)}
          className={`${baseClass} ${activeCategory === category.slug ? activeClass : inactiveClass}`}
        >
          {category.name}
        </Link>
      ))}
    </nav>
  );
}