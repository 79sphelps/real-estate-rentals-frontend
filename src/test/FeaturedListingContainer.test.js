import { render, screen } from '@testing-library/react';
import { createStore } from "redux";
import * as reactRedux from 'react-redux';
import { useAuth0 } from "@auth0/auth0-react";
import {MemoryRouter} from 'react-router-dom';
import FeaturedListingContainer from '../containers/FeaturedListingContainer.js';
import reducers from "../redux/reducers";

function makeTestStore(opts = {}) {
  const store = createStore(opts)
  const origDispatch = store.dispatch
  store.dispatch = jest.fn(origDispatch)
  return store
}

jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

jest.mock('@auth0/auth0-react', () => ({
  useAuth0: jest.fn(),
}))

window.scrollTo = jest.fn();

describe('MyComponent', () => { 
  const useSelectorMock = reactRedux.useSelector;
  const useDispatchMock = reactRedux.useDispatch;
  const useAuth0Mock = useAuth0;

  beforeAll(() => {
    jest.useFakeTimers();
  })

  afterAll(() => {
    jest.useRealTimers();
    jest.clearAllMocks();
  })

  beforeEach(() => {
    useDispatchMock.mockImplementation(() => () => {});
    // useSelectorMock.mockImplementation(selector => selector(mockStore));
    useSelectorMock.mockImplementation(selector => selector(makeTestStore(reducers)));
    useAuth0Mock.mockImplementation(() => () => {});
  })
  afterEach(() => {
      useDispatchMock.mockClear();
      useSelectorMock.mockClear();
      jest.resetAllMocks();
  })

  it('contains the "My Featured Listings" header"', async () => { 
    useAuth0.mockReturnValue({
      isLoading: false,
      error: null,
      isAuthenticated: false
    })

    render(
        <MemoryRouter initialEntries={['/']}>
          <FeaturedListingContainer />
        </MemoryRouter>,
      )
    // screen.debug();

    const el2 = await screen.findByText('My Featured Listings', { exact: false });
    expect(el2.textContent).toEqual('My Featured Listings');

    const el1 = await screen.findByText('More Listings', { exact: false });
    expect(el1.textContent).toEqual('More Listings');
  }); 
}); 
