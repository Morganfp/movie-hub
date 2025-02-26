# Movie Hut

A movie discovery platform with user authentication, favorites system, and real-time data. Search for movies, save favorites, watch trailers, and enjoy a seamless experience powered by React, Firebase, and the TMDB API.

Check it out at [www.moviehut.morganfpurcell.com](https://moviehut.morganfpurcell.com/)

<img width="1424" alt="Image" src="https://github.com/user-attachments/assets/7e9f6685-7090-4365-bd26-077396209b5f" />

<img width="1424" alt="Image" src="https://github.com/user-attachments/assets/4ce7e7a1-2931-4cf7-acfd-e6e775a60ec7" />

### Key Features

🎥 Movie Experience

- Search for movies and see results
- Detailed movie info with title, cover image, release year, overview, rating (stars)
- Movie trailer integration via YouTube Player

🔒 User Authentication

- Secure Firebase Authentication (email/password)
- Auth modal with login/signup forms using React Hook Form
- Session persistence

❤️ Favorites System

- Favorite movies view
- Real-time favorites sync with Firebase Firestore
- Loading spinners (react-spinners) for favorite states

🛡️ Production-Ready Infrastructure

- Firebase Security Rules for data protection
- Google Analytics integration for usage tracking
- Error handling with react-toastify notifications
- TMDB API for movie data with rate limit handling (50 reqs/sec per IP)

### Tech Stack

- Frontend: React, React Router, Context API
- Backend: Firebase Authentication, Firebase Firestore
- Styling: Tailwind CSS, react-icons
- Utilities: react-toastify, react-spinners, UUID
- APIs: TMDB API (https://developer.themoviedb.org/reference/intro/getting-started)

## Future Enhancements

- Make the favorites icon shake periodically
- Reroute if a user not logged in navigates to /favorites or /favmovie (protected routes)
- SEO optimization
- Separate files for login and sign-up forms
- Create a shared MovieLayout component for Movie.jsx and FavMovie.jsx
- Component testing
- Pagination for movie results: Support multiple pages
- Display movie director: Fetch from TMDB credits endpoint
- Display streaming services / where to watch
- Search by director/actors
- Filter and sort movies/fav
- Delay loading trailer until play button click
- Profile dashboard
