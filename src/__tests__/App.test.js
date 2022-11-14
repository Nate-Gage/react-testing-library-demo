import {
  render,
  screen,
  cleanup,
  fireEvent,
  waitFor,
} from "@testing-library/react";
import App from "../App";
import Item from "../Item";
import Form from "../Form";

afterEach(() => {
  cleanup();
});

jest.mock("axios", () => ({
  __esModule: true,

  default: {
    get: () => {},
  },
}));

test("App component render", () => {
  render(<App />);
  const el = screen.getByTestId("header");
  expect(el).toBeInTheDocument();
});

test("Item component render", () => {
  const item = {
    id: 10,
    utensil: "Spoon",
  };
  render(<Item utensil={item.utensil} />);
  const el = screen.getByTestId("item-1");
  expect(el).toBeInTheDocument();
  expect(el).toHaveTextContent("Spoon");
});

test("Form Username Input render", () => {
  render(<Form />);
  const formNameEl = screen.getByPlaceholderText(/username/i);
  expect(formNameEl).toBeInTheDocument();
});

test("Form username input value change", () => {
  render(<Form />);
  const formNameEl = screen.getByPlaceholderText(/username/i);
  const testValue = "test";

  fireEvent.change(formNameEl, { target: { value: testValue } });
  expect(formNameEl.value).toBe(testValue);
});

test("Form Password Input render", () => {
  render(<Form />);
  const formPasswordEl = screen.getByPlaceholderText(/password/i);
  expect(formPasswordEl).toBeInTheDocument();
});

test("Form password input value change", () => {
  render(<Form />);
  const formPasswordEl = screen.getByPlaceholderText(/password/i);
  const testValue = "test";

  fireEvent.change(formPasswordEl, { target: { value: testValue } });
  expect(formPasswordEl.value).toBe(testValue);
});

test("Button should be rendered", () => {
  render(<Form />);
  const buttonEl = screen.getByRole("button");
  expect(buttonEl).toBeInTheDocument();
});

test("Button should be disabled,", () => {
  render(<Form />);
  const buttonEl = screen.getByRole("button");
  expect(buttonEl).toBeDisabled();
});

test("Button should not be disabled if inputs exist and length > 3", () => {
  render(<Form />);
  const buttonEl = screen.getByRole("button");

  const testValue = "test";
  const formNameEl = screen.getByPlaceholderText(/username/i);
  const formPasswordEl = screen.getByPlaceholderText(/password/i);

  fireEvent.change(formNameEl, { target: { value: testValue } });
  fireEvent.change(formPasswordEl, { target: { value: testValue } });

  expect(buttonEl).not.toBeDisabled();
});

test("Loading should not be rendered,", () => {
  render(<Form />);
  const buttonEl = screen.getByRole("button");
  expect(buttonEl).not.toHaveTextContent(/please wait/i);
});

test("Error message should be hidden", () => {
  render(<App />);
  const el = screen.getByTestId("errorMsg");
  expect(el).not.toBeVisible();
});

test("Name h2 renders", () => {
  render(<Form />);

  const el = screen.getByTestId("nameHeading");
  expect(el).toBeInTheDocument();
});

test("Please Wait text should render on click,", () => {
  render(<Form />);
  const buttonEl = screen.getByRole("button");

  const testValue = "test";
  const formNameEl = screen.getByPlaceholderText(/username/i);
  const formPasswordEl = screen.getByPlaceholderText(/password/i);

  fireEvent.change(formNameEl, { target: { value: testValue } });
  fireEvent.change(formPasswordEl, { target: { value: testValue } });
  fireEvent.click(buttonEl);

  expect(buttonEl).toHaveTextContent(/please wait/i);
});

test("Please Wait text should not render after fetch,", async () => {
  render(<Form />);
  const buttonEl = screen.getByRole("button");

  const testValue = "test";
  const formNameEl = screen.getByPlaceholderText(/username/i);
  const formPasswordEl = screen.getByPlaceholderText(/password/i);

  fireEvent.change(formNameEl, { target: { value: testValue } });
  fireEvent.change(formPasswordEl, { target: { value: testValue } });
  fireEvent.click(buttonEl);

  const buttonText = await screen.findByText("CLICK ME");

  expect(buttonText).toBeInTheDocument();
});
