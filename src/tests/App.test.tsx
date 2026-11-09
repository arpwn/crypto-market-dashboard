import { act, fireEvent, render, screen } from "@testing-library/react";
import App from "../App";
import { setLanguage } from "../lib/locale";
import { useCryptoMarket } from "../hooks/useCryptoMarket";
jest.mock("../hooks/useCryptoMarket");
const mockedHook = jest.mocked(useCryptoMarket);
const retry = jest.fn();
beforeEach(() => {
  act(() => setLanguage("es"));
  retry.mockClear();
  mockedHook.mockReturnValue({
    data: null,
    loading: true,
    error: null,
    updatedAt: null,
    retry,
  });
});
test("conserva los filtros mientras carga datos", () => {
  render(<App />);
  expect(screen.getByRole("status")).toHaveTextContent(/cargando/i);
  expect(screen.getByLabelText("Criptomoneda")).toBeEnabled();
});
test("un error mantiene los filtros y permite reintentar", () => {
  mockedHook.mockReturnValue({
    data: null,
    loading: false,
    error: "La fuente alcanzó su límite.",
    updatedAt: null,
    retry,
  });
  render(<App />);
  expect(screen.getByRole("alert")).toHaveTextContent(/límite/);
  fireEvent.click(screen.getByRole("button", { name: "Reintentar consulta" }));
  expect(retry).toHaveBeenCalledTimes(1);
  fireEvent.change(screen.getByLabelText("Criptomoneda"), {
    target: { value: "ethereum" },
  });
  expect(mockedHook).toHaveBeenLastCalledWith("ethereum", 7);
});

test("switches labels and errors without resetting active filters", () => {
  mockedHook.mockReturnValue({
    data: null,
    loading: false,
    error:
      "La fuente alcanzó su límite de consultas. Espera un momento y reintenta.",
    updatedAt: null,
    retry,
  });
  render(<App />);
  fireEvent.change(screen.getByLabelText("Criptomoneda"), {
    target: { value: "ethereum" },
  });
  fireEvent.change(screen.getByLabelText("Periodo"), {
    target: { value: "30" },
  });
  fireEvent.click(screen.getByRole("button", { name: "Switch to English" }));
  expect(document.documentElement.lang).toBe("en");
  expect(screen.getByLabelText("Cryptocurrency")).toHaveValue("ethereum");
  expect(screen.getByLabelText("Date range")).toHaveValue("30");
  expect(screen.getByRole("alert")).toHaveTextContent(
    "The data source reached its request limit",
  );
  expect(localStorage.getItem("lang")).toBe("en");
  fireEvent.click(screen.getByRole("button", { name: "Cambiar a español" }));
  expect(screen.getByLabelText("Criptomoneda")).toHaveValue("ethereum");
});
