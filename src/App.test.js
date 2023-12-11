import { render, screen } from "@testing-library/react";
import App from "./App";
describe("ExpenseTracker component", () => {
  test("renders the SignUp component by default", () => {
    render(<App />);
    const signUpElement = screen.getByText(/Your Email/i);
    expect(signUpElement).toBeInTheDocument();
  });
});
