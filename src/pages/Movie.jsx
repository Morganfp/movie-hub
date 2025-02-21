import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
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
        // Use axios to fetch the movie media links
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${apiKey}`
        );
        const data = response.data;
        let videoObj;

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
        if (err.response) {
          // The request was made and the server responded with an error
          console.log('Response error:', err.response);
        } else if (err.request) {
          // The request was made and the server responded with an error
          console.log('Request error:', err.request);
        } else {
          // Something else happened
          console.log('Error:', err);
        }
      }
    };
    fetchMovieVideo();
  }, []);

  // Returns a YouTube video using ReactPlayer
  const YouTubePlayer = (videoUrl) => {
    return (
      <div className="w-full h-[170px] md:h-[460px] rounded-sm overflow-hidden">
        <ReactPlayer
          url={videoUrl}
          playing={true} // Auto plays video
          muted={true} // Mutes video
          controls={true} // Show controls
          light={true} // Display a thumbnail initially
          loop={true} // Loop video
          width="100%"
          height="100%" // This makes it take full height of the container
          playIcon={
            <div className="flex justify-center items-center w-20 h-20 bg-black/70 rounded-full cursor-pointer">
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
        <div className="py-5 px-3 md:pt-12 md:pb-0 md:px-20">
          <div onClick={handleBackClick} className="cursor-pointer w-8">
            <IoIosArrowBack size={30} color="#FF424F" />
          </div>
          <div className="my-4 mx-6 md:mt-6 md:mx-16 text-white">
            <div className="flex flex-col md:flex-row md:items-center mb-4 md:mb-6">
              {/* Title */}
              <h1 className="m-0 font-semibold text-xl md:text-2xl">
                {movieInfo.title}
              </h1>
              {/* Release */}
              <p className="text-base md:text-lg md:ml-3 text-[#6d8a9d]">
                {movieInfo.release}
              </p>
              {/* Stars */}
              <div className="text-[10px] flex gap-1 md:ml-auto">
                {getStars(movieInfo.rating, 17)}
              </div>
            </div>
            <div className="flex flex-col  md:flex-row items-center mb-6 gap-4">
              {/* Cover image */}
              <img
                src={movieInfo.coverUrl ? movieInfo.coverUrl : placeholderImage}
                alt={movieInfo.title}
                className="w-full md:w-[19rem] md:h-[460px] shadow-lg rounded-sm"
              />
              {/* Trailer */}
              {movieVideo.link
                ? YouTubePlayer(
                    `https://www.youtube.com/embed/${movieVideo.link}`
                  )
                : null}
            </div>
            {/* Overview */}
            <p className="pb-6 font-light text-white text-lg leading-7">
              {movieInfo.overview}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Movie;
