import { useState } from "react";
import { useCryptoMarket } from "./hooks/useCryptoMarket";
import { PriceChart } from "./components/charts/PriceChart";
import { VolumeChart } from "./components/charts/VolumeChart";
const coins = [
  { id: "bitcoin", name: "Bitcoin", symbol: "BTC" },
  { id: "ethereum", name: "Ethereum", symbol: "ETH" },
  { id: "solana", name: "Solana", symbol: "SOL" },
];
const money = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 2,
});
const shortMoney = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  notation: "compact",
  maximumFractionDigits: 2,
});
export default function App() {
  const [crypto, setCrypto] = useState("bitcoin");
  const [days, setDays] = useState(7);
  const { data, loading, error, updatedAt, retry } = useCryptoMarket(
    crypto,
    days,
  );
  const coin = coins.find((c) => c.id === crypto)!;
  const prices = data?.prices || [];
  const latest = prices.at(-1)?.[1];
  const first = prices[0]?.[1];
  const change =
    latest !== undefined && first ? ((latest - first) / first) * 100 : null;
  return (
    <div className="shell">
      <header className="topbar">
        <a href="#main" className="brand">
          <span>cm</span>Crypto Market
        </a>
        <span className="source-tag">DATOS DE COINGECKO</span>
        <a
          href="https://github.com/arpwn/crypto-market-dashboard"
          target="_blank"
          rel="noreferrer"
        >
          Código ↗
        </a>
      </header>
      <main id="main" className="container">
        <div className="page-heading">
          <div>
            <p className="eyebrow">MERCADO / EXPLORADOR</p>
            <h1>
              El mercado,
              <br />
              <span>en perspectiva.</span>
            </h1>
            <p className="intro">
              Precio y volumen histórico, con el contexto de cada periodo.
            </p>
          </div>
          <div className="currency-note">
            <span>USD</span>
            <p>Moneda de referencia</p>
          </div>
        </div>
        <section className="controls" aria-label="Dashboard filters">
          <div>
            <label htmlFor="crypto-select">Cryptocurrency</label>
            <select
              id="crypto-select"
              value={crypto}
              onChange={(e) => setCrypto(e.target.value)}
            >
              {coins.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="days-select">Date range</label>
            <select
              id="days-select"
              value={days}
              onChange={(e) => setDays(Number(e.target.value))}
            >
              {[7, 30, 90].map((d) => (
                <option key={d} value={d}>
                  Last {d} days
                </option>
              ))}
            </select>
          </div>
          <div className="update-note">
            {updatedAt
              ? `Última consulta: ${new Date(updatedAt).toLocaleTimeString("es-MX", { hour: "2-digit", minute: "2-digit" })}`
              : "Consulta de datos históricos"}
          </div>
          <button className="refresh" onClick={retry} disabled={loading}>
            ↻ Actualizar
          </button>
        </section>
        <div className="asset-heading">
          <span className="asset-symbol">{coin.symbol.slice(0, 1)}</span>
          <h2>
            {coin.name}
            <span>{coin.symbol}</span>
          </h2>
          <p>{days} días · USD</p>
        </div>
        {loading ? (
          <div className="loading-state" role="status" aria-live="polite">
            <span className="loader" />
            Loading data…<p>Consultando precio y volumen de {coin.name}.</p>
          </div>
        ) : error ? (
          <div className="empty-state" role="alert">
            <h3>No pudimos cargar el mercado.</h3>
            <p>{error}</p>
            <button onClick={retry}>Reintentar consulta</button>
          </div>
        ) : !prices.length ? (
          <div className="empty-state">
            <h3>No hay datos para este periodo.</h3>
            <p>Selecciona otra moneda o cambia el rango de fechas.</p>
          </div>
        ) : (
          <>
            <section className="metrics" aria-label="Resumen del periodo">
              <div>
                <p>Último precio disponible</p>
                <strong>
                  {latest !== undefined ? money.format(latest) : "—"}
                </strong>
              </div>
              <div>
                <p>Variación del periodo</p>
                <strong
                  className={
                    change !== null && change < 0 ? "negative" : "positive"
                  }
                >
                  {change === null
                    ? "—"
                    : `${change >= 0 ? "+" : ""}${change.toFixed(2)}%`}
                </strong>
              </div>
              <div>
                <p>Último volumen disponible</p>
                <strong>
                  {data?.total_volumes.at(-1)
                    ? shortMoney.format(data.total_volumes.at(-1)![1])
                    : "—"}
                </strong>
              </div>
            </section>
            <div className="charts">
              <PriceChart data={prices} />
              <VolumeChart data={data?.total_volumes || []} />
            </div>
            <p className="data-note">
              {prices.length} observaciones de precio · Último dato:{" "}
              {new Date(prices.at(-1)![0]).toLocaleString("es-MX")} · Los
              valores reflejan la cobertura y frecuencia de la fuente.
            </p>
          </>
        )}
        <footer>
          Crypto Market Dashboard{" "}
          <a href="https://www.coingecko.com/" target="_blank" rel="noreferrer">
            Fuente: CoinGecko ↗
          </a>
        </footer>
      </main>
    </div>
  );
}
