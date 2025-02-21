import { IoSearch } from 'react-icons/io5';
import { useState } from 'react';
import { useContext } from 'react';
import { MoviesContext } from '../contexts/MoviesContext.js';
const apiKey = import.meta.env.VITE_MOVIES_API_KEY;

function SearchBar() {
  const [input, setInput] = useState('');
  // Destructure the MoviesContext
  const { movies, dispatch } = useContext(MoviesContext);

  const handleChange = (event) => {
    setInput(event.target.value);
  };

  // Fetch movies from themoviedb api
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!input) {
      return;
    }
    try {
      // Fetch the movie data
      const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${input}`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${apiKey}`,
            'Content-Type': 'application/json',
          },
        }
      );
      // Parse the response
      const data = await response.json();
      // If the response contains no movie data, the movie wasn't found
      if (data.results.length === 0) {
        setInput('');
        alert("Couldn't find that movie, try another");
        return;
      }
      // Iterate over the first 'page' of returned movies (maximum of 20)
      // Create a movieData object to hold the movies (title, coverUr (poster image), release date, rating, overview, and id)
      const movieData = data.results.map((movie) => ({
        title: movie.title,
        coverUrl: movie.poster_path
          ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
          : null,
        release: movie.release_date
          ? movie.release_date.split('-').shift()
          : '-',
        // Convert the returned 1-10 rating to a 1-5 rating which this app uses
        rating: Math.round((movie.vote_average / 2) * 2) / 2,
        overview: movie.overview,
        id: movie.id,
      }));
      // Clear search bar input
      setInput('');
      // call the dispatch function with an array of movie data
      dispatch({ type: 'setMovies', movieData });
    } catch (err) {
      setInput('');
      alert("We're experiencing issues right now. Please try again later.");
      console.log('Error fetching data:', err);
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
          onChange={handleChange}
          type="text"
          value={input}
          placeholder="Search"
          onBlur={handleSubmit}
          className="bg-white text-black border-none rounded-lg py-1 px-7 w-37 md:py-1.5 md:px-10 md:w-60 text-base outline-none"
        />
      </form>
    </>
  );
}
export default SearchBar;
