import { Link, useNavigate } from 'react-router-dom';
import { LogOut, User } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

const Navbar = ({ user }) => {
  const navigate = useNavigate();
  const [showProfile, setShowProfile] = useState(false);
  const dropdownRef = useRef(null);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowProfile(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav className="flex justify-between items-center px-6 py-4 bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
      {/* Logo */}
      <Link
        to="/"
        className="text-2xl font-extrabold bg-gradient-to-r from-purple-500 to-purple-700 bg-clip-text text-transparent"
      >
        LinkNest
      </Link>

      {/* Right Section */}
      <div className="flex gap-4 items-center relative" ref={dropdownRef}>
        {!user ? (
          <>
            <Link
              to="/login"
              className="text-gray-700 hover:text-purple-600 transition"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition"
            >
              Get Started
            </Link>
          </>
        ) : (
          <>
            <button
              onClick={() => setShowProfile(!showProfile)}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition"
            >
              <User size={18} />
              <span className="hidden sm:inline">{user?.name || 'Profile'}</span>
            </button>

            {showProfile && (
              <div className="absolute right-0 top-12 w-56 bg-white shadow-lg rounded-xl border border-gray-200 overflow-hidden">
                <div className="p-4">
                  <h3 className="font-semibold text-gray-800">Profile Details</h3>
                  <p className="text-sm text-gray-600 mt-1 truncate">{user?.name}</p>
                  <p className="text-sm text-gray-600 truncate">{user?.email}</p>
                </div>
                <hr className="border-gray-200" />
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 px-4 py-3 text-red-500 hover:bg-red-50 w-full transition font-medium"
                >
                  <LogOut size={18} /> Logout
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
