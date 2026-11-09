import { useLanguage } from "./lib/locale";
import { useState } from "react";
import { useCryptoMarket } from "./hooks/useCryptoMarket";
import { PriceChart } from "./components/charts/PriceChart";
import { VolumeChart } from "./components/charts/VolumeChart";
const coins = [
  { id: "bitcoin", name: "Bitcoin", symbol: "BTC" },
  { id: "ethereum", name: "Ethereum", symbol: "ETH" },
  { id: "solana", name: "Solana", symbol: "SOL" },
];
export default function App() {
  const { t, lang, locale, setLanguage } = useLanguage();
  const money = new Intl.NumberFormat(locale, {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2,
  });
  const shortMoney = new Intl.NumberFormat(locale, {
    style: "currency",
    currency: "USD",
    notation: "compact",
    maximumFractionDigits: 2,
  });

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
        <span className="source-tag">{t("DATOS DE COINGECKO")}</span>
        <button
          className="language-toggle"
          type="button"
          onClick={() => setLanguage(lang === "es" ? "en" : "es")}
          aria-label={lang === "es" ? "Switch to English" : "Cambiar a español"}
        >
          {lang === "es" ? "EN" : "ES"}
        </button>
        <a
          href="https://github.com/arpwn/crypto-market-dashboard"
          target="_blank"
          rel="noreferrer"
        >
          {t("Código ↗")}{" "}
        </a>
      </header>
      <main id="main" className="container">
        <div className="page-heading">
          <div>
            <p className="eyebrow">{t("MERCADO / EXPLORADOR")}</p>
            <h1>
              {t("El mercado,")} <br />
              <span>{t("en perspectiva.")}</span>
            </h1>
            <p className="intro">
              {t(
                "Precio y volumen histórico, con el contexto de cada periodo.",
              )}{" "}
            </p>
          </div>
          <div className="currency-note">
            <span>USD</span>
            <p>{t("Moneda de referencia")}</p>
          </div>
        </div>
        <section className="controls" aria-label={t("Dashboard filters")}>
          <div>
            <label htmlFor="crypto-select">{t("Cryptocurrency")}</label>
            <select
              id="crypto-select"
              value={crypto}
              onChange={(e) => setCrypto(e.target.value)}
            >
              {coins.map((c) => (
                <option key={c.id} value={c.id}>
                  {t(c.name)}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="days-select">{t("Date range")}</label>
            <select
              id="days-select"
              value={days}
              onChange={(e) => setDays(Number(e.target.value))}
            >
              {[7, 30, 90].map((d) => (
                <option key={d} value={d}>
                  {t("Last {0} days", [d])}
                </option>
              ))}
            </select>
          </div>
          <div className="update-note">
            {updatedAt
              ? t("Última consulta: {0}", [
                  new Date(updatedAt).toLocaleTimeString(locale, {
                    hour: "2-digit",
                    minute: "2-digit",
                  }),
                ])
              : t("Consulta de datos históricos")}
          </div>
          <button className="refresh" onClick={retry} disabled={loading}>
            {t("↻ Actualizar")}{" "}
          </button>
        </section>
        <div className="asset-heading">
          <span className="asset-symbol">{coin.symbol.slice(0, 1)}</span>
          <h2>
            {coin.name}
            <span>{coin.symbol}</span>
          </h2>
          <p>
            {days} {t("días · USD")}
          </p>
        </div>
        {loading ? (
          <div className="loading-state" role="status" aria-live="polite">
            <span className="loader" />
            {t("Loading data…")}
            <p>
              {t("Consultando precio y volumen de")} {coin.name}.
            </p>
          </div>
        ) : error ? (
          <div className="empty-state" role="alert">
            <h3>{t("No pudimos cargar el mercado.")}</h3>
            <p>{t(error)}</p>
            <button onClick={retry}>{t("Reintentar consulta")}</button>
          </div>
        ) : !prices.length ? (
          <div className="empty-state">
            <h3>{t("No hay datos para este periodo.")}</h3>
            <p>{t("Selecciona otra moneda o cambia el rango de fechas.")}</p>
          </div>
        ) : (
          <>
            <section className="metrics" aria-label={t("Resumen del periodo")}>
              <div>
                <p>{t("Último precio disponible")}</p>
                <strong>
                  {latest !== undefined ? money.format(latest) : "—"}
                </strong>
              </div>
              <div>
                <p>{t("Variación del periodo")}</p>
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
                <p>{t("Último volumen disponible")}</p>
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
              {prices.length} {t("observaciones de precio · Último dato:")}{" "}
              {new Date(prices.at(-1)![0]).toLocaleString(locale)}
              {t(
                "· Los valores reflejan la cobertura y frecuencia de la fuente.",
              )}{" "}
            </p>
          </>
        )}
        <footer>
          {t("Crypto Market Dashboard")}{" "}
          <a href="https://www.coingecko.com/" target="_blank" rel="noreferrer">
            {t("Fuente: CoinGecko ↗")}{" "}
          </a>
        </footer>
      </main>
    </div>
  );
}
