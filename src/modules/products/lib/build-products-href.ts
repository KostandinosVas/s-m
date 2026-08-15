export type ProductsHrefParams = {
  search?: string | undefined;
  category?: string | undefined;
  page?: number | undefined;
};

export function buildProductsHref(params: ProductsHrefParams): string {
  const searchParams = new URLSearchParams();

  if (params.search !== undefined && params.search.length > 0) {
    searchParams.set("search", params.search);
  }

  if (params.category !== undefined && params.category.length > 0) {
    searchParams.set("category", params.category);
  }

  if (params.page !== undefined && params.page > 1) {
    searchParams.set("page", String(params.page));
  }

  const query = searchParams.toString();
  return query.length === 0 ? "/products" : `/products?${query}`;
}