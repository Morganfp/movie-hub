import './App.css';
import { MoviesContext } from './contexts/MoviesContext.js';
import { useEffect, useReducer } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home.jsx';
import Movie from './pages/Movie.jsx';
import NotFound from './pages/NotFound.jsx';

// Reducer function to perform actions on the movies state
function reducer(state, action) {
  switch (action.type) {
    case 'setMovies':
      return action.movieData;
    default:
      console.log('Action type not recognized:', action.type);
      return state;
  }
}

function App() {
  // State to hold movies and dispatch to call the reducer function with an array of movie data
  const [movies, dispatch] = useReducer(reducer, []);

  // Update sessionStorage with movie data
  useEffect(() => {
    // Only update when new movies are set
    if (movies.length > 0) {
      sessionStorage.setItem('movies', JSON.stringify(movies));
    }
  }, [movies]);

  return (
    <>
      {/* Provide the movies state and dispatch function to all components */}
      <MoviesContext.Provider value={{ movies, dispatch }}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/movie/:movieId" element={<Movie />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </MoviesContext.Provider>
    </>
  );
}

export default App;
