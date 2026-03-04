export async function getMarketChart(
  cryptoId: string,
  days: number,
  currency = 'usd'
) {
  const response = await fetch(
    `https://api.coingecko.com/api/v3/coins/${cryptoId}/market_chart?vs_currency=${currency}&days=${days}`
  )

  if (!response.ok) {
    throw new Error('Failed to fetch market data')
  }

  return response.json()
}