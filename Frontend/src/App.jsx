import { Routes, Route } from "react-router-dom";
import Login from "../Pages/Login";
import Signup from "../Pages/Signup";
import Navbar from "../Components/Navbar";
import Profile from "../Pages/Profile";
import Home from "../Pages/Home";
import AdminForm from "../Pages/AdminForm";
import MarketDetail from "../Pages/MarketDetails";
import Portfolio from "../Pages/Portfolio";
import DepositPage from "../Pages/DepositPage";

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/adminform" element={<AdminForm />} />
        <Route path="/markets/:marketId" element={<MarketDetail />} />
        <Route path="/deposit" element={<DepositPage />} />

        {/* <Route path="/register" element={<Register />} /> */}
      </Routes>
    </>
  );
};

export default App;
