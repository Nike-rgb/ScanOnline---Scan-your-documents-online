import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import store from "./store";
import { Provider } from "react-redux";
import { ThemeProvider } from "@material-ui/core/styles";
import theme from "./theme/theme";

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <Provider store={store}>
      <App />
    </Provider>
    ,
  </ThemeProvider>,
  document.getElementById("root")
);
