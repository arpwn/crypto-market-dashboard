import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from 'recharts'

type PriceChartProps = {
  data: [number, number][]
}

export function PriceChart({ data }: PriceChartProps) {
  const formattedData = data.map(([timestamp, price]) => ({
    date: new Date(timestamp).toLocaleDateString(),
    price,
  }))

  return (
    <div className="bg-white p-4 rounded shadow" role="img" aria-label="Line chart showing cryptocurrency price over time">
      <p className="sr-only">
        This chart displays the price evolution of the selected cryptocurrency
        across the selected time range.
      </p>
      <h2 className="text-lg font-semibold mb-4">
        Price over time
      </h2>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={formattedData}>
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="price"
            stroke="#2563eb"
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}