// FavMovie.jsx
// Renders a single page view of a favortie movie
// Interacts with Firestore to add and remove favorite movies from a users favorites collection

// Hooks
import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext.jsx';
// React Router
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
// Firebase
import { doc, setDoc, onSnapshot, deleteDoc } from 'firebase/firestore';
import { db } from '../firebase/firebase-config';
// Styles
import { IoIosArrowBack } from 'react-icons/io';
import { getStars } from '../utils/getStars';
import placeholderImage from '../assets/placeholder.jpg';
import { FaRegHeart, FaHeart } from 'react-icons/fa6';
import { toast } from 'react-toastify';
import { YouTubePlayer } from '../utils/YouTubePlayer';

function FavMovie() {
  // State to hold if the movie is favorited or not
  const [isFav, setIsFav] = useState(true);
  // Destructure the user state
  const { user } = useAuth();
  // Retrieve the movie data
  const location = useLocation();
  const movie = location.state?.movie;

  // Set up navigation
  const navigate = useNavigate();
  // Called when the user clicks the back arrow
  const handleBackClick = () => {
    // Navigate to the previous page
    navigate(-1);
  };

  // Add a movie to a users favorites collection in firestore
  const addFav = async () => {
    // If there's no user logged in return
    if (!user) return;
    // Create a reference to the new movie
    const movieRef = doc(
      db,
      'users',
      user.uid,
      'favorites',
      movie.id.toString()
    );
    // Attempt to add the movie to firestore
    try {
      await setDoc(movieRef, {
        title: movie.title,
        release: movie.release,
        rating: movie.rating,
        overview: movie.overview,
        coverUrl: movie.coverUrl,
        videoURL: movie.videoURL ? movie.videoURL : null,
      });
      // toast.success('Movie added to your favorites! 🎬✨');
      setIsFav(true);
    } catch (error) {
      toast.error(
        'Something went wrong while adding the movie to your favorites. Please try again.'
      );
      console.error('Error adding movie: ', error);
    }
  };

  // Remove a movie from a users favorites collection in firestore
  const removeFav = async () => {
    // If there's no user logged in return
    if (!user) return;
    // Create a reference to the movie
    const movieRef = doc(
      db,
      'users',
      user.uid,
      'favorites',
      movie.id.toString()
    );
    // Attempt to delete the movie in firestore
    try {
      await deleteDoc(movieRef);
      // toast.success('Movie removed from your favorites!');
      setIsFav(false);
    } catch (error) {
      toast.error(
        'Something went wrong while removing the movie from your favorites. Please try again.'
      );
      console.error('Error adding movie: ', error);
    }
  };

  // Fire the onSnapshot listener to see if the movie is favorited or not (if the user is logged in)
  useEffect(() => {
    if (user) {
      // Create a reference to the movie we're checking
      const movieRef = doc(
        db,
        'users',
        user.uid,
        'favorites',
        movie.id.toString()
      );

      // Start listening for changes to the movie document
      const unsubscribe = onSnapshot(movieRef, (docSnap) => {
        // If the document exists then the movie is a favorite
        setIsFav(docSnap.exists());
      });

      // Stop listening when the component unmounts
      return () => {
        unsubscribe();
      };
    }
  }, [movie.id, user]);

  return (
    <div>
      <div className="py-5 px-3 md:pt-12 md:pb-0 md:px-20">
        <div
          onClick={handleBackClick}
          className="cursor-pointer w-8"
          role="button"
          tabIndex="0"
          aria-label="Go back"
        >
          <IoIosArrowBack color="#FF424F" className="w-6 h-6 md:w-10 md:h-10" />
        </div>
        <div className="my-4 mx-6 md:mt-6 md:mx-16 text-white">
          <div className="flex items-center md:items-start">
            <div className="flex flex-col md:flex-row md:items-center mb-4 md:mb-6">
              {/* Title */}
              <h1 className="m-0 font-semibold text-xl md:text-2xl">
                {movie.title}
              </h1>
              {/* Release */}
              <p className="text-base md:text-lg md:ml-3 text-[#6d8a9d]">
                {movie.release}
              </p>
              {/* Stars */}
              <div className="text-[10px] flex gap-1 md:ml-3">
                {getStars(movie.rating, 17)}
              </div>
            </div>
            {/* Display a heart if the user is logged in */}
            {/* Display full heart if the user favorited the movie, empty heart if not */}
            {isFav ? (
              <button
                onClick={removeFav}
                className="ml-auto cursor-pointer"
                aria-label="Remove from favorites"
              >
                <FaHeart color="#FF424F" className="w-6 h-6 md:w-7 md:h-7" />
              </button>
            ) : (
              <button
                onClick={addFav}
                className="ml-auto cursor-pointer"
                aria-label="Add to favorites"
              >
                <FaRegHeart color="#FF424F" className="w-6 h-6 md:w-7 md:h-7" />
              </button>
            )}
          </div>
          <div className="flex flex-col  md:flex-row items-center mb-6 gap-4">
            {/* Cover image */}
            <img
              src={movie.coverUrl ? movie.coverUrl : placeholderImage}
              alt={`Cover image for ${movie.title}`}
              className="w-full md:w-[19rem] md:h-[460px] shadow-lg rounded-sm"
            />
            {/* Trailer */}
            {movie.videoURL ? YouTubePlayer(movie.videoURL) : null}
          </div>
          {/* Overview */}
          <p className="pb-6 font-light text-white text-lg leading-7">
            {movie.overview}
          </p>
        </div>
      </div>
    </div>
  );
}

export default FavMovie;
