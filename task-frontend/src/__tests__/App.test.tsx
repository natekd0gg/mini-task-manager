import { describe, it } from "vitest";
import { render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import App from "../App";

// Test if app is running as expected
describe("app", () => {
  it("renders the app component", () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
  });
});
