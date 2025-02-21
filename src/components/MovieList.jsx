import MovieItem from './MovieItem.jsx';
import { useContext, useEffect, useState } from 'react';
import { MoviesContext } from '../contexts/MoviesContext.js';
import { Link } from 'react-router-dom';

function MovieList() {
  // Destructure the MoviesContext
  const { movies, dispatch } = useContext(MoviesContext);
  // State to hold movies in session storage
  const [storedMovies, setStoredMovies] = useState([]);

  // Update movies in session storage when movies is updated
  useEffect(() => {
    setStoredMovies(JSON.parse(sessionStorage.getItem('movies')) || []);
  }, [movies]);

  return (
    <>
      <div className="flex gap-14 md:gap-20 flex-wrap justify-center">
        {/* Render movies if the user has searched */}
        {/* Else if: render movies in session storage if there are any */}
        {/* Else render no movies */}
        {movies.length > 0 ? (
          movies.map((movie) => (
            <span key={movie.id}>
              <Link to={`/movie/${movie.id}`} className="no-underline">
                <MovieItem movie={movie} />
              </Link>
            </span>
          ))
        ) : storedMovies.length > 0 ? (
          storedMovies.map((movie) => (
            <span key={movie.id}>
              <Link to={`/movie/${movie.id}`} className="no-underline">
                <MovieItem movie={movie} />
              </Link>
            </span>
          ))
        ) : (
          <h1 className="text-[#364049] text-xl md:text-3xl mt-2">
            Search for a movie...
          </h1>
        )}
      </div>
    </>
  );
}

export default MovieList;
