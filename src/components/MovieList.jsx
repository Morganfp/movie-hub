import MovieItem from './MovieItem.jsx';
import { useContext } from 'react';
import { MoviesContext } from '../contexts/MoviesContext.js';

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
          <MovieItem key={movie.id} movie={movie} />
        ))}
      </div>
    </>
  );
}

export default MovieList;
