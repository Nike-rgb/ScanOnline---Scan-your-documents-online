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
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
global.appVersion = packageJson.version;

ReactDOM.render(
  <>
    <Router>
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <Update appVersion={global.appVersion} />
          <Switch>
            <Route path="/shared/:downloadCode" children={<App />} />
            <Route path="/" children={<App />} />
          </Switch>
        </Provider>
        ,
      </ThemeProvider>
    </Router>
  </>,
  document.getElementById("root")
);

serviceWorker.register();
