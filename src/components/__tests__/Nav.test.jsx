import React from "react";
import Nav from "../Nav";
import { render} from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

describe("Nav", () => {
  it("renders nav component", () => {
    const { getByText } = render(<Nav />);
    expect(getByText("Exchange")).toBeInTheDocument();
  });
});

