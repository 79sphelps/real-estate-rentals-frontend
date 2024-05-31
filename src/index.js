import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import store from "./redux/store";
import { Provider } from "react-redux";


import {createBrowserHistory} from 'history';
import { getConfig } from "./config";
import { Auth0Provider } from "@auth0/auth0-react";


const history = createBrowserHistory();

const onRedirectCallback = (appState) => {
  console.log(window.location.pathname)
  history.push(
    appState && appState.returnTo ? appState.returnTo : window.location.pathname
  );
};

// Please see https://auth0.github.io/auth0-react/interfaces/Auth0ProviderOptions.html
// for a full list of the available properties on the provider
const config = getConfig();

const providerConfig = {
  domain: config.domain,
  clientId: config.clientId,
  ...(config.audience ? { audience: config.audience } : null),
  // redirectUri: window.location.origin,
  // redirectUri: window.location.origin + '/callback',
  authorizationParams: {
    redirect_uri: window.location.origin
  },
  onRedirectCallback,
};

ReactDOM.render(
  <Auth0Provider {...providerConfig}>
  <Provider store={store}>
    <App />
  </Provider>
  </Auth0Provider>,
  document.getElementById("root")
);
