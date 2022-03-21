import Login from "./pages/Login"
import { Routes, Route } from 'react-router-dom';
import ProfitGoal from "./pages/ProfitGoal";
import Reports from "./pages/Reports";
import Transaction from "./pages/Transactions";
import Nav from "./components/Nav";

function App() {
  return (
    <Routes>
        <Route path="*" element={<Login/>} />
        <Route path="/home" element={<Nav/>}>
        <Route path="/home/reports" element={<Reports/>} />
        <Route path="/home/transaction" element={<Transaction/>} />
        <Route path="/home/profitgoal" element={<ProfitGoal/>} /> 
          </Route>
    </Routes>
  
  );
}

export default App;
