export type Series = [number, number][];
export type MarketChartData = {
  prices: Series;
  market_caps: Series;
  total_volumes: Series;
};
function isSeries(value: unknown): value is Series {
  return (
    Array.isArray(value) &&
    value.every(
      (p) =>
        Array.isArray(p) &&
        p.length === 2 &&
        p.every((n) => typeof n === "number" && Number.isFinite(n)),
    )
  );
}
export async function getMarketChart(
  cryptoId: string,
  days: number,
  currency = "usd",
  signal?: AbortSignal,
): Promise<MarketChartData> {
  const response = await fetch(
    `https://api.coingecko.com/api/v3/coins/${encodeURIComponent(cryptoId)}/market_chart?vs_currency=${encodeURIComponent(currency)}&days=${days}`,
    { signal },
  );
  if (!response.ok)
    throw new Error(
      response.status === 429
        ? "La fuente alcanzó su límite de consultas. Espera un momento y reintenta."
        : "No pudimos consultar los datos del mercado.",
    );
  const data: unknown = await response.json();
  if (!data || typeof data !== "object")
    throw new Error("La fuente devolvió una respuesta inesperada.");
  const d = data as MarketChartData;
  if (
    !isSeries(d.prices) ||
    !isSeries(d.market_caps) ||
    !isSeries(d.total_volumes)
  )
    throw new Error("La fuente devolvió datos incompletos.");
  return d;
}
