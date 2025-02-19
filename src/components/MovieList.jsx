import MovieItem from './MovieItem.jsx';
import { useContext } from 'react';
import { MoviesContext } from '../contexts/MoviesContext.js';
import { Link } from 'react-router-dom';

function MovieList() {
  // Destructure the MoviesContext
  const { movies, dispatch } = useContext(MoviesContext);

  return (
    <>
      <div
        style={{
          display: 'flex',
          gap: '5rem',
          flexWrap: 'wrap',
          justifyContent: 'center',
        }}
      >
        {movies.map((movie) => (
          <span key={movie.id}>
            <Link to={`/movie/${movie.id}`} style={{ textDecoration: 'none' }}>
              <MovieItem movie={movie} />
            </Link>
          </span>
        ))}
      </div>
    </>
  );
}

export default MovieList;
