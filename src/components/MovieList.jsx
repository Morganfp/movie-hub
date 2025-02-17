import MovieItem from './MovieItem.jsx';

function MovieList({ movies }) {
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
