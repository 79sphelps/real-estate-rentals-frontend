import { render, screen } from '@testing-library/react';
import Home from '../pages/home.js';
import { createStore } from "redux";
import * as reactRedux from 'react-redux';
import { useAuth0 } from "@auth0/auth0-react";
import {MemoryRouter} from 'react-router-dom';
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
  });

  afterAll(() => {
    jest.useRealTimers();
    jest.clearAllMocks();
  });

  beforeEach(() => {
    useDispatchMock.mockImplementation(() => () => {});
    // useSelectorMock.mockImplementation(selector => selector(mockStore));
    useSelectorMock.mockImplementation(selector => selector(makeTestStore(reducers)));
    useAuth0Mock.mockImplementation(() => () => {});
  });

  afterEach(() => {
      useDispatchMock.mockClear();
      useSelectorMock.mockClear();
      jest.resetAllMocks();
  });


  it('contains a link with "Find Your Home Here"', async () => { 
    useAuth0.mockReturnValue({
      isLoading: false,
      error: null,
      isAuthenticated: true
    })

    render(
        <MemoryRouter initialEntries={['/']}>
          <Home />
        </MemoryRouter>,
      )
    // screen.debug();

    const el4 = await screen.findByRole('link', { name: 'Tessa Goldy - Broker' });
    expect(el4.textContent).toEqual('Tessa Goldy - Broker');
    expect(el4.textContent).toContain('Tessa Goldy - Broker');
    expect(el4.textContent).toBe('Tessa Goldy - Broker');
  }); 
}); 
