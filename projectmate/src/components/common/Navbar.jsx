import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import Button from "./Button";
import { useAuth } from "../../contexts/AuthContext";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { user, logout } = useAuth();

  const toggleMenu = () => setIsOpen(!isOpen);
  const isActive = (path) => location.pathname === path;

  return (
    <nav className="py-4 w-full bg-white z-50 sticky top-0 shadow-sm">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link to="/" className="flex items-center">
          <h1 className="text-3xl font-extrabold text-gray-900 font-montserrat tracking-wide">
            Project Mate
          </h1>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-1">
          <div className="bg-black rounded-full px-5 py-2 flex items-center space-x-6 font-poppins">
            <Link
              to="/home"
              className={`text-sm font-medium ${
                isActive("/home") ? "text-white" : "text-gray-300 hover:text-white"
              }`}
            >
              Home
            </Link>
            <Link
              to="/categories"
              className={`text-sm font-medium ${
                isActive("/categories") ? "text-white" : "text-gray-300 hover:text-white"
              }`}
            >
              Categories
            </Link>
            {user && (
              <Link
                to={`/profile/${user.id}`}
                className={`text-sm font-medium ${
                  isActive(`/profile/${user.id}`) ? "text-white" : "text-gray-300 hover:text-white"
                }`}
              >
                Profile
              </Link>
            )}
          </div>
        </div>

        <div className="hidden md:flex items-center space-x-4">
          {user ? (
            <div className="flex items-center space-x-4">
              <Link to={user.role === "creator" ? "/dashboard/creator" : "/dashboard/contributor"}>
                <Button variant="secondary" size="sm">
                  Dashboard
                </Button>
              </Link>
              <Button onClick={logout} variant="primary">
                Log Out
              </Button>
            </div>
          ) : (
            <Link to="/login">
              <Button variant="orange" className ="font-poppins text-white">
                Log In
              </Button>
            </Link>
          )}
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden flex items-center">
          <button onClick={toggleMenu} className="text-gray-700 hover:text-primary focus:outline-none">
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.2 }}
          className="md:hidden bg-white shadow-lg absolute top-16 inset-x-0 z-50"
        >
          <div className="px-4 py-5 space-y-4">
            <Link
              to="/home"
              className="block px-3 py-2 text-base font-medium text-gray-900 hover:bg-gray-50 rounded-md"
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/categories"
              className="block px-3 py-2 text-base font-medium text-gray-900 hover:bg-gray-50 rounded-md"
              onClick={() => setIsOpen(false)}
            >
              Categories
            </Link>
            {user && (
              <Link
                to={`/profile/${user.id}`}
                className="block px-3 py-2 text-base font-medium text-gray-900 hover:bg-gray-50 rounded-md"
                onClick={() => setIsOpen(false)}
              >
                Profile
              </Link>
            )}

            <div className="pt-4 border-t border-gray-200">
              {user ? (
                <div className="space-y-3">
                  <Link
                    to={user.role === "creator" ? "/dashboard/creator" : "/dashboard/contributor"}
                    className="block w-full"
                    onClick={() => setIsOpen(false)}
                  >
                    <Button variant="secondary" fullWidth>
                      Dashboard
                    </Button>
                  </Link>
                  <Button
                    onClick={() => {
                      logout();
                      setIsOpen(false);
                    }}
                    variant="primary"
                    fullWidth
                  >
                    Log Out
                  </Button>
                </div>
              ) : (
                <Link to="/login" className="block w-full" onClick={() => setIsOpen(false)}>
                  <Button
                    variant="primary"
                    fullWidth
                    className="bg-orange-500 text-white hover:bg-orange-600"
                  >
                    Log In
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </nav>
  );
};

export default Navbar;
