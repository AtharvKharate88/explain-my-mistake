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
    <nav>
      <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
        <Link to="/" style={{ fontSize: "1.25rem", fontWeight: "700" }}>
          CodeDebugger
        </Link>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
        {token ? (
          <>
            <Link to="/explain">Explain</Link>
            <Link to="/history">History</Link>
            <button onClick={handleLogout} className="danger">Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/signup">Signup</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
