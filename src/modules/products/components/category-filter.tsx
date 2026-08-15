import Link from "next/link";

import { buildProductsHref } from "../lib/build-products-href";
import type { CategoryDto } from "../services/product-service";

type CategoryFilterProps = {
  categories: CategoryDto[];
  activeCategory?: string | undefined;
  search?: string | undefined;
};

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
        href={buildProductsHref({ search })}
        className={`${baseClass} ${activeCategory === undefined ? activeClass : inactiveClass}`}
      >
        All
      </Link>

      {categories.map((category) => (
        <Link
          key={category.slug}
          href={buildProductsHref({ search, category: category.slug })}
          className={`${baseClass} ${activeCategory === category.slug ? activeClass : inactiveClass}`}
        >
          {category.name}
        </Link>
      ))}
    </nav>
  );
}