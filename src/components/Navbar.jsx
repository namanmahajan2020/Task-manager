import React, { useEffect, useState } from 'react';
import { signInWithPopup, signOut, onAuthStateChanged } from "firebase/auth";
import { auth, provider } from "../firebaseConfig";
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleGoogleSignIn = async () => {
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("Google Sign-In Error:", error);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Sign-Out Error:", error);
    }
  };

  return (
    <nav className="flex flex-col md:flex-row justify-between items-center bg-gradient-to-r from-violet-800 to-purple-900 text-white py-4 px-4 md:py-2 md:px-8 shadow-lg">
      <div className="logo mb-2 md:mb-0">
        <Link to="/" className="font-bold text-xl md:text-2xl hover:text-violet-200 transition">iTask</Link>
      </div>

      <ul className="flex flex-row justify-between gap-6 items-center">
        {/* Teams Page Link */}
        <li>
          <Link to="/teams" className="text-white font-medium hover:underline hover:text-violet-300 transition">
            Teams
          </Link>
        </li>

        {/* Auth Button */}
        <li>
          {user ? (
            <button
              onClick={handleSignOut}
              className="bg-gradient-to-r from-red-500 to-red-400 hover:from-red-600 hover:to-red-500 px-4 py-2 rounded shadow font-semibold"
            >
              Sign Out
            </button>
          ) : (
            <button
              onClick={handleGoogleSignIn}
              className="bg-gradient-to-r from-blue-500 to-blue-400 hover:from-blue-600 hover:to-blue-500 px-4 py-2 rounded shadow font-semibold"
            >
              Sign in with Google
            </button>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
