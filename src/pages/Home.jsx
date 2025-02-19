import Header from '../components/Header.jsx';
import MovieList from '../components/MovieList.jsx';

function Home() {
  return (
    <>
      <div>
        <Header />
        <div style={{ padding: '4rem 7rem' }}>
          <MovieList />
        </div>
      </div>
    </>
  );
}

export default Home;
