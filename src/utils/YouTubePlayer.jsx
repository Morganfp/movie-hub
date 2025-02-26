// YouTubePlayer.jsx
// Returns a React Player components that plays a YouTube video based on the provided video URL

// React Player
import ReactPlayer from 'react-player';
// Styles
import { FaPlay } from 'react-icons/fa';

export const YouTubePlayer = (videoUrl) => {
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
