import { Routes, Route } from "react-router-dom";
import AppShell from "./components/layout/AppShell";
import Dashboard from "./screens/Dashboard";
import DivisionDetail from "./screens/DivisionDetail";
import Practice from "./screens/Practice";
import ExamSim from "./screens/ExamSim";
import History from "./screens/History";
import Stats from "./screens/Stats";
import Settings from "./screens/Settings";

export default function App() {
  return (
    <Routes>
      <Route element={<AppShell />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/division/:code" element={<DivisionDetail />} />
        <Route path="/practice/:key" element={<Practice />} />
        <Route path="/examsim/:key" element={<ExamSim />} />
        <Route path="/history" element={<History />} />
        <Route path="/stats" element={<Stats />} />
        <Route path="/settings" element={<Settings />} />
      </Route>
    </Routes>
  );
}
