import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { HomeContactContainer } from "../containers";

import { createStore } from "redux";
import * as reactRedux from "react-redux";
import { useAuth0 } from "@auth0/auth0-react";
import { MemoryRouter } from "react-router-dom";
import reducers from "../redux/reducers";





function makeTestStore(opts = {}) {
  const store = createStore(opts);
  const origDispatch = store.dispatch;
  store.dispatch = jest.fn(origDispatch);
  return store;
}

jest.mock("react-redux", () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));


// export const element = (selector) =>
//     document.querySelector(selector);

// export const elements = (selector) =>
//     Array.from(document.querySelectorAll(selector));
  
//   export const typesOf = (elements) =>
//     elements.map((element) => element.type);
  
//   export const textOf = (elements) =>
//     elements.map((element) => element.textContent);
  
//   export const form = (id) => element("form");
  
//   export const field = (fieldName) =>
//     form().elements[fieldName];

describe("CustomerForm", () => {
  const blankCustomer = {
    name: "",
    email: "",
    phone: "",
    message: "",
  };

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

//   it("renders an input field for 'message'", async () => {
//     render(<HomeContactContainer />);
//     const inputField = await screen.findByTestId(`name`);
//     expect(inputField.name).toBe('Your Name')
//     expect(inputField.value).toBe('');
//   });
});
