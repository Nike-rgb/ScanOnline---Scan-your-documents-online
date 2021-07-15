import App from "./App";
import store from "./store";
import { Provider } from "react-redux";
import { ThemeProvider } from "@material-ui/core/styles";
import { lightTheme, darkTheme } from "./theme/theme";
import Update from "./components/Update";
import { useState } from "react";
import packageJson from "../package.json";
global.appVersion = packageJson.version;

export default function AppContainer(props) {
  const [theme, setTheme] = useState("light");
  return (
    <>
      <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
        <Provider store={store}>
          <Update appVersion={global.appVersion} />
          <App setTheme={setTheme} theme={theme} />
        </Provider>
        ,
      </ThemeProvider>
    </>
  );
}
