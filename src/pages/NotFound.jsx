// NotFound.jsx
// Renders a not found page for invaid URLs
// Allows tje user to click a back arrow to go to previous page they were on

// React Router
import { useNavigate } from 'react-router-dom';
// Styles
import { IoIosArrowBack } from 'react-icons/io';

function NotFound() {
  // Set up navigation
  const navigate = useNavigate();

  return (
    <>
      <div className="py-5 px-3 md:py-12 md:px-20">
        <div onClick={() => navigate('/')} className="cursor-pointer w-8">
          <IoIosArrowBack size={30} color="#FF424F" />
        </div>
        <div className="p-5 text-white">
          <h1 className="m-0 text-lg md:text-xl">
            Oops! The page you're looking for doesn't exist.
          </h1>
        </div>
      </div>
    </>
  );
}

export default NotFound;
