import './App.css';
import Header from './components/Header.jsx';
import MovieList from './components/MovieList.jsx';
import { MoviesContext } from './contexts/MoviesContext.js';
import { useReducer } from 'react';

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

  return (
    <>
      {/* Provide the movies state and dispatch function to all components */}
      <MoviesContext.Provider value={{ movies, dispatch }}>
        <div style={{ backgroundColor: '#232A31', minHeight: '100vh' }}>
          <Header />
          <div style={{ padding: '4rem 7rem' }}>
            <MovieList />
          </div>
        </div>
      </MoviesContext.Provider>
    </>
  );
}

export default App;
