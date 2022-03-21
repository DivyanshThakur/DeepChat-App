import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import store from "./redux/store";
import rootTheme from "./theme";
import App from "./App";

ReactDOM.render(
  <Provider store={store}>
    <ThemeProvider theme={rootTheme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </Provider>,
  document.getElementById("root")
);
