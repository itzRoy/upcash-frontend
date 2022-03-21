import Login from "./pages/Login";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import ProfitGoal from "./pages/ProfitGoal";
import Reports from "./pages/Reports";
import Transaction from "./pages/Transactions";
import Nav from "./components/Nav";
import Navbar from "./components/Nav/Navbar";
import SideBar from "./components/SideBar/SideBar";
import TransactionPage from "./pages/test";
import { CssBaseline } from "@mui/material";

function App() {
  return (
    <BrowserRouter>
      <CssBaseline />
      <Routes>
        <Route path="/" element={<TransactionPage />} />
      </Routes>
    </BrowserRouter>
    // <Routes>
    //   <Route path="*" element={<Login />} />
    //   <Route path="/home" element={<Nav />}>
    //     <Route path="/home/reports" element={<Reports />} />
    //     <Route path="/home/transaction" element={<Transaction />} />
    //     <Route path="/home/profitgoal" element={<ProfitGoal />} />
    //   </Route>
    // </Routes>
  );
}

export default App;
