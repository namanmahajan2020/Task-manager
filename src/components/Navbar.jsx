import React, { useEffect, useState } from 'react';
import { signInWithPopup, signOut, onAuthStateChanged } from "firebase/auth";
import { auth, provider } from "../firebaseConfig";
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { MoreVertical } from 'lucide-react'; // 3 dots icon

const Navbar = () => {
  const [user, setUser] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      console.log("User signed in:", user);

      const response = await fetch("http://localhost:5000/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: user.displayName,
          email: user.email
        })
      });

      const data = await response.json();
      console.log("Server Response:", data);

      alert(`Welcome, ${user.displayName}!`);
    } catch (error) {
      console.error("Google Sign-In Error:", error);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      setMenuOpen(false);
      navigate('/');
      setMenuOpen(false);
      navigate('/');
    } catch (error) {
      console.error("Sign-Out Error:", error);
    }
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="flex flex-col md:flex-row justify-between items-center bg-gradient-to-r from-violet-800 to-purple-900 text-white py-4 px-4 md:py-2 md:px-8 shadow-lg relative">
      {/* Logo */}
      <div className="flex items-center gap-2">
        <Link to="/" className="text-2xl font-bold hover:text-violet-200 transition-all duration-200">
          iTask
        </Link>
      </div>
      {/* Middle Nav Links (only after sign in) */}
      {user && (
        <div className="flex items-center gap-8 mt-4 md:mt-0">
          <Link
            to="/"
            className={`text-md font-medium hover:text-violet-300 ${isActive("/") ? "font-bold underline" : ""}`}
          >
            Home
          </Link>
          <Link
            to="/teams"
            className={`text-md font-medium hover:text-violet-300 ${isActive("/teams") ? "font-bold underline" : ""}`}
          >
            Teams
          </Link>
          <Link
            to="/profile"
            className={`text-md font-medium hover:text-violet-300 ${isActive("/profile") ? "font-bold underline" : ""}`}
          >
            Profile
          </Link>
          <Link
            to="/About"
            className={`text-md font-medium hover:text-violet-300 ${isActive("/About") ? "font-bold underline" : ""}`}
          >
            About
          </Link>
        </div>
      )}

      {/* Right side */}
      <div className="flex items-center gap-4 relative mt-4 md:mt-0">
        {!user ? (
          <button
            onClick={handleGoogleSignIn}
            className="text-md font-medium bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded transition-all duration-300 shadow"
          >
            Sign In
          </button>
        ) : (
          <div className="flex items-center gap-3 relative">
            {/* Profile name and image */}
            <div className="relative group">
              <Link to="/profile" className="flex items-center gap-2">
                <span className="hidden md:block font-medium hover:underline transition">
                  {user.displayName?.split(" ")[0]}
                </span>
                <img
                  src={user.photoURL || "https://cdn-icons-png.flaticon.com/512/149/149071.png"}
                  alt="Profile"
                  className="w-10 h-10 rounded-full object-cover border-2 border-white group-hover:scale-110 transition-transform duration-200 cursor-pointer"
                />
              </Link>

              {/* Tooltip */}
              <div className="absolute top-12 left-1/2 -translate-x-1/2 bg-white text-gray-800 text-sm px-3 py-1 rounded shadow opacity-0 group-hover:opacity-100 transition-all duration-200 z-10 whitespace-nowrap">
                {user.displayName}
              </div>
            </div>

            {/* 3-dots button */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="focus:outline-none text-white hover:text-violet-300 transition-all"
            >
              <MoreVertical size={24} />
            </button>

            {/* Dropdown Menu */}
            {menuOpen && (
              <div className="absolute right-0 top-14 w-48 bg-white rounded-md shadow-lg py-2 z-50 animate-fade-in">
                <Link
                  to="/profile"
                  onClick={() => setMenuOpen(false)}
                  className={`block px-4 py-2 text-sm text-gray-700 hover:bg-violet-100 hover:text-violet-800 ${isActive("/profile") ? "font-bold" : ""}`}
                >
                  Profile
                </Link>
                <Link
                  to="/"
                  onClick={() => setMenuOpen(false)}
                  className={`block px-4 py-2 text-sm text-gray-700 hover:bg-violet-100 hover:text-violet-800 ${isActive("/") ? "font-bold" : ""}`}
                >
                  Home
                </Link>
                <Link
                  to="/teams"
                  onClick={() => setMenuOpen(false)}
                  className={`block px-4 py-2 text-sm text-gray-700 hover:bg-violet-100 hover:text-violet-800 ${isActive("/teams") ? "font-bold" : ""}`}
                >
                  Teams
                </Link>
                <Link
                  to="/About"
                  onClick={() => setMenuOpen(false)}
                  className={`block px-4 py-2 text-sm text-gray-700 hover:bg-violet-100 hover:text-violet-800 ${isActive("/About") ? "font-bold" : ""}`}
                >
                  About
                </Link>
                <button
                  onClick={handleSignOut}
                  className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-red-100 hover:text-red-600"
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;