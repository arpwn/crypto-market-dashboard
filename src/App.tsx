import { useState } from 'react'
import { useCryptoMarket } from './hooks/useCryptoMarket'
import { PriceChart } from './components/charts/PriceChart'
import { VolumeChart } from './components/charts/VolumeChart'

function App() {
  const [crypto, setCrypto] = useState('bitcoin')
  const [days, setDays] = useState(7)

  const { data, loading, error } = useCryptoMarket(crypto, days)

  if (loading) return <p role="status" aria-live="polite" className="p-6">Loading data...</p>
  if (error) return <p role="alert" className="p-6 text-red-600">Error: {error}</p>
  if (!data) return <p>No hay datos</p>


  return (
    <main className="min-h-screen p-6 space-y-6">
      <h1 className="text-3xl font-bold">
        Crypto Market Dashboard
      </h1>

      {/* filtros */}
      <div className="flex gap-4 flex-wrap" role="group" aria-label="Dashboard filters">
        <div className="flex flex-col">
          <label htmlFor="crypto-select" className="text-sm font-medium mb-1">
            Cryptocurrency
          </label>
          <select
            id="crypto-select"
            value={crypto}
            onChange={(e) => setCrypto(e.target.value)}
            className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="bitcoin">Bitcoin</option>
            <option value="ethereum">Ethereum</option>
            <option value="solana">Solana</option>
          </select>
        </div>

        <div className="flex flex-col">
          <label htmlFor="days-select" className="text-sm font-medium mb-1">
            Date range
          </label>
          <select
            id="days-select"
            value={days}
            onChange={(e) => setDays(Number(e.target.value))}
            className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value={7}>Last 7 days</option>
            <option value={30}>Last 30 days</option>
            <option value={90}>Last 90 days</option>
          </select>
        </div>
      </div>

      {/* layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <PriceChart data={data.prices} />
        <VolumeChart data={data.total_volumes} />
      </div>
    </main>
  )
}

export default App