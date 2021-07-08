import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import store from "./store";
import { Provider } from "react-redux";
import { ThemeProvider } from "@material-ui/core/styles";
import theme from "./theme/theme";
import * as serviceWorker from "./serviceWorkerRegistration";
import Update from "./components/Update";
import packageJson from "../package.json";
global.appVersion = packageJson.version;

ReactDOM.render(
  <>
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <Update appVersion={global.appVersion} />
        <App />
      </Provider>
      ,
    </ThemeProvider>
  </>,
  document.getElementById("root")
);

serviceWorker.register();
