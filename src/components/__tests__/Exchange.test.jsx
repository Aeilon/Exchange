import React from "react";
import Exchange from "../Exchange";
import {
  render,
  fireEvent,
  waitForElement,
} from "@testing-library/react";
import validJson from "../__mocks__/validNbp.json";
import "@testing-library/jest-dom/extend-expect";

describe("Exchange", () => {
  it("test", async () => {
    jest.spyOn(global, "fetch").mockImplementation(() =>
      Promise.resolve({
        json: () => Promise.resolve(validJson)
      })
    );
    const { getByText, getByTestId, getByPlaceholderText, } = render(<Exchange />);
    const input = getByPlaceholderText("Amount");
    fireEvent.change(input, { target: { value: '10' } });
    fireEvent.click(getByTestId("button"));
    const textNode = await waitForElement(() => {
     getByText("10 PLN = 2.58 USD");
    });
   
    expect(textNode).toBeInTheDocument();
    jest.restoreAllMocks();
  });
});