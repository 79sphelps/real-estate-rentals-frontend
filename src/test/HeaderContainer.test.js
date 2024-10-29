import { render, screen } from '@testing-library/react';
import { createStore } from "redux";
import * as reactRedux from 'react-redux';
import { useAuth0 } from "@auth0/auth0-react";
import { MemoryRouter} from 'react-router-dom';
import HeaderContainer from '../containers/HeaderContainer.js';
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

  it('contains the correct navbar links when user is not logged in', async () => { 
    useAuth0.mockReturnValue({
      isLoading: false,
      error: null,
      isAuthenticated: false
    })

    render(
        <MemoryRouter initialEntries={['/']}>
          <HeaderContainer />
        </MemoryRouter>,
      )
    // screen.debug();

    const el4 = await screen.findByRole('link', { name: 'Tessa Goldy - Broker' });
    expect(el4.textContent).toEqual('Tessa Goldy - Broker');
    // expect(el4.textContent).toContain('Tessa Goldy - Broker');
    // expect(el4.textContent).toBe('Tessa Goldy - Broker');

    const el = await screen.findByRole('link', { name: 'Home' });
    expect(el.textContent).toEqual('Home');

    const el3 = await screen.findByRole('link', { name: 'Listings' });
    expect(el3.textContent).toEqual('Listings');

    const el6 = await screen.findByRole('button', { name: 'Log in' });
    expect(el6.textContent).toEqual('Log in');

    // const el2 = await screen.findByText('Find Your', { exact: false });
    // expect(el2.textContent).toEqual('Find Your Home Here');
  }); 

  it('contains the correct navbar links with user is logged in as admin', async () => { 
    useAuth0.mockReturnValue({
      isLoading: false,
      error: null,
      isAuthenticated: true
    })
    
    render(
        <MemoryRouter initialEntries={['/']}>
          <HeaderContainer />
        </MemoryRouter>,
      )
    // screen.debug();

    const el4 = await screen.findByRole('link', { name: 'Tessa Goldy - Broker' });
    expect(el4.textContent).toEqual('Tessa Goldy - Broker');

    const el = await screen.findByRole('link', { name: 'Home' });
    expect(el.textContent).toEqual('Home');

    const el2 = await screen.findByRole('link', { name: 'Dashboard' });
    expect(el2.textContent).toEqual('Dashboard');

    const el3 = await screen.findByRole('link', { name: 'Listings' });
    expect(el3.textContent).toEqual('Listings');

    const el5 = await screen.findByRole('link', { name: 'Add Listing' });
    expect(el5.textContent).toEqual('Add Listing');

    const el6 = await screen.findByRole('button', { name: 'Log out' });
    expect(el6.textContent).toEqual('Log out');
  }); 

}); 
