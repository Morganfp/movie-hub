// Favorites.jsx
// Renders the list of movies the user has favorited

// Components
import Header from '../components/Header';
import MovieItem from '../components/MovieItem';
// Hooks
import { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
// Firebase
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase/firebase-config';
// React Router
import { useNavigate } from 'react-router-dom';
// Styles
import { FaHeart } from 'react-icons/fa6';
import { GiBrokenHeart } from 'react-icons/gi';
import PulseLoader from 'react-spinners/PulseLoader';

function Favorites() {
  // State to hold favorite movies
  const [favMovies, setFavMovies] = useState([]);
  // Loading state
  const [loading, setLoading] = useState(true);
  // Destructure the user state from useAuth
  const { user } = useAuth();

  // Set up navigation
  const navigate = useNavigate();

  // Get the users favorite movies on component mount
  useEffect(() => {
    const getMovies = async () => {
      // If there's no user logged in return
      if (!user) return;
      // Create a reference to the users favorites collection
      const favoritesRef = collection(db, 'users', user.uid, 'favorites');
      // Store the data inside the collection
      const querySnapshot = await getDocs(favoritesRef);
      // Set the favMovies state to the data inside the collection
      setFavMovies(
        querySnapshot.docs.map((doc) => ({
          // Document ID (movie ID)
          id: doc.id,
          // Movie data
          ...doc.data(),
        }))
      );
      // Set loading to false when the favorites have been fetched
      setLoading(false);
    };
    getMovies();
  }, [user]); // Run the function when user is set by Firebase

  return (
    <>
      <Header />
      <div className="py-12 px-6 md:py-16 md:px-28">
        {loading ? (
          <div className="flex justify-center" aria-live="polite">
            <PulseLoader color="#fff" />
          </div>
        ) : favMovies.length > 0 ? (
          <>
            <div className="flex items-center gap-2 mb-6 md:mb-9 justify-center">
              <h1 className="text-white text-2xl md:text-2xl font-semibold">
                My Favorites
              </h1>
              <FaHeart
                color="#FF424F"
                className="w-5 h-5 md:w-7 md:h-7"
                aria-hidden="true"
              />
            </div>
            <div className="flex gap-14 md:gap-20 flex-wrap justify-center">
              {favMovies.length > 0 &&
                favMovies.map((movie) => (
                  <span key={movie.id}>
                    <div
                      onClick={() =>
                        navigate('/favorite', { state: { movie } })
                      }
                      className="cursor-pointer"
                      role="button"
                      tabIndex="0"
                      aria-label={`View details for ${movie.title}`}
                    >
                      <MovieItem movie={movie} />
                    </div>
                  </span>
                ))}
            </div>
          </>
        ) : (
          <div
            className="flex items-center gap-2 mb-6 md:mb-9 justify-center"
            aria-live="polite"
          >
            <h1 className="text-white text-2xl md:text-2xl font-semibold">
              No favorites yet
            </h1>
            <GiBrokenHeart
              color="#FF424F"
              className="w-5 h-5 md:w-7 md:h-7"
              aria-hidden="true"
            />
          </div>
        )}
      </div>
    </>
  );
}

export default Favorites;
