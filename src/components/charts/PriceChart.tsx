import {
  CartesianGrid,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
const money = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 2,
});
const compact = new Intl.NumberFormat("en-US", {
  notation: "compact",
  maximumFractionDigits: 1,
});
export function PriceChart({ data }: { data: [number, number][] }) {
  const points = data.map(([timestamp, price]) => ({ timestamp, price }));
  return (
    <section className="chart-panel" aria-labelledby="price-title">
      <div className="chart-heading">
        <div>
          <p className="eyebrow">EVOLUCIÓN / USD</p>
          <h2 id="price-title">Price over time</h2>
        </div>
        <span className="chart-dot price-dot" />
      </div>
      <p className="sr-only">
        This chart displays the price evolution of the selected cryptocurrency
        across the selected time range.
      </p>
      <div
        className="chart-area"
        role="img"
        aria-label="Line chart showing cryptocurrency price over time"
      >
        <ResponsiveContainer width="100%" height="100%" minWidth={0}>
          <LineChart
            data={points}
            margin={{ top: 14, right: 12, bottom: 12, left: 0 }}
            accessibilityLayer
          >
            <CartesianGrid
              vertical={false}
              stroke="#e6ebf2"
              strokeDasharray="3 4"
            />
            <XAxis
              dataKey="timestamp"
              type="number"
              scale="time"
              domain={["dataMin", "dataMax"]}
              tickFormatter={(v) =>
                new Date(v).toLocaleDateString("es-MX", {
                  day: "numeric",
                  month: "short",
                })
              }
              tick={{ fontSize: 10, fill: "#8390a4" }}
              minTickGap={32}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              width={66}
              tickFormatter={(v) => `$${compact.format(v)}`}
              tick={{ fontSize: 10, fill: "#8390a4" }}
              tickLine={false}
              axisLine={false}
              domain={["auto", "auto"]}
            />
            <Tooltip
              labelFormatter={(v) =>
                new Date(Number(v)).toLocaleString("es-MX")
              }
              formatter={(v) => [money.format(Number(v)), "Precio"]}
              contentStyle={{
                borderRadius: 10,
                border: "1px solid #dce3ef",
                fontSize: 12,
              }}
            />
            <Line
              type="monotone"
              dataKey="price"
              stroke="#6771de"
              strokeWidth={2.5}
              dot={false}
              isAnimationActive={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}
