import { Outlet, Link, useNavigate } from "react-router-dom";
import { Menu } from "lucide-react";
import { useEffect, useState } from "react";
import { getCurrentUser, logoutUser } from "../services/service";

export default function Navbar() {
  const [user, setUser] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const loadUser = async () => {
      try {
        const { data } = await getCurrentUser();
        setUser(data);
      } catch (err) {
        console.log(err);
        setUser(null);
      }
    };

    loadUser();
  }, []);

  const handleLogout = async () => {
    try {
      await logoutUser();
    } catch (err) {
      console.log(err);
    }

    localStorage.removeItem("token");
    localStorage.removeItem("role");
    setUser(null);
    navigate("/login");
  };

  return (
    <>
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b shadow-sm">
        <div className="max-w-7xl mx-auto h-20 px-6 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="text-3xl font-bold text-indigo-600">
            BlogSpace
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8 font-medium">
            <Link to="/">Home</Link>
            <Link to="user">User Blogs</Link>
            <Link to="/">About</Link>
            <Link to="/">Contact</Link>
          </nav>

          {/* Right Side */}
          <div className="hidden md:flex items-center gap-4">
            {user ? (
              <>
                <div className="text-right">
                  <p className="font-semibold">{user.name}</p>
                  <p className="text-sm text-gray-500">{user.email}</p>
                  <span className="text-xs px-2 py-1 rounded bg-indigo-100 text-indigo-700">
                    {user.role}
                  </span>
                </div>

                <button
                  onClick={handleLogout}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="border border-indigo-600 text-indigo-600 px-4 py-2 rounded-lg hover:bg-indigo-50 transition"
                >
                  Login
                </Link>

                <Link
                  to="/register"
                  className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
                >
                  Register
                </Link>
              </>
            )}
          </div>

          {/* Mobile Button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden"
          >
            <Menu size={28} />
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="md:hidden border-t bg-white">
            <div className="flex flex-col p-5 gap-4">
              <Link to="/" onClick={() => setMobileOpen(false)}>
                Home
              </Link>

              <Link to="/user" onClick={() => setMobileOpen(false)}>
                User Blogs
              </Link>

              <Link to="/" onClick={() => setMobileOpen(false)}>
                About
              </Link>

              <Link to="/" onClick={() => setMobileOpen(false)}>
                Contact
              </Link>

              <hr />

              {user ? (
                <>
                  <div>
                    <p className="font-semibold">{user.name}</p>
                    <p className="text-sm text-gray-500">{user.email}</p>
                    <p className="text-indigo-600">{user.role}</p>
                  </div>

                  <button
                    onClick={handleLogout}
                    className="bg-red-500 text-white py-2 rounded-lg"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    onClick={() => setMobileOpen(false)}
                    className="text-center border border-indigo-600 text-indigo-600 py-2 rounded-lg"
                  >
                    Login
                  </Link>

                  <Link
                    to="/register"
                    onClick={() => setMobileOpen(false)}
                    className="text-center bg-indigo-600 text-white py-2 rounded-lg"
                  >
                    Register
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </header>

      <Outlet />
    </>
  );
}
