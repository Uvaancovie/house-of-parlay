export function formatPrice(price: number, currency: string = 'ZAR'): string {
  const locale = currency === 'ZAR' ? 'en-ZA' : 'en-US';
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    maximumFractionDigits: 0,
  }).format(price);
}

export function formatPriceCompact(price: number, currency: string = 'ZAR'): string {
  const locale = currency === 'ZAR' ? 'en-ZA' : 'en-US';
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    notation: 'compact',
    maximumFractionDigits: 1,
  }).format(price);
}