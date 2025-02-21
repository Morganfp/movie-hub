# Movie Hut

A movie discovery application that allows users to search for movies by title and view key details such as title, release year, rating, and cover images. Users can click on a movie to open a detailed page with additional information, including the movie's trailer and overview. Built with React, this app features a clean, responsive UI and seamless integration with The Movie Database (TMDB) API (https://developer.themoviedb.org/reference/intro/getting-started).

Check it out at [www.moviehut.morganfpurcell.com](https://moviehut.morganfpurcell.com/)

<img width="1424" alt="Image" src="https://github.com/user-attachments/assets/fbb46845-2392-427a-8371-230732cf37b3" />

<img width="1440" alt="Image" src="https://github.com/user-attachments/assets/57a0a754-af97-4796-ad89-4c24711ff99b" />

### Home Page

- Renders the Header and MovieList components.

### Header

- **App Branding**: Simple and clean header with movie logo.
- **Search Bar**: Users can search movies by title.
  - Uses `useState` for input management.
  - Fetches movie data from The Movie Database (TMDB) API.
  - Stores movie data using `useReducer` and `sessionStorage`.
  - Uses `useContext` for global movie state.

### Movie List

- **Movie Display**: Displays a list of movies based on the search.

### Movie Item

- Displays an individual movie with title, release year, rating, and the movie poster image (or a placeholder image if not available).

### Movie Page

- Renders a detailed movie page with additional information, including the movie's overview and trailer fetched from The Movie Database (TMDB) API.

### Tech

- React
- JavaScript (ES6+)
- Hooks: `useState`, `useEffect`, `useReducer`, `useContext`
- CSS

## Future Enhancements

- Input validation
- API rate limiting
- Support for multiple pages of movie results
- Login/Logout
- Profile dashboard
- Favorite movies
- Search by director, actors, etc
- Testing
- Display streaming services on where to watch movies
- Ability to sort movies by rating, release date, etc
- Display the movie director from 'https://api.themoviedb.org/3/movie/{movie_id}/credits'

## Installation

1. Clone the repository
2. Install dependencies:

- cd movie-hut
- npm install

3. Create a `.env` file in the root directory with your TMDb API key:
4. Start the development server:

- npm run dev
