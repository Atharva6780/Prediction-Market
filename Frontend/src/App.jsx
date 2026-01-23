import { Routes, Route } from "react-router-dom";
import Login from "../Pages/Login";
import Signup from "../Pages/Signup";
import Navbar from "../Components/Navbar";
import Profile from "../Pages/Profile";

const App = () => {
  return (
    <>

    <Navbar/>

    <Routes>      
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/profile" element={<Profile />} />
      {/* <Route path="/register" element={<Register />} /> */}
    </Routes>
    </>
  );
};

export default App;
