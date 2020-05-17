import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";

import { store } from "./_helpers";
import { App } from "./App";
import Menu from "./WorkingHours/menu";
import { BrowserRouter } from "react-router-dom";

render(
  <Provider store={store}>
    <BrowserRouter>
      <Menu />
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById("app")
);
