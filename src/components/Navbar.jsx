import React from 'react';
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../firebaseConfig"; // Adjust the path as necessary

const Navbar = () => {
  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
  
      console.log("User signed in:", user);
      alert(`Welcome, ${user.displayName}!`);
    } catch (error) {
      console.error("Google Sign-In Error:", error);
    }
  };
  return (
    <nav className="flex flex-col md:flex-row justify-between items-center bg-gradient-to-r from-violet-800 to-purple-900 text-white py-4 px-4 md:py-2 md:px-8 shadow-lg">
      <div className="logo mb-2 md:mb-0">
        <span className="font-bold text-xl md:text-2xl">iTask</span>
      </div>
      <ul className="flex flex-row justify-between gap-4 md:gap-8 text-center md:text-left">
        {/* <li className="cursor-pointer hover:font-bold transition-all hover:text-violet-200">Home</li>
        <li className="cursor-pointer hover:font-bold transition-all hover:text-violet-200">Your Tasks</li> */}
        <div className="flex justify-center">
      <button onClick={handleGoogleSignIn} className="bg-gradient-to-r from-blue-500 hover:from-red-800 to-blue-300 cursor-pointer text-white font-bold py-2 px-4 rounded shadow">
        Sign in with Google
      </button>
    </div>
      </ul>
    </nav>
  );
};

export default Navbar;