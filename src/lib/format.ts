export function formatPrice(
  cents: number,
  currency: string,
  locale = "el-GR",
): string {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
  }).format(cents / 100);
}