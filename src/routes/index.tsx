import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import { Detail } from "@/pages/Detail";
import { Home } from "@/pages/Home";

function NoMatch() {
  return (
    <div style={{ padding: 20 }}>
      <h2>404: Page Not Found</h2>

      <Link to="/">{`< Home`}</Link>
    </div>
  );
}

export function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/details" element={<Detail />} />
        <Route path="*" element={<NoMatch />} />
      </Routes>
    </BrowserRouter>
  );
}
