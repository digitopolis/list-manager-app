import React from "react";
import { render } from "@testing-library/react";
import App from "./App";

test("renders sign up page", () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/sign up/i);
  expect(linkElement).toBeInTheDocument();
});
