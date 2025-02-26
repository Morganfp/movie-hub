// Header.jsx
// Renders the header which contains the logo, movie search bar, and user icon or user menu icon

// Components
import SearchBar from './SearchBar.jsx';
// Hooks
import { useContext } from 'react';
import { useAuth } from '../contexts/AuthContext.jsx';
// Contexts
import { AuthModalContext } from '../contexts/AuthModalContext.js';
import { UserMenuContext } from '../contexts/UserMenuContext.js';
// Styles
import { GiHut } from 'react-icons/gi';
import { IoMenu } from 'react-icons/io5';
import { FaUserCircle } from 'react-icons/fa';
// React Royer
import { useLocation, useNavigate } from 'react-router-dom';

function Header() {
  // Destructure the user state
  const { user } = useAuth();
  // Destructure the AuthModalContext
  const { setShowAuthModal } = useContext(AuthModalContext);
  // Destructure the UserMenuContext
  const { setShowUserMenu } = useContext(UserMenuContext);

  // Set up navigation
  const navigate = useNavigate();
  // Get current route information
  const location = useLocation();

  // When the user clicks the logo, clear session storage and reload the page or navigate to the home page
  const handleClick = (event) => {
    event.preventDefault();
    sessionStorage.clear();
    if (location.pathname === '/') {
      // Reload the page if we're on the home page to clear the current movie list
      window.location.reload();
    } else {
      // Navigate to the home page
      navigate('/');
    }
  };

  return (
    <>
      <div className="text-white bg-[#FF424F] py-4 px-5 md:py-8 md:px-20 flex items-center md:gap-12 justify-between">
        <div
          onClick={handleClick}
          className="flex items-center gap-1 md:gap-2 cursor-pointer"
        >
          <GiHut className="w-6 h-6 md:w-10 md:h-10" alt="Movie Hut Logo" />
          <h1
            className="font-semibold text-lg md:text-2xl m-0"
            style={{ fontFamily: "'Cabin', sans-serif" }}
            aria-label="Movie Hut Logo"
          >
            Movie Hut
          </h1>
        </div>
        <div className="md:ml-auto">
          <SearchBar />
        </div>
        <div>
          {/* If the user is logged in, display the menu icon which triggers the menu sidebar */}
          {/* else display the user icon which triggers the auth modal */}
          {user ? (
            <IoMenu
              onClick={(e) => {
                e.stopPropagation();
                setShowUserMenu((prev) => !prev);
              }}
              className="w-6 h-6 md:w-10 md:h-10 cursor-pointer user-menu-button"
              aria-label="Open user menu"
            />
          ) : (
            <FaUserCircle
              onClick={() => setShowAuthModal((prev) => !prev)}
              className="w-6 h-6 md:w-10 md:h-10 cursor-pointer"
              aria-label="Open authentication modal"
            />
          )}
        </div>
      </div>
    </>
  );
}

export default Header;
