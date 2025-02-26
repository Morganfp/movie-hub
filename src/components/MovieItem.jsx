// MovieItem.jsx
// Renders a single movie

// Utils
import { getStars } from '../utils/getStars';
// Styles
import placeholderImage from '../assets/placeholder.jpg';

function MovieItem({ movie }) {
  // Destructure the movi prop
  const { title, rating, release, coverUrl } = movie;

  return (
    <>
      <div className="flex flex-col gap-1 flex-wrap max-w-[8rem] md:max-w-[10rem]">
        <img
          src={coverUrl ? coverUrl : placeholderImage}
          alt={title ? title : 'Movie poster unavailable'}
          className="w-[10rem] h-[180px] md:w-[10rem] md:h-[240px] shadow-lg rounded-sm"
        />
        <h3 className="mt-1 md:mt-2 text-white text-base font-normal">
          {title}
        </h3>
        <p
          className="mt-[-3px] md:mt-0 text-[#6d8a9d] text-base font-normal"
          aria-label={`Released in ${release}`}
        >
          {release}
        </p>
        <div
          className="mt-[-3px] md:mt-0 text-[10px] flex gap-1"
          aria-label={`Movie rating: ${rating} out of 5`}
        >
          {getStars(rating, 15)}
        </div>
      </div>
    </>
  );
}

export default MovieItem;
