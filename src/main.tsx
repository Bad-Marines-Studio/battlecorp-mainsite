import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { AppBoot } from "./components/AppBoot";
import "./styles/index.css";

createRoot(document.getElementById("root")!).render(
  <AppBoot>
    <App />
  </AppBoot>
);
