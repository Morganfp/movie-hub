import './App.css';
import Header from './components/Header.jsx';
import MovieList from './components/MovieList.jsx';
import { useState } from 'react';

function App() {
  // State to hold movies
  const [movies, setMovies] = useState([]);

  const addMovies = (movieData) => {
    setMovies(movieData);
  };

  return (
    <>
      <div style={{ backgroundColor: '#232A31', minHeight: '100vh' }}>
        {/* Callback the addMovies function with movie data */}
        <Header addMovies={addMovies} />
        <div style={{ padding: '4rem 7rem' }}>
          {/* Pass a movies state to MovieList to render */}
          <MovieList movies={movies} />
        </div>
      </div>
    </>
  );
}

export default App;
