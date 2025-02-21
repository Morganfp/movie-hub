import SearchBar from './SearchBar.jsx';
import { GiHut } from 'react-icons/gi';

function Header() {
  // When the user clicks the logo, clear session storage and reload the page
  const handleClick = (event) => {
    event.preventDefault();
    sessionStorage.clear();
    window.location.reload();
  };

  return (
    <>
      <div className="text-white bg-red-500 py-4 px-6 md:py-8 md:px-20 flex items-center md:gap-12 justify-between">
        <div
          onClick={handleClick}
          className="flex items-center gap-1 md:gap-2 cursor-pointer"
        >
          <GiHut className="w-6 h-6 md:w-10 md:h-10" />
          <h1
            className="font-semibold text-lg md:text-2xl m-0"
            style={{ fontFamily: "'Cabin', sans-serif" }}
          >
            Movie Hut
          </h1>
        </div>
        <SearchBar />
      </div>
    </>
  );
}

export default Header;
