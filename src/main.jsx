import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./view/redux/store.js";
import { ThemeProviderComponent } from "./view/contexts/ThemeContext.jsx";
import "./index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <ThemeProviderComponent>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ThemeProviderComponent>
    </Provider>
  </StrictMode>
);
