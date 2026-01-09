export function formatAmount(amount: number, currencyCode: string) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currencyCode
  }).format(amount);
}

export function parseJson<T>(json: string | T) {
  return typeof json === 'string' ? JSON.parse(json) : json;
}
