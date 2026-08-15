import Link from "next/link";
import { buildProductsHref } from "../lib/build-products-href";

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  search?: string | undefined;
  category?: string | undefined;
};



export function Pagination({
  currentPage,
  totalPages,
  search,
  category,
}: PaginationProps) {
  if (totalPages <= 1) {
    return null;
  }

  const hasPrevious = currentPage > 1;
  const hasNext = currentPage < totalPages;

  const linkClass = "rounded border px-4 py-2 text-sm hover:bg-gray-100";
  const disabledClass =
    "rounded border px-4 py-2 text-sm text-gray-300 cursor-not-allowed";

  return (
    <nav
      aria-label="Pagination"
      className="mt-8 flex items-center justify-center gap-4"
    >
      {hasPrevious ? (
        <Link
          href={buildProductsHref({ search, category, page: currentPage - 1 })}
          className={linkClass}
          rel="prev"
        >
          Previous
        </Link>
      ) : (
        <span className={disabledClass} aria-disabled="true">
          Previous
        </span>
      )}

      <span className="text-sm text-gray-600">
        Page {currentPage} of {totalPages}
      </span>

      {hasNext ? (
        <Link
          href={buildProductsHref({ search, category, page: currentPage + 1 })}
          className={linkClass}
          rel="next"
        >
          Next
        </Link>
      ) : (
        <span className={disabledClass} aria-disabled="true">
          Next
        </span>
      )}
    </nav>
  );
}