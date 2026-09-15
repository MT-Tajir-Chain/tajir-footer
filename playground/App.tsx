import { TajirFooter } from "../src";
import type { TajirFooterApp, TajirFooterTheme } from "../src";

const APPS: TajirFooterApp[] = ["website", "explorer", "bridge", "faucet"];

function readParam(name: string) {
  if (typeof window === "undefined") return null;
  return new URLSearchParams(window.location.search).get(name);
}

export default function App() {
  const themeParam = readParam("theme");
  const appParam = readParam("app");
  const theme: TajirFooterTheme = themeParam === "light" ? "light" : "dark";
  const app: TajirFooterApp = APPS.includes(appParam as TajirFooterApp)
    ? (appParam as TajirFooterApp)
    : "explorer";

  return (
    <div style={{ minHeight: "100vh", background: theme === "dark" ? "#0a0a0a" : "#ffffff" }}>
      <TajirFooter app={app} theme={theme} />
    </div>
  );
}
