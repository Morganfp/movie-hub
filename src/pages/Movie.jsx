// Movie.jsx
// Renders a single page view of a movie
// Fetches a video (trailer or clip) from the TMDB API
// Interacts with Firestore to add and remove favorite movies from a users favorites collection

// Hooks
import { useEffect, useState, useContext } from 'react';
import { useAuth } from '../contexts/AuthContext.jsX';
// React Router
import { useParams, useNavigate } from 'react-router-dom';
// Axios
import axios from 'axios';
// Firebase
import { doc, setDoc, onSnapshot, deleteDoc } from 'firebase/firestore';
import { db } from '../firebase/firebase-config';
// TMDB API Key
const apiKey = import.meta.env.VITE_MOVIES_API_KEY;
// Contexts
import { MoviesContext } from '../contexts/MoviesContext';
// Styles
import { IoIosArrowBack } from 'react-icons/io';
import { getStars } from '../utils/getStars';
import { FaRegHeart, FaHeart } from 'react-icons/fa6';
import { toast } from 'react-toastify';
import placeholderImage from '../assets/placeholder.jpg';
import { YouTubePlayer } from '../utils/YouTubePlayer';

function Movie() {
  // State to hold the current movie the user is viewing viewing
  const [movieInfo, setMovieInfo] = useState({});
  // State to hold the movie video
  const [movieVideo, setMovieVideo] = useState({});
  // State to hold if the movie is favorited or not
  const [isFav, setIsFav] = useState(false);
  // Destructure the MoviesContext
  const { movies } = useContext(MoviesContext);
  // Destructure the user state
  const { user } = useAuth();
  // Destructure the movieId from the param
  const { movieId } = useParams();

  // Set up navigation
  const navigate = useNavigate();
  // Called when the user clicks the back arrow
  const handleBackClick = () => {
    // Navigate to the previous page
    navigate(-1);
  };

  // Update the movieInfo state
  useEffect(() => {
    // If the movies state has any movies, look for the movie we're viewing there
    // Else look in session storage (if the user refreshes the page, we can find the movie info in session storage)
    setMovieInfo(
      movies.length > 0
        ? movies.find((movie) => Number(movie.id) === Number(movieId))
        : JSON.parse(sessionStorage.getItem('movies')).find(
            (movie) => Number(movie.id) === Number(movieId)
          )
    );
  }, [movies]);

  // Fetch the movie video (trailer or clip)
  useEffect(() => {
    const fetchMovieVideo = async () => {
      try {
        // Use axios to fetch the movie media links
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${apiKey}`
        );
        const data = response.data;
        let videoObj;

        if (data.results.length > 0) {
          // Extract the first object in the response array that has 'YouTube' as the .site and 'Trailer' as the .type
          //  If none is found then extract the object that has 'YouTube' as the .site
          // If none is found, return undefined as there is no YouTube video
          videoObj =
            data.results.find(
              (video) => video.site === 'YouTube' && video.type === 'Trailer'
            ) ||
            data.results.find((video) => video.site === 'YouTube') ||
            undefined;
        }
        setMovieVideo({
          link: videoObj.key,
          type: videoObj.type === 'Trailer' ? 'trailer' : 'clip',
        });
      } catch (err) {
        if (err.response) {
          // The request was made and the server responded with an error
          console.log('Response error:', err.response);
        } else if (err.request) {
          // The request was made and the server responded with an error
          console.log('Request error:', err.request);
        } else {
          // Something else happened
          console.log('Error:', err);
        }
      }
    };
    fetchMovieVideo();
  }, [movieId]);

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
      movieId.toString()
    );
    // Attempt to add the movie to firestore
    try {
      await setDoc(movieRef, {
        title: movieInfo.title,
        release: movieInfo.release,
        rating: movieInfo.rating,
        overview: movieInfo.overview,
        coverUrl: movieInfo.coverUrl,
        videoURL: movieVideo.link
          ? `https://www.youtube.com/embed/${movieVideo.link}`
          : null,
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
      movieId.toString()
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
        movieId.toString()
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
  }, [movieId, user]);

  return (
    <>
      <div>
        <div className="py-5 px-3 md:pt-12 md:pb-0 md:px-20">
          <div onClick={handleBackClick} className="cursor-pointer w-8">
            <IoIosArrowBack
              color="#FF424F"
              className="w-6 h-6 md:w-10 md:h-10"
            />
          </div>
          <div className="my-4 mx-6 md:mt-6 md:mx-16 text-white">
            <div className="flex items-center md:items-start">
              <div className="flex flex-col md:flex-row md:items-center mb-4 md:mb-6">
                {/* Title */}
                <h1 className="m-0 font-semibold text-xl md:text-2xl">
                  {movieInfo.title}
                </h1>
                {/* Release */}
                <p className="text-base md:text-lg md:ml-3 text-[#6d8a9d]">
                  {movieInfo.release}
                </p>
                {/* Stars */}
                <div className="text-[10px] flex gap-1 md:ml-3">
                  {getStars(movieInfo.rating, 17)}
                </div>
              </div>
              {/* Display a heart if the user is logged in */}
              {/* Display full heart if the user favorited the movie, empty heart if not */}
              {user &&
                (isFav ? (
                  <button
                    onClick={removeFav}
                    className="ml-auto cursor-pointer"
                  >
                    <FaHeart
                      color="#FF424F"
                      className="w-6 h-6 md:w-7 md:h-7"
                    />
                  </button>
                ) : (
                  <button onClick={addFav} className="ml-auto cursor-pointer">
                    <FaRegHeart
                      color="#FF424F"
                      className="w-6 h-6 md:w-7 md:h-7"
                    />
                  </button>
                ))}
            </div>
            <div className="flex flex-col  md:flex-row items-center mb-6 gap-4">
              {/* Cover image */}
              <img
                src={movieInfo.coverUrl ? movieInfo.coverUrl : placeholderImage}
                alt={movieInfo.title}
                className="w-full md:w-[19rem] md:h-[460px] shadow-lg rounded-sm"
              />
              {/* Trailer */}
              {movieVideo.link
                ? YouTubePlayer(
                    `https://www.youtube.com/embed/${movieVideo.link}`
                  )
                : null}
            </div>
            {/* Overview */}
            <p className="pb-6 font-light text-white text-lg leading-7">
              {movieInfo.overview}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Movie;
