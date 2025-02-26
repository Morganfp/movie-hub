// UserMenu.jsx
// Renders a user menu with buttons for fvorites and logout

// Hooks
import { useAuth } from '../contexts/AuthContext.jsx';
import { useContext, useEffect } from 'react';
// Contexts
import { UserMenuContext } from '../contexts/UserMenuContext.js';
// React Router
import { useNavigate } from 'react-router-dom';
// Styles
import { CiHeart } from 'react-icons/ci';
import { CiLogout } from 'react-icons/ci';
import { toast } from 'react-toastify';

function UserMenu() {
  // Destructure the UserMenuContext context
  const { setShowUserMenu } = useContext(UserMenuContext);
  // Destructure the logout auth function
  const { logout } = useAuth();

  // Set up navigation
  const navigate = useNavigate();

  // Close user menu on any click or scroll
  useEffect(() => {
    const closeMenu = (event) => {
      // Prevent closing if the user clicked the button that opens the menu
      if (event.target.closest('.user-menu-button')) {
        return; // Do nothing if clicked inside the menu button
      }
      setShowUserMenu(false); // Close menu if clicked outside
    };

    const closeMenuOnScroll = () => {
      setShowUserMenu(false); // Close the menu if the user scrolls
    };

    // Add event listeners for click and scroll
    document.addEventListener('click', closeMenu);
    window.addEventListener('scroll', closeMenuOnScroll);

    // Cleanup event listeners on component unmount
    return () => {
      document.removeEventListener('click', closeMenu);
      window.removeEventListener('scroll', closeMenuOnScroll);
    };
  }, [setShowUserMenu]);

  // Handle the user clicking the logout button
  const handleLogout = async () => {
    try {
      // Call the Firebase auth function to log the user out
      await logout();
      // Navigate to the home page
      navigate('/');
      toast.success('You have been logged out successfully.');
    } catch (error) {
      toast.error('Something went wrong. Please try again.');
    }
  };

  return (
    <nav
      className="fixed z-50 top-16 md:top-26 right-0 w-[35%] md:w-[13%] h-28 md:h-34 bg-white flex flex-col justify-evenly rounded-bl"
      aria-label="User menu"
    >
      <button
        onClick={() => {
          setShowUserMenu(false);
          navigate('/favorites');
        }}
        className="w-full flex items-center justify-center gap-2 p-3 text-left cursor-pointer"
        aria-label="Go to Favorites"
        role="menuitem"
      >
        <CiHeart className="w-4.5 h-4.5 md:w-8 md:h-8" color="#FF424F" />
        <h1 className="text-[#4C4B4E] text-sm font-semibold">Favorites</h1>
      </button>
      <hr className="border-t-1 border-gray-300 w-full" />
      <button
        onClick={handleLogout}
        className="w-full flex items-center justify-center gap-2 p-3 text-left cursor-pointer"
        aria-label="Log out"
        role="menuitem"
      >
        <CiLogout className="w-4.5 h-4.5 md:w-8 md:h-8" color="#FF424F" />
        <h1 className="text-[#4C4B4E] text-sm font-semibold">Logout</h1>
      </button>
    </nav>
  );
}

export default UserMenu;
