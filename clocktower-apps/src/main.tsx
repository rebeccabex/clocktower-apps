import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { CharacterJsonCreatorPage } from "./CharacterJsonCreatorPage.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <title>Blood on the Clocktower JSON character creator</title>
    <CharacterJsonCreatorPage />
  </StrictMode>,
);
