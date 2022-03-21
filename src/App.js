import { Routes, Route, BrowserRouter } from "react-router-dom";
import TransactionPage from "./pages/Transactions";
import { CssBaseline } from "@mui/material";
import Reports from "./pages/D-Reports";
import ReportsPage from "./pages/ReportsPage";
import ProfitGoalPage from "./pages/ProfitePage";
import SettingsPage from "./pages/SettingsPage";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";

const App = (props) => {
  return (
    <BrowserRouter>
      <CssBaseline />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/transactions" element={<TransactionPage />} />
        <Route path="/reports" element={<ReportsPage />} />
        <Route path="/profit-goal" element={<ProfitGoalPage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
