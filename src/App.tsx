import { ToastContainer } from "react-toastify";

import { ShowsContextProvider } from "@/context/shows";
import "@/global.scss";
import { Router } from "@/routes";

import "react-toastify/dist/ReactToastify.css";

export function App() {
  return (
    <ShowsContextProvider>
      <ToastContainer theme="colored" />
      <Router />
    </ShowsContextProvider>
  );
}
