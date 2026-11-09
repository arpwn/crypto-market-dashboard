import { useEffect, useState } from "react";
import { getMarketChart } from "../api/coingecko";
import type { MarketChartData } from "../api/coingecko";
type Snapshot = {
  key: string;
  data: MarketChartData | null;
  error: string | null;
  updatedAt: string | null;
};
export function useCryptoMarket(cryptoId: string, days: number) {
  const [attempt, setAttempt] = useState(0);
  const [snapshot, setSnapshot] = useState<Snapshot | null>(null);
  const requestKey = `${cryptoId}:${days}:${attempt}`;
  useEffect(() => {
    const controller = new AbortController();
    let active = true;
    let timedOut = false;
    const timeout = setTimeout(() => {
      timedOut = true;
      controller.abort();
    }, 15000);
    getMarketChart(cryptoId, days, "usd", controller.signal)
      .then((data) => {
        if (active)
          setSnapshot({
            key: requestKey,
            data,
            error: null,
            updatedAt: new Date().toISOString(),
          });
      })
      .catch((error: unknown) => {
        if (active && (!controller.signal.aborted || timedOut))
          setSnapshot({
            key: requestKey,
            data: null,
            error: timedOut
              ? "La fuente tardó demasiado en responder. Intenta de nuevo."
              : error instanceof Error
                ? error.message
                : "No pudimos conectar con la fuente.",
            updatedAt: null,
          });
      })
      .finally(() => clearTimeout(timeout));
    return () => {
      active = false;
      clearTimeout(timeout);
      controller.abort();
    };
  }, [cryptoId, days, requestKey]);
  const current = snapshot?.key === requestKey ? snapshot : null;
  return {
    data: current?.data || null,
    error: current?.error || null,
    loading: !current,
    updatedAt: current?.updatedAt || null,
    retry: () => setAttempt((a) => a + 1),
  };
}
