import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { registerSW } from "virtual:pwa-register";
import { App } from "./App";
import { LocaleProvider } from "./i18n/LocaleProvider";
import "./styles.css";

const rootEl = document.getElementById("root");
if (!rootEl) {
  throw new Error("Root element missing. Check index.html.");
}

createRoot(rootEl).render(
  <StrictMode>
    <LocaleProvider>
      <App />
    </LocaleProvider>
  </StrictMode>,
);

// Register the service worker so the app works offline after the first visit.
// No-op during development (the SW is only built for production).
registerSW({ immediate: true });
