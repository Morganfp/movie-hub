// SearchBar.jsx
// Renders an input box with a search icon
// Fetches movies from the TMDB API and updates the global movies state

// Hooks
import { useState, useContext, useRef } from 'react';
// Contexts
import { MoviesContext } from '../contexts/MoviesContext.js';
// Axios
import axios from 'axios';
// TMDB API key
const apiKey = import.meta.env.VITE_MOVIES_API_KEY;
// React Router
import { useLocation, useNavigate } from 'react-router-dom';
// Styles
import { IoSearch } from 'react-icons/io5';
import { toast } from 'react-toastify';

function SearchBar() {
  // Destructure the MoviesContext
  const { movies, dispatch } = useContext(MoviesContext);
  // Ref for the input box
  const inputRef = useRef(null);
  // State for the user input
  const [input, setInput] = useState('');

  // Set up navigation
  const navigate = useNavigate();
  // Get current route information
  const location = useLocation();

  // Update the input as the user tes
  const handleChange = (event) => {
    setInput(event.target.value);
  };

  // Fetch movies from themoviedb api
  const handleSubmit = async (event) => {
    event.preventDefault();
    // Manually dismiss the keyboard by blurring the input field
    inputRef.current.blur();
    // If the user has not entered any input return
    if (!input) {
      return;
    }
    // Navigate to the home page if the user isn't on it
    if (location !== '/') {
      navigate('/');
    }
    // Attept to fetch the movies based off the user input
    try {
      // Use axios to fetch the movie data
      const response = await axios.get(
        `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${input}`,
        {
          headers: {
            Authorization: `Bearer ${apiKey}`,
            'Content-Type': 'application/json',
          },
        }
      );
      // Extract the data from the response
      const data = response.data;
      // If the response contains no movie data, the movie wasn't found
      if (data.results.length === 0) {
        setInput('');
        toast.error("Couldn't find that movie, try another");
        return;
      }
      // Iterate over the first 'page' of returned movies (maximum of 20)
      // Create a movieData array to hold the movie objects containing movie id, title, coverURL (poster image), release date, rating, and overview
      const movieData = data.results.map((movie) => ({
        id: movie.id,
        title: movie.title,
        coverUrl: movie.poster_path
          ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
          : null,
        release: movie.release_date
          ? movie.release_date.split('-').shift()
          : '-',
        // Convert the returned 1-10 rating to a 1-5 rating
        rating: Math.round((movie.vote_average / 2) * 2) / 2,
        overview: movie.overview,
      }));
      // Clear search bar input
      setInput('');
      // Call the dispatch function with an array of movie data to update the movies state
      dispatch({ type: 'setMovies', movieData });
    } catch (err) {
      setInput('');
      toast.error(
        "We're experiencing issues right now. Please try again later."
      );
      if (err.response) {
        // The request was made and the server responded with an error
        console.error('Response error:', err.response.data);
      } else if (err.request) {
        // The request was made but no response was received
        console.error('Request error:', err.request);
      } else {
        // Something else happened
        console.error('Error:', err.message);
      }
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="relative">
        <button
          type="submit"
          className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500 bg-none border-none flex"
        >
          <IoSearch size={15} />
        </button>
        <input
          id="searchInput"
          onChange={handleChange}
          type="text"
          value={input}
          ref={inputRef}
          placeholder="Search"
          className="bg-white text-black border-none rounded-lg py-1 px-7 w-37 md:py-1.5 md:px-10 md:w-60 text-base outline-none"
        />
      </form>
    </>
  );
}
export default SearchBar;
