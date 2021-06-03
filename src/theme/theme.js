import { createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
  typography: {
    h6: {
      fontSize: 16,
    },
  },
  palette: {
    primary: {
      main: "#844494",
    },
    secondary: {
      main: "#000",
      icon: "#38bf9c",
      lightIcon: "#fb118e",
      darkIcon: "#292a31",
      success: "#24b56b",
      danger: "#f11010",
      extraText: "#000",
    },
  },
});

export default theme;
