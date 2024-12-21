import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import configureStore from "redux-mock-store";
import Login from "../Login";
import { getUser } from "../Features/UserSlice"; // Mock the Redux action

// Mock dependencies
jest.mock("../Features/UserSlice", () => ({
  getUser: jest.fn(),
}));

// Create a mock Redux store
const mockStore = configureStore([]);

describe("Login Component Tests", () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      counter: {
        user: null,
        isSucces: false,
        isError: false,
      },
    });
    store.dispatch = jest.fn(); // Mock the dispatch function
  });

  // Test case 1: Component renders correctly
  test("renders the Login component with all fields", () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Login />
        </BrowserRouter>
      </Provider>
    );

    // Check for heading and fields
    expect(screen.getByText(/Welcome back!/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Enter your email/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Enter your password/i)).toBeInTheDocument();
    expect(screen.getByText(/Don't have an Account?/i)).toBeInTheDocument();
    expect(screen.getByText(/Login/i)).toBeInTheDocument();
  });

  // Test case 2: Valid email and password submission
  test("dispatches getUser action on form submit with valid inputs", async () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Login />
        </BrowserRouter>
      </Provider>
    );

    // Fill in email and password
    fireEvent.change(screen.getByPlaceholderText(/Enter your email/i), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText(/Enter your password/i), {
      target: { value: "password123" },
    });

    // Submit the form
    fireEvent.click(screen.getByText(/Login/i));

    // Verify if the action was dispatched with correct payload
    await waitFor(() => {
      expect(store.dispatch).toHaveBeenCalledWith(
        getUser({ email: "test@example.com", password: "password123" })
      );
    });
  });

  // Test case 3: Password visibility toggle
  test("toggles password visibility when the eye icon is clicked", () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Login />
        </BrowserRouter>
      </Provider>
    );

    const passwordField = screen.getByPlaceholderText(/Enter your password/i);
    const toggleButton = screen.getByRole("button", { name: /eye/i });

    // Check initial type
    expect(passwordField).toHaveAttribute("type", "password");

    // Click to toggle visibility
    fireEvent.click(toggleButton);
    expect(passwordField).toHaveAttribute("type", "text");

    // Click again to hide
    fireEvent.click(toggleButton);
    expect(passwordField).toHaveAttribute("type", "password");
  });

  // Test case 4: Navigation when login is successful
  test("navigates to /EventList when login is successful", async () => {
    store = mockStore({
      counter: {
        user: { id: 1, email: "test@example.com" },
        isSucces: true,
        isError: false,
      },
    });

    render(
      <Provider store={store}>
        <BrowserRouter>
          <Login />
        </BrowserRouter>
      </Provider>
    );

    // Wait for the navigation logic to execute
    await waitFor(() => {
      expect(window.location.pathname).toBe("/EventList");
    });
  });

  // Test case 5: Error handling when login fails
  test("navigates to /UserLogin when login fails", async () => {
    store = mockStore({
      counter: {
        user: null,
        isSucces: false,
        isError: true,
      },
    });

    render(
      <Provider store={store}>
        <BrowserRouter>
          <Login />
        </BrowserRouter>
      </Provider>
    );

    // Wait for the navigation logic to execute
    await waitFor(() => {
      expect(window.location.pathname).toBe("/UserLogin");
    });
  });
});
