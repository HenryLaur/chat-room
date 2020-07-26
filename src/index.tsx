import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import store from "./store/store";
import { Provider } from "react-redux";
import * as serviceWorker from "./serviceWorker";
import { MainPage } from "./screens/MainPage";
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { yellow } from "@material-ui/core/colors/";
console.log = function () {};
const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#2c2c31",
    },
    secondary: yellow,
  },
});

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <MainPage />
      </Provider>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
