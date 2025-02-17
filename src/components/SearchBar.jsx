import { IoSearch } from 'react-icons/io5';
import { useState } from 'react';
const apiKey = import.meta.env.VITE_MOVIES_API_KEY;

function SearchBar({ addMovies }) {
  const [input, setInput] = useState('');

  const handleChange = (event) => {
    setInput(event.target.value);
  };

  // Fetch movies from themoviedb api
  const handleSubmit = async (event) => {
    event.preventDefault();
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
      // Create a movieData object to hold the mvoies (title, coverUr (poster image), release date, rating, and id)
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
        id: movie.id,
      }));
      // Clear search bar input
      setInput('');
      // call the addMovies callback to update the movies state
      addMovies(movieData);
    } catch (err) {
      setInput('');
      alert("Couldn't find that movie, try another");
      console.log('Error fetching data:', err);
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        style={{
          position: 'relative',
        }}
      >
        <button
          type="submit"
          style={{
            position: 'absolute',
            left: '0.5rem',
            top: '50%',
            transform: 'translateY(-50%)',
            color: '#888',
            background: 'none',
            border: 'none',
            display: 'flex',
          }}
        >
          <IoSearch size={15} />
        </button>

        <input
          onChange={handleChange}
          type="text"
          value={input}
          placeholder="Search"
          style={{
            backgroundColor: '#ffffff',
            border: 'none',
            borderRadius: '8px',
            padding: '.5rem 2.5rem',
            width: '15rem',
            fontSize: '14px',
            outline: 'none',
          }}
        ></input>
      </form>
    </>
  );
}
export default SearchBar;
