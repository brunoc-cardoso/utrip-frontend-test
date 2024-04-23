import { ShowsContextProvider } from "@/context/shows";
import "@/global.scss";
import { Router } from "@/routes";

export function App() {
  return (
    <ShowsContextProvider>
      <Router />
    </ShowsContextProvider>
  );
}
