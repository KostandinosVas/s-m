export type Currency = "EUR" | "USD" | "GBP";

export type Money = {
  readonly cents: number;
  readonly currency: Currency;
};

export function money(cents: number, currency: Currency): Money {
  if (!Number.isInteger(cents)) {
    throw new Error(`Money must be an integer number of cents, got ${cents}`);
  }

  return { cents, currency };
}

export function addMoney(a: Money, b: Money): Money {
  if (a.currency !== b.currency) {
    throw new Error(`Cannot add ${a.currency} to ${b.currency}`);
  }

  return money(a.cents + b.cents, a.currency);
}

export function multiplyMoney(value: Money, factor: number): Money {
  if (!Number.isInteger(factor)) {
    throw new Error(`Factor must be an integer, got ${factor}`);
  }

  return money(value.cents * factor, value.currency);
}

export function formatMoney(value: Money, locale = "el-GR"): string {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: value.currency,
  }).format(value.cents / 100);
}




const CURRENCIES = ["EUR", "USD", "GBP"] as const;

export function isCurrency(value: string): value is Currency {
  return (CURRENCIES as readonly string[]).includes(value);
}

export function parseCurrency(value: string): Currency {
  if (!isCurrency(value)) {
    throw new Error(`Unsupported currency: ${value}`);
  }

  return value;
}