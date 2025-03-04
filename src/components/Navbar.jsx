import React from 'react';

const Navbar = () => {
  return (
    <nav className="flex flex-col md:flex-row justify-between items-center bg-gradient-to-r from-violet-800 to-purple-900 text-white py-4 px-4 md:py-2 md:px-8 shadow-lg">
      <div className="logo mb-2 md:mb-0">
        <span className="font-bold text-xl md:text-2xl">iTask</span>
      </div>
      <ul className="flex flex-row justify-between gap-4 md:gap-8 text-center md:text-left">


        <li className="cursor-pointer hover:font-bold transition-all hover:text-violet-200">Home</li>
        <li className="cursor-pointer hover:font-bold transition-all hover:text-violet-200">Your Tasks</li>
      </ul>
    </nav>
  );
};

export default Navbar;
