// Locale-fixed formatting helpers. Prices are always es-ES / EUR (client
// constitution #6); amounts arrive as integer cents from the API — never floats.

export function formatPrice(cents: number, currency = "EUR"): string {
  return new Intl.NumberFormat("es-ES", { style: "currency", currency }).format(
    cents / 100,
  );
}
