import placeholderImage from '../assets/placeholder.jpg';
import { getStars } from '../utils/getStars';

function MovieItem({ movie }) {
  const { title, rating, release, coverUrl } = movie;

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
          {getStars(rating, 14)}
        </div>
      </div>
    </>
  );
}

export default MovieItem;
