import { Link, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";


export default function Navbar({ isLoggedIn, setIsLoggedIn }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    setIsLoggedIn(false);
    navigate("/login");
    window.dispatchEvent(new Event("authChange"));
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-xl font-bold text-blue-600">
              CodeDebugger
            </Link>
          </div>
          <div className="flex items-center gap-4">
            {isLoggedIn ? (
              <>
                <Link to="/explain" className="text-gray-700 hover:text-blue-600">
                  Explain Code
                </Link>
                <Link to="/history" className="text-gray-700 hover:text-blue-600">
                  History
                </Link>
                <Button onClick={handleLogout} variant="destructive">
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="outline">Login</Button>
                </Link>
                <Link to="/signup">
                  <Button>Sign Up</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
