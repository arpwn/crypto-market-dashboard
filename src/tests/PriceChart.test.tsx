import { render, screen } from "@testing-library/react";
import { PriceChart } from "../components/charts/PriceChart";

const mockData: [number, number][] = [
  [1670000000000, 20000],
  [1670003600000, 21000],
];

describe("PriceChart", () => {
  test("renders chart title", () => {
    render(<PriceChart data={mockData} />);

    expect(
      screen.getByRole("heading", { name: /evolución del precio/i }),
    ).toBeInTheDocument();
  });
});
