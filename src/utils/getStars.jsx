import { FaStar } from 'react-icons/fa6';
import { FaStarHalf } from 'react-icons/fa6';
import { v4 as uuidv4 } from 'uuid';

// Return the amount of stars based off the 1-5 rating
export const getStars = (rating, size) => {
  const stars = [];
  let currStars = rating;
  for (let i = 0; i < 5; i++) {
    if (currStars - 1 >= 0) {
      currStars--;
      stars.push(<FaStar color="#FF424F" size={size} key={uuidv4()} />);
    } else if (currStars - 0.5 >= 0) {
      currStars -= 0.5;
      stars.push(<FaStarHalf color="#FF424F" size={size} key={uuidv4()} />);
    }
  }
  return stars;
};
