// App.jsx
// Contains the main application component which renders the entire UI
// Manages React Router, global state with useContext, and makes features like Toast notifications,
// the user menu, and the auth modal available globally throughout the app

// Pages / Components
import Home from './pages/Home.jsx';
import Movie from './pages/Movie.jsx';
import NotFound from './pages/NotFound.jsx';
import Favorites from './pages/Favorites.jsx';
import AuthModal from './components/AuthModal.jsx';
import UserMenu from './components/UserMenu.jsx';
import FavMovie from './pages/FavMovie.jsx';
import ScrollToTop from './components/ScrollToTop.jsx';
// Hooks
import { useEffect, useReducer, useState } from 'react';
// Contexts
import { MoviesContext } from './contexts/MoviesContext.js';
import { AuthModalContext } from './contexts/AuthModalContext.js';
import { UserMenuContext } from './contexts/UserMenuContext.js';
// React Router
import { BrowserRouter, Routes, Route } from 'react-router-dom';
// Toast
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Reducer function to handle the state actions related to movie data
function reducer(state, action) {
  switch (action.type) {
    case 'setMovies':
      // Set the state to hold the movie data we passed the redcer function
      return action.movieData;
    default:
      console.log('Action type not recognized:', action.type);
      return state;
  }
}

function App() {
  // State to hold movies the user has searched for and dispatch to call the reducer function
  const [movies, dispatch] = useReducer(reducer, []);
  // State to hold auth modal
  const [showAuthModal, setShowAuthModal] = useState(false);
  // State to hold user menu
  const [showUserMenu, setShowUserMenu] = useState(false);

  // Disable scrolling when the modal is showing
  useEffect(() => {
    if (showAuthModal) {
      // Prevent scroll
      document.body.style.overflow = 'hidden';
      // Prevent touch scroll on mobile
      document.body.style.touchAction = 'none';
    } else {
      // Enable scroll
      document.body.style.overflow = 'auto';
      // Reset touch action
      document.body.style.touchAction = 'auto';
    }

    // Cleanup function to reset styles when modal is closed
    return () => {
      document.body.style.overflow = 'auto';
      document.body.style.touchAction = 'auto';
      // Scroll to the top of the page when the model closes
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };
  });

  // Update sessionStorage with movie data when movies state changes
  useEffect(() => {
    // Only update when new movies are set
    if (movies.length > 0) {
      sessionStorage.setItem('movies', JSON.stringify(movies));
    }
  }, [movies]);

  return (
    <>
      {/* Toast notification are available to the entire app */}
      <ToastContainer
        position="bottom-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        pauseOnHover
        draggable
      />
      {/* Provide the movies state and dispatch function */}
      <MoviesContext.Provider value={{ movies, dispatch }}>
        {/* Provide the showAuthModal state */}
        <AuthModalContext.Provider value={{ showAuthModal, setShowAuthModal }}>
          {/* Provide the showUserMenu state */}
          <UserMenuContext.Provider value={{ showUserMenu, setShowUserMenu }}>
            {/* Set up React Router */}
            <BrowserRouter>
              <ScrollToTop />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/movie/:movieId" element={<Movie />} />
                <Route path="/favorites" element={<Favorites />} />
                <Route path="/favorite" element={<FavMovie />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
              {/* The user menu is available to the entire app */}
              <div className={`${showUserMenu ? 'block' : 'hidden'}`}>
                <UserMenu />
              </div>
              {/* The modal is available to the entire app */}
              <div
                onClick={() => setShowAuthModal(false)}
                // Create a blur effect on the rest of the screen outside of the modal
                className={`${
                  showAuthModal ? 'block' : 'hidden'
                } fixed inset-0 backdrop-blur-xs`}
              >
                <div
                  // Prevent clicking on the modal from closing the modal
                  onClick={(e) => e.stopPropagation()}
                >
                  <AuthModal />
                </div>
              </div>
            </BrowserRouter>
          </UserMenuContext.Provider>
        </AuthModalContext.Provider>
      </MoviesContext.Provider>
    </>
  );
}

export default App;
