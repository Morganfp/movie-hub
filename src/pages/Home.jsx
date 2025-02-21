import Header from '../components/Header.jsx';
import MovieList from '../components/MovieList.jsx';

function Home() {
  return (
    <>
      <div>
        <Header />
        <div className="py-12 px-6 md:py-16 md:px-28">
          <MovieList />
        </div>
      </div>
    </>
  );
}

export default Home;
