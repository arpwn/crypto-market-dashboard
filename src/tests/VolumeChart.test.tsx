import { render, screen } from "@testing-library/react";
import { VolumeChart } from "../components/charts/VolumeChart";

const mockData: [number, number][] = [
  [1670000000000, 500000],
  [1670003600000, 800000],
];

describe("VolumeChart", () => {
  test("renders chart title", () => {
    render(<VolumeChart data={mockData} />);

    expect(
      screen.getByRole("heading", { name: /trading volume/i }),
    ).toBeInTheDocument();
  });
});
