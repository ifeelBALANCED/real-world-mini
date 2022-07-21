import "./main.css";
import "antd/dist/antd.css";

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";

import App from "@/app/app";
import { store } from "@/store/store";

const rootDomNode = document.getElementById("root");

const root = createRoot(rootDomNode as HTMLElement);

root.render(
  <StrictMode>
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
  </StrictMode>
);
