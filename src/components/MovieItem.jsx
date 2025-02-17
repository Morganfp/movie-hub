import { FaStar } from 'react-icons/fa6';
import { FaStarHalf } from 'react-icons/fa6';
import placeholderImage from '../assets/placeholder.jpg';

function MovieItem({ movie }) {
  const { title, director, rating, release, coverUrl } = movie;

  // Return the amount of stars based off the 1-5 rating
  const getStars = () => {
    const stars = [];
    let currStars = rating;
    for (let i = 0; i < 5; i++) {
      if (currStars - 1 >= 0) {
        currStars--;
        stars.push(<FaStar color="#FF424F" size={14} />);
      } else if (currStars - 0.5 >= 0) {
        currStars -= 0.5;
        stars.push(<FaStarHalf color="#FF424F" size={14} />);
      }
    }
    return stars;
  };

  return (
    <>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '5px',
          flexWrap: 'wrap',
          maxWidth: '10rem',
        }}
      >
        <img
          src={coverUrl ? coverUrl : placeholderImage}
          alt={title}
          style={{
            width: '10rem',
            height: '240px',
            boxShadow: '5px 5px 15px rgba(0, 0, 0, 0.3)',
            borderRadius: '5px',
          }}
        />
        <p
          style={{
            margin: '8px 0 0 0',
            fontWeight: 400,
            color: '#ffffff',
            fontSize: '17px',
          }}
        >
          {title}
        </p>
        <p
          style={{
            margin: '3px 0 0 0',
            fontWeight: 400,
            color: '#6d8a9d',
          }}
        >
          {release}
        </p>
        <div
          style={{
            fontSize: '10px',
            display: 'flex',
            gap: '5px',
            margin: '3px 0 0 0',
          }}
        >
          {getStars()}
        </div>
      </div>
    </>
  );
}

export default MovieItem;
