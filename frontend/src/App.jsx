import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Explain from "./pages/Explain";
import History from "./pages/History";
import Navbar from "./components/Navbar";

function App() {
  const isLoggedIn = localStorage.getItem("token");

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={isLoggedIn ? <Explain /> : <Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/explain" element={isLoggedIn?<Explain />:<Login/>} />
        <Route path="/history" element={isLoggedIn?<History />:<Login/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
