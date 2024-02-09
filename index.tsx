import { createRoot } from 'react-dom/client';
import "./styles.css";

import App from "./App";
import { initI18n } from "./utils/i18nUtils";

// Ensure that locales are loaded before rendering the app
initI18n().then(() => {
  const container = document.getElementById('app');
  const root = createRoot(container); // createRoot(container!) if you use TypeScript
  root.render(<App />);
});
