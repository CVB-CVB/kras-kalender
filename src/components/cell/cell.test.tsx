import { render, screen, fireEvent } from "@testing-library/react";
import { Cell } from "./cell";

describe("Cell", () => {
  const baseProps = {
    id: 1,
    opened: false,
    prize: "small" as const,
    onOpen: jest.fn(),
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders scratch overlay when unopened", () => {
    render(<Cell {...baseProps} />);

    expect(screen.getByText("2")).toBeInTheDocument();
  });

  it("reveals prize when opened", () => {
    render(<Cell {...baseProps} opened />);

    expect(screen.getByText("€100")).toBeVisible();
  });

  it("calls onOpen when clicked if unopened", () => {
    render(<Cell {...baseProps} />);

    fireEvent.click(screen.getByText("2"));

    expect(baseProps.onOpen).toHaveBeenCalledWith(1);
  });

  it("does not call onOpen when already opened", () => {
    render(<Cell {...baseProps} opened />);

    fireEvent.click(screen.getByText("€100"));

    expect(baseProps.onOpen).not.toHaveBeenCalled();
  });

  it("renders big prize correctly", () => {
    render(<Cell {...baseProps} prize="big" opened />);

    expect(screen.getByText("€25K")).toBeInTheDocument();
  });
});
