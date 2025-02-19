import { MdMovie } from 'react-icons/md';
import SearchBar from './SearchBar.jsx';

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
          <MdMovie size={28} />
          <h1 style={{ fontWeight: '500', fontSize: '22px', margin: 0 }}>
            Movie Hub
          </h1>
        </div>
        <SearchBar />
      </div>
    </>
  );
}

export default Header;
