import { render, screen, act } from "@testing-library/react";
import { GridProvider, useGrid } from "./grid-context";
import * as storage from "./../lib/storage";
import * as generator from "./../utils/generate-grid";

jest.mock("./../lib/storage");
jest.mock("./../utils/generate-grid");

const mockGrid = Array.from({ length: 10 }, (_, i) => ({
  id: i,
  opened: false,
  prize: "none" as const,
}));

describe("GridProvider", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (storage.loadGrid as jest.Mock).mockReturnValue(null);
    (generator.generateGrid as jest.Mock).mockReturnValue(mockGrid);
  });

  function TestComponent() {
    const { grid, openCell, reset } = useGrid();

    return (
      <>
        <div data-testid="opened">{grid.filter((c) => c.opened).length}</div>
        <button onClick={() => openCell(0)}>open</button>
        <button onClick={reset}>reset</button>
      </>
    );
  }

  it("initializes grid from generateGrid if no storage", async () => {
    render(
      <GridProvider>
        <TestComponent />
      </GridProvider>
    );

    expect(generator.generateGrid).toHaveBeenCalled();
  });

  it("opens a cell", async () => {
    render(
      <GridProvider>
        <TestComponent />
      </GridProvider>
    );

    const button = screen.getByText("open");

    await act(async () => {
      button.click();
    });

    expect(screen.getByTestId("opened").textContent).toBe("1");
  });

  it("does not reopen an already opened cell", async () => {
    render(
      <GridProvider>
        <TestComponent />
      </GridProvider>
    );

    const button = screen.getByText("open");

    await act(async () => {
      button.click();
      button.click();
    });

    expect(screen.getByTestId("opened").textContent).toBe("1");
  });

  it("resets grid", async () => {
    render(
      <GridProvider>
        <TestComponent />
      </GridProvider>
    );

    const open = screen.getByText("open");
    const reset = screen.getByText("reset");

    await act(async () => {
      open.click();
    });

    expect(screen.getByTestId("opened").textContent).toBe("1");

    await act(async () => {
      reset.click();
    });

    expect(screen.getByTestId("opened").textContent).toBe("0");
  });

  it("throws error when useGrid is used outside provider", () => {
    const BadComponent = () => {
      useGrid();
      return null;
    };

    expect(() => render(<BadComponent />)).toThrow(
      "useGrid must be used inside GridProvider"
    );
  });
});
