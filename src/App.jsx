import { BrowserRouter, Routes, Route, Link } from "react-router";
import DashboardSantri from "./components/DashboardSantri";
import DaftarSantri from "./components/DaftarSantri";
import DetailSantri from "./components/Detailsantri";
import About from "./components/About";
import NotFound from "./components/NotFound";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <nav>
        <Link to="/">Dashboard</Link>
        <Link to="/santri">Santri</Link>
        <Link to="/about">Tentang</Link>
      </nav>

      <Routes>
        <Route path="/" element={<DashboardSantri />} />

        <Route path="/santri" element={<DaftarSantri />} />

        <Route path="/santri/:id" element={<DetailSantri />} />

        <Route path="/about" element={<About />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
