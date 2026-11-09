import test from "node:test";
import assert from "node:assert/strict";
import { getMarketChart } from "../src/api/coingecko.ts";
const original = globalThis.fetch;
test("valida series y conserva la señal de cancelación", async () => {
  const controller = new AbortController();
  let captured;
  globalThis.fetch = async (url, options) => {
    captured = { url, options };
    return {
      ok: true,
      json: async () => ({
        prices: [[1, 2]],
        market_caps: [],
        total_volumes: [[1, 3]],
      }),
    };
  };
  try {
    const data = await getMarketChart("bitcoin", 7, "usd", controller.signal);
    assert.equal(data.prices[0][1], 2);
    assert.equal(captured.options.signal, controller.signal);
    assert.match(captured.url, /days=7/);
  } finally {
    globalThis.fetch = original;
  }
});
test("un límite de consultas y una respuesta incompleta tienen errores útiles", async () => {
  try {
    globalThis.fetch = async () => ({ ok: false, status: 429 });
    await assert.rejects(() => getMarketChart("bitcoin", 7), /límite/);
    globalThis.fetch = async () => ({
      ok: true,
      json: async () => ({
        prices: [[1, "bad"]],
        market_caps: [],
        total_volumes: [],
      }),
    });
    await assert.rejects(() => getMarketChart("bitcoin", 7), /incompletos/);
  } finally {
    globalThis.fetch = original;
  }
});
