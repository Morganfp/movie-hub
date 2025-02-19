import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
const apiKey = import.meta.env.VITE_MOVIES_API_KEY;
import { useContext } from 'react';
import { MoviesContext } from '../contexts/MoviesContext';
import { IoIosArrowBack } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';
import placeholderImage from '../assets/placeholder.jpg';
import ReactPlayer from 'react-player';
import { FaPlay } from 'react-icons/fa';
import { getStars } from '../utils/getStars';

function Movie() {
  // Destructure the movieId from the param
  const { movieId } = useParams();
  // State to hold the movie video
  const [movieVideo, setMovieVideo] = useState({});
  // Destructure the MoviesContext
  const { movies, dispatch } = useContext(MoviesContext);
  // State to hold the current movie we're viewing
  const [movieInfo, setMovieInfo] = useState({});

  // Update the movieInfo state
  useEffect(() => {
    setMovieInfo(
      movies.length > 0
        ? movies.find((movie) => Number(movie.id) === Number(movieId))
        : JSON.parse(sessionStorage.getItem('movies')).find(
            (movie) => Number(movie.id) === Number(movieId)
          )
    );
  }, [movies]);

  const navigate = useNavigate();

  const handleBackClick = () => {
    // Navigate to the previous page
    navigate(-1);
  };

  useEffect(() => {
    const fetchMovieVideo = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${apiKey}`
        );
        const data = await response.json();
        let videoObj = undefined;

        if (data.results.length > 0) {
          // Extract the first object in the response array that has 'YouTube' as the .site and 'Trailer' as the .type
          //  If none is found then extract the object that has 'YouTube' as the .site
          // If none is found, return undefined as there is no YouTube video
          videoObj =
            data.results.find(
              (video) => video.site === 'YouTube' && video.type === 'Trailer'
            ) ||
            data.results.find((video) => video.site === 'YouTube') ||
            undefined;
        }
        setMovieVideo({
          link: videoObj.key,
          type: videoObj.type === 'Trailer' ? 'trailer' : 'clip',
        });
      } catch (err) {
        console.log('Error fetching data:', err);
      }
    };
    fetchMovieVideo();
  }, []);

  // Returns a YouTube video using ReactPlayer
  const YouTubePlayer = (videoUrl) => {
    return (
      <div style={{ width: '100%' }}>
        <ReactPlayer
          url={videoUrl}
          playing={true} // Auto plays video
          muted={true} // Mutes video
          controls={true} // Show controls
          light={true} // Display a thumbnail initially
          loop={true} // Loop video
          width="100%"
          height="460px"
          playIcon={
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '80px',
                height: '80px',
                backgroundColor: 'rgba(0, 0, 0, 0.7)',
                borderRadius: '50%',
                cursor: 'pointer',
              }}
            >
              <FaPlay color="white" size={30} />
            </div>
          }
        />
      </div>
    );
  };

  return (
    <>
      <div>
        <div style={{ padding: '3rem 5rem 0rem 5rem' }}>
          <div
            onClick={handleBackClick}
            style={{ cursor: 'pointer', width: '2rem' }}
          >
            <IoIosArrowBack size={30} color="FF424F" />
          </div>
          <div style={{ margin: '2rem 4rem', color: '#fff' }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                marginBottom: '1.5rem',
              }}
            >
              {/* Title */}
              <h1
                style={{
                  margin: '0',
                  fontWeight: 400,
                  fontSize: '28px',
                }}
              >
                {movieInfo.title}
              </h1>
              {/* Release */}
              <p
                style={{
                  fontSize: '22px',
                  margin: '0 0 0 .8rem',
                  color: '#6d8a9d',
                }}
              >
                {movieInfo.release}
              </p>
              {/* Stars */}

              <div
                style={{
                  fontSize: '10px',
                  display: 'flex',
                  gap: '5px',
                  marginLeft: 'auto',
                }}
              >
                {getStars(movieInfo.rating, 18)}
              </div>
            </div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                marginBottom: '1.5rem',
                gap: '1rem',
              }}
            >
              {/* Cover image */}
              <img
                src={movieInfo.coverUrl ? movieInfo.coverUrl : placeholderImage}
                alt={movieInfo.title}
                style={{
                  width: '19rem',
                  height: '460px',
                  boxShadow: '5px 5px 15px rgba(0, 0, 0, 0.3)',
                  borderRadius: '5px',
                }}
              />
              {/* Trailer */}
              {movieVideo.link
                ? YouTubePlayer(
                    `https://www.youtube.com/embed/${movieVideo.link}`
                  )
                : null}
            </div>
            <p
              style={{
                margin: '0',
                fontWeight: 300,
                color: '#ffffff',
                fontSize: '18px',
                lineHeight: '26px',
              }}
            >
              {movieInfo.overview}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Movie;
