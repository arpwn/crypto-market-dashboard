import { fireEvent, render, screen } from "@testing-library/react";
import App from "../App";
import { useCryptoMarket } from "../hooks/useCryptoMarket";
jest.mock("../hooks/useCryptoMarket");
const mockedHook = jest.mocked(useCryptoMarket);
const retry = jest.fn();
beforeEach(() => {
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
  expect(screen.getByRole("status")).toHaveTextContent(/loading/i);
  expect(screen.getByLabelText("Cryptocurrency")).toBeEnabled();
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
  fireEvent.change(screen.getByLabelText("Cryptocurrency"), {
    target: { value: "ethereum" },
  });
  expect(mockedHook).toHaveBeenLastCalledWith("ethereum", 7);
});
