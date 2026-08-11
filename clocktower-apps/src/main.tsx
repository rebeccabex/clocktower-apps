import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { CharacterJsonCreatorPage } from "./CharacterJsonCreatorPage.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <CharacterJsonCreatorPage />
  </StrictMode>,
);
