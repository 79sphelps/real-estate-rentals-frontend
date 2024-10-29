import React from "react";
import { render, screen } from "@testing-library/react";
import { HomeContactContainer } from "../containers";
import userEvent from '@testing-library/user-event'

jest.mock("react-redux", () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));


describe("CustomerForm", () => {
  it("renders a form", () => {
    render(<HomeContactContainer />);
    expect(screen.getByTestId("contactForm")).not.toBeNull();
  });

  it("renders an input field for 'name'", async () => {
    render(<HomeContactContainer />);
    const inputField = await screen.findByTestId(`name`);
    expect(inputField.name).toBe('Your Name')
    expect(inputField.value).toBe('');
  });

  it("renders an input field for 'email'", async () => {
    render(<HomeContactContainer />);
    const inputField = await screen.findByTestId(`email`);
    expect(inputField.name).toBe('Your Email')
    expect(inputField.value).toBe('');
  });

  it("renders an input field for 'phone'", async () => {
    render(<HomeContactContainer />);
    const inputField = await screen.findByTestId(`phone`);
    expect(inputField.name).toBe('Your Phone Number')
    expect(inputField.value).toBe('');
  });

  it("renders an input field for 'message'", async () => {
    render(<HomeContactContainer />);
    const inputField = await screen.findByTestId(`message`);
    // expect(inputField.name).toBe('Your Message')
    expect(inputField.value).toBe('');
  });

  it("renders a button for 'submit'", async () => {
    render(<HomeContactContainer />);
    const button = await screen.findByTestId(`submit`);
    expect(button.value).toBe('Send Message');
  });

  it("state updates as user enters input in field for 'name'", async () => {
    render(<HomeContactContainer />);
    const inputField = await screen.findByTestId(`name`);
    const user = userEvent.setup()
    await user.type(inputField, 'Rosyln Jones');
    expect(inputField.value).not.toBe('');
    expect(inputField.value).toBe('Rosyln Jones');
  });

  it("state updates as user enters input in field for 'email'", async () => {
    render(<HomeContactContainer />);
    const inputField = await screen.findByTestId(`email`);
    const user = userEvent.setup()
    await user.type(inputField, 'rose@gmail.com');
    expect(inputField.value).not.toBe('');
    expect(inputField.value).toBe('rose@gmail.com');
  });

  it("state updates as user enters input in field for 'phone'", async () => {
    render(<HomeContactContainer />);
    const inputField = await screen.findByTestId(`phone`);
    const user = userEvent.setup()
    await user.type(inputField, '503-234-4325');
    expect(inputField.value).not.toBe('');
    expect(inputField.value).toBe('503-234-4325');
  });
});
