# Movie Hub

A movie discovery application that allows users to search for movies by title and view key details such as release year, rating, and cover images. Built with React, this app offers a clean, responsive UI and seamless integration with the MovieDB API.

### Header

- **App Branding**: Simple and clean header with movie logo.
- **Search Bar**: Users can search movies by title.
  - Uses `useState` for input management.
  - Fetches movie data from the MovieDB API.

### Movie List

- **Movie Display**: Displays a list of movies based on the search.
  - Shows movie title, release year, rating, and cover image.

### Movie Item

- **Movie Item Card**: Each movie displays:
  - Title, Release Year, Rating (1-5 stars)
  - Movie Poster (or a placeholder image if not available)

### Tech

- React
- JavaScript (ES6+)
- Hooks: `useState`, `useEffect`
- CSS

## Future Enhancements

- Search ny director, actors, etc.
- Click on a movie for a detailed movie page with descrription, trailer, where to watch, etc.
- Support for multiple pages of movie results
- Improve mobile layout and performance
- Ability to sort movies by rating, release date, etc.

## Installation

1. Clone the repository:
2. Install dependencies:

- cd movie-hub
- npm install

3. Create a `.env` file in the root directory with your TMDb API key:
4. Start the development server:

- npm run dev
