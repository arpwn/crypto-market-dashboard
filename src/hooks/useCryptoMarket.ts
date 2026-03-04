import { useEffect, useState } from 'react'
import { getMarketChart } from '../api/coingecko'

type MarketChartData = {
  prices: [number, number][]
  market_caps: [number, number][]
  total_volumes: [number, number][]
}

export function useCryptoMarket(
  cryptoId: string,
  days: number
) {
  const [data, setData] = useState<MarketChartData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let isMounted = true

    const fetchMarket = async () => {
      try {
        setLoading(true)
        setError(null)

        const result = await getMarketChart(cryptoId, days)
        if (isMounted) setData(result)
      } catch (err) {
        if (isMounted) {
          setError(err instanceof Error ? err.message : 'Unknown error')
        }
      } finally {
        if (isMounted) setLoading(false)
      }
    }

    fetchMarket()

    return () => {
      isMounted = false
    }
  }, [cryptoId, days])

  return { data, loading, error }
}