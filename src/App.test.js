import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import App from './App';
import { createStore } from "redux";
import * as reactRedux from 'react-redux';
import { useAuth0 } from "@auth0/auth0-react";
import loading from "./assets/loading.svg";

// import { selectRentals } from "./redux/selectors";
import { setRentals, getRentals } from "./redux/actions";
import reducers from "./redux/reducers";

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

  // ACTIONS

  it('should get rentals successfully', () => {
    const tempPropertyList = [
      {
        "_id": 1,
        "address": "Loading addresse...",
        "price": "Acquiring price...",
        "description": "Acquiring property description...",
        "images": [loading]
      },
      {
        "_id": 2,
        "address": "Loading addresse...",
        "price": "Acquiring price...",
        "description": "Acquiring property description...",
        "images": [loading]
      },
      {
        "_id": 3,
        "address": "Loading addresse...",
        "price": "Acquiring price...",
        "description": "Acquiring property description...",
        "images": [loading]
      },
    ]

    const store = makeTestStore(reducers);
    store.dispatch(setRentals(tempPropertyList));
    expect(store.getState().rentals).toEqual(tempPropertyList);
  });

  it('contains a link with "Find Your Home Here"', async () => { 
    useAuth0.mockReturnValue({
      isLoading: false,
      error: null,
      isAuthenticated: true
    })

    const tempPropertyList = [
      {
        "_id": 1,
        "address": "Loading addresse...",
        "price": "Acquiring price...",
        "description": "Acquiring property description...",
        "images": [loading]
      },
      {
        "_id": 2,
        "address": "Loading addresse...",
        "price": "Acquiring price...",
        "description": "Acquiring property description...",
        "images": [loading]
      },
      {
        "_id": 3,
        "address": "Loading addresse...",
        "price": "Acquiring price...",
        "description": "Acquiring property description...",
        "images": [loading]
      },
    ]

    render(<App />);
    // screen.debug();

    const store = makeTestStore(reducers);
    store.dispatch(setRentals(tempPropertyList));
    expect(store.getState().rentals).toEqual(tempPropertyList);

    // jest.advanceTimersByTime(30000);

    // useAuth0.mockImplementation(() => [false, isLoading])

    const el = await screen.findByAltText('Loading');
    expect(el.src).toContain('loading.svg');
    expect(el.alt).toBe('Loading');
    expect(el.alt).toContain('Loading');

    const el4 = await screen.findByRole('link', { name: 'Tessa Goldy - Broker' });
    expect(el4.textContent).toEqual('Tessa Goldy - Broker');
    expect(el4.textContent).toContain('Tessa Goldy - Broker');
    expect(el4.textContent).toBe('Tessa Goldy - Broker');

    const el3 = await screen.findByText('My Featured', { exact: false })
    expect(el3.textContent).toEqual('My Featured Listings');

    const el2 = await screen.findByText('Find Your', { exact: false });
    expect(el2.textContent).toEqual('Find Your Home Here');
  }); 

  it('contains a navbar links when logged in as admin user', async () => { 
    useAuth0.mockReturnValue({
      isLoading: false,
      error: null,
      isAuthenticated: true
    })

    render(<App />);
    // screen.debug();

    const el4 = await screen.findByRole('link', { name: 'Dashboard' });
    expect(el4.textContent).toEqual('Dashboard');

    const el5 = await screen.findByRole('link', { name: 'Listings' });
    expect(el5.textContent).toEqual('Listings');

    const el6 = await screen.findByRole('link', { name: 'Add Listing' });
    expect(el6.textContent).toEqual('Add Listing');

    const el7 = await screen.findByRole('button', { name: 'Log out' });
    expect(el7.textContent).toEqual('Log out');
    expect(await screen.findByRole('button', { name: 'Log out' })).toBeTruthy();
  }); 

  it('contains a navbar links', async () => { 
    useAuth0.mockReturnValue({
      isLoading: false,
      error: null,
      isAuthenticated: false
    })

    render(<App />);
    // screen.debug();

    const el5 = await screen.findByRole('link', { name: 'Listings' });
    expect(el5.textContent).toEqual('Listings');

    const el7 = await screen.findByRole('button', { name: 'Log in' });
    expect(el7.textContent).toEqual('Log in');
    expect(await screen.findByRole('button', { name: 'Log in' })).toBeTruthy();
  }); 

  it('user can navigate to the "Listings" page', async () => { 
    useAuth0.mockReturnValue({
      isLoading: false,
      error: null,
      isAuthenticated: false
    })

    jest.spyOn(reactRedux, 'useSelector').mockReturnValue(
      [
        {
          "_id": 1,
          "address": "Loading addresse...",
          "price": "Acquiring price...",
          "description": "Acquiring property description...",
          "images": [loading]
        },
        {
          "_id": 2,
          "address": "Loading addresse...",
          "price": "Acquiring price...",
          "description": "Acquiring property description...",
          "images": [loading]
        },
        {
          "_id": 3,
          "address": "Loading addresse...",
          "price": "Acquiring price...",
          "description": "Acquiring property description...",
          "images": [loading]
        },
      ]
    );

    render(<App />);
    // screen.debug();

    const user = userEvent.setup()

    const el5 = await screen.findByRole('link', { name: 'Listings' });
    expect(el5.textContent).toEqual('Listings');

    // await user.click(screen.getByRole('link', { name: 'Listings' }));
    user.click(screen.getByRole('link', { name: 'Listings' }));

    const el3 = await screen.findByText('Our Property List', { exact: false })
    expect(el3.textContent).toEqual('Our Property List');

    // await waitFor(() => {
    //   const el4 = screen.getByText('Our Property List', { exact: false })
    //   expect(el4.textContent).toEqual('Our Property List');
    // });
  }); 
}); 
