import { MdMovie } from 'react-icons/md';
import SearchBar from './SearchBar.jsx';
import { GiHut } from 'react-icons/gi';

function Header() {
  return (
    <>
      <div
        style={{
          backgroundColor: '#FF424F',
          padding: '2rem 4rem',
          display: 'flex',
          alignItems: 'center',
          gap: '3.5rem',
          color: '#ffffff',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '.5rem',
          }}
        >
          <GiHut size={36} />
          <h1 style={{ fontWeight: '500', fontSize: '22px', margin: 0 }}>
            Movie Hut
          </h1>
        </div>
        <SearchBar />
      </div>
    </>
  );
}

export default Header;
