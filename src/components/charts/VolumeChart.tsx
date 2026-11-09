import { useLanguage } from "../../lib/locale";
import {
  CartesianGrid,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
export function VolumeChart({ data }: { data: [number, number][] }) {
  const { t, locale } = useLanguage();
  const compact = new Intl.NumberFormat(locale, {
    notation: "compact",
    maximumFractionDigits: 1,
  });
  const money = new Intl.NumberFormat(locale, {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });

  const points = data.map(([timestamp, volume]) => ({ timestamp, volume }));
  return (
    <section className="chart-panel" aria-labelledby="volume-title">
      <div className="chart-heading">
        <div>
          <p className="eyebrow">{t("ACTIVIDAD / USD")}</p>
          <h2 id="volume-title">{t("Trading Volume")}</h2>
        </div>
        <span className="chart-dot volume-dot" />
      </div>
      <p className="sr-only">
        {t(
          "This chart displays the trading volume of the selected cryptocurrency over the selected time period.",
        )}{" "}
      </p>
      <div
        className="chart-area"
        role="img"
        aria-label={t("Bar chart showing trading volume over time")}
      >
        <ResponsiveContainer width="100%" height="100%" minWidth={0}>
          <BarChart
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
              tickFormatter={(v) =>
                new Date(v).toLocaleDateString(locale, {
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
            />
            <Tooltip
              labelFormatter={(v) => new Date(Number(v)).toLocaleString(locale)}
              formatter={(v) => [money.format(Number(v)), t("Volumen")]}
              contentStyle={{
                borderRadius: 10,
                border: "1px solid #dce3ef",
                fontSize: 12,
              }}
            />
            <Bar
              dataKey="volume"
              fill="#79bcae"
              radius={[2, 2, 0, 0]}
              maxBarSize={28}
              isAnimationActive={false}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}
