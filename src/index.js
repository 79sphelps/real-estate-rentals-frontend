import React from "react";
import { createRoot } from "react-dom/client"
import { Provider } from "react-redux";
import { createBrowserHistory } from 'history';
import { Auth0Provider } from "@auth0/auth0-react";
import { getConfig } from "./config";
import store from "./redux/store";
import App from "./App";
import "./index.css";

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
  authorizationParams: {
    redirect_uri: window.location.origin
  },
  onRedirectCallback,
};

// ** React v.18 version **
const root = createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Auth0Provider {...providerConfig}>
     <Provider store={store}>
        <App />
     </Provider>
   </Auth0Provider>
  </React.StrictMode>
);