import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Navbar = () => {
  const token = localStorage.getItem("accessToken");
  const navigate = useNavigate();

  const handleLogout = async() => {
    await axios.post(`${import.meta.env.VITE_API_URL}/api/logout`, {
    refreshToken: localStorage.getItem("refreshToken"),
    });

    localStorage.clear();
    navigate("/login");
  };
  
  return (
    <nav style={{ marginBottom: "20px" }}>
      {token ? (
        <>
          <Link to="/explain">Explain</Link>{" | "}
          <Link to="/history">History</Link>{" | "}
          <button onClick={handleLogout}>Logout</button>
        </>
      ) : (
        <>
          <Link to="/login">Login</Link>{" | "}
          <Link to="/signup">Signup</Link>
        </>
      )}
    </nav>
  );
};

export default Navbar;
