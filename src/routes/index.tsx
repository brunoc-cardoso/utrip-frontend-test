import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Details } from "@/pages/Details";
import { Home } from "@/pages/Home";
import { NoMatch } from "@/pages/NoMach";

export function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/details" element={<Details />} />
        <Route path="*" element={<NoMatch />} />
      </Routes>
    </BrowserRouter>
  );
}
