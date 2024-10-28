// import { render, screen, waitFor } from '@testing-library/react';
// import App from './App';
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
  // const useSelectorMock = reactRedux.useSelector;
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
    useAuth0Mock.mockImplementation(() => () => {});
  })
  afterEach(() => {
      useDispatchMock.mockClear();
      // useSelectorMock.mockClear();
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

}); 
