import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from 'recharts'

type VolumeChartProps = {
  data: [number, number][]
}

export function VolumeChart({ data }: VolumeChartProps) {
  const formattedData = data.map(([timestamp, volume]) => ({
    date: new Date(timestamp).toLocaleDateString(),
    volume,
  }))

  return (
    <div className="bg-white p-4 rounded shadow" role="img" aria-label="Bar chart showing trading volume over time">
        <p className="sr-only">
            This chart displays the trading volume of the selected cryptocurrency
            over the selected time period.
        </p>
      <h2 className="text-lg font-semibold mb-4">
        Trading Volume
      </h2>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={formattedData}>
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Bar
            dataKey="volume"
            fill="#22c55e"
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}