import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sun, Moon } from 'lucide-react';

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle('dark');
  };

  const handleNavigation = (path) => {
    navigate(path);
    setIsMenuOpen(false); // Close the menu after navigation
  };

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-md p-4 sticky top-0 z-40 transition-colors duration-300">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
          <button onClick={() => handleNavigation('/Landing')}>MediConnect</button>
        </h1>
        <div className="flex items-center">
          <button
            onClick={toggleTheme}
            className="mr-4 p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 transition-colors duration-300"
          >
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <button onClick={toggleMenu} className="text-gray-700 dark:text-gray-100 hover:text-blue-500 dark:hover:text-blue-400 transition duration-300 md:hidden">
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </button>
        </div>
        <ul className={`md:flex ${isMenuOpen ? "block" : "hidden"} absolute md:relative top-16 md:top-0 left-0 right-0 bg-white dark:bg-gray-800 md:bg-transparent shadow-md md:shadow-none`}>
          <li className="md:ml-6 mt-2 md:mt-0">
            <button
              onClick={() => handleNavigation('/PrescriptionAnalyzer')}
              className="block py-2 md:py-0 px-4 md:px-0 text-gray-700 dark:text-gray-100 hover:text-blue-500 dark:hover:text-blue-400 transition duration-300"
            >
              RxAnalyzer
            </button>
          </li>
          <li className="md:ml-6 mt-2 md:mt-0">
            <button
              onClick={() => handleNavigation('/DrugCostOptimizer')}
              className="block py-2 md:py-0 px-4 md:px-0 text-gray-700 dark:text-gray-100 hover:text-blue-500 dark:hover:text-blue-400 transition duration-300"
            >
              CostOptimizer
            </button>
          </li>
          <li className="md:ml-6 mt-2 md:mt-0">
            <button
              onClick={() => handleNavigation('/SeriousMedications')}
              className="block py-2 md:py-0 px-4 md:px-0 text-gray-700 dark:text-gray-100 hover:text-blue-500 dark:hover:text-blue-400 transition duration-300"
            >
              DrugWatch
            </button>
          </li>
          <li className="md:ml-6 mt-2 md:mt-0">
            <button
              onClick={() => handleNavigation('/meded')}
              className="block py-2 md:py-0 px-4 md:px-0 text-gray-700 dark:text-gray-100 hover:text-blue-500 dark:hover:text-blue-400 transition duration-300"
            >
              MedEd
            </button>
          </li>
          <li className="md:ml-6 mt-2 md:mt-0">
            <button
              onClick={() => handleNavigation('/chatbot')}
              className="block py-2 md:py-0 px-4 md:px-0 text-gray-700 dark:text-gray-100 hover:text-blue-500 dark:hover:text-blue-400 transition duration-300"
            >
              MED-AI
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
};
