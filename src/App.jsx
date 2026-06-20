import "./App.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Matches from "./pages/Matches";
import MatchCenter from "./pages/MatchCenter";
import More from "./pages/More";
import Tournaments from "./pages/Tournaments";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/matches" element={<Matches />} />
        <Route path="/match/:matchId" element={<MatchCenter />} />
        <Route path="/tournaments" element={<Tournaments />} />
        <Route path="/more" element={<More />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
