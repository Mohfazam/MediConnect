import { useState } from "react"
import { Sun, Moon } from "lucide-react"

export const Navbar = ({ darkMode, toggleDarkMode }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-md p-4 sticky top-0 z-40 transition-colors duration-300">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold text-blue-600 dark:text-blue-400">MediConnect</h1>
        <div className="flex items-center">
          <button
            onClick={toggleDarkMode}
            className="mr-4 p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 transition-colors duration-300"
          >
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <div className="md:hidden">
            <button onClick={toggleMenu} className="focus:outline-none text-blue-600 dark:text-blue-400">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            </button>
          </div>
          <ul
            className={`md:flex ${isMenuOpen ? "block" : "hidden"} absolute md:relative top-16 md:top-0 left-0 right-0 bg-white dark:bg-gray-800 md:bg-transparent shadow-md md:shadow-none`}
          >
            {["Home", "Features", "How It Works", "Testimonials", "FAQ"].map((item) => (
              <li key={item} className="md:ml-6 mt-2 md:mt-0">
                <a
                  href={`#${item.toLowerCase().replace(" ", "-")}`}
                  className="block py-2 md:py-0 px-4 md:px-0 hover:text-blue-500 dark:hover:text-blue-400 transition duration-300"
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  )
}

