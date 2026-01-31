import { useState, useEffect } from 'react'
import { useDebounce } from 'react-use';
import Search from './components/Search'
import Spinner from './components/Spinner'
import MovieCard from './components/MovieCard';
import { updateSearchCount, getTrendingMovies } from './lib/appwrite';

const API_BASE_URL = 'https://api.themoviedb.org/3';

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const API_OPTIONS = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${API_KEY}`,
  },
};

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
  const [movieList, setMovieList] = useState([]);
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [isSearchLoading, setIsSearchLoading] = useState(false);
  const [isTrendingLoading, setIsTrendingLoading] = useState(false);

  useDebounce(() => setDebouncedSearchTerm(searchTerm), 500, [searchTerm]);

  const fetchMovies = async (query) => {
    setIsSearchLoading(true);
    setErrorMessage('');

    try {
      const endpoint = query
        ? `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
        : `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;

      const response = await fetch(endpoint, API_OPTIONS);

      if (!response.ok) throw new Error('Failed to fetch movies');

      const results = (await response.json()).results || [];
      setMovieList(results);

      if (query && results.length > 0) {
        await updateSearchCount(query, results[0]);
      }
    } catch (err) {
      console.error(err);
      setErrorMessage('Failed to fetch movies.');
    } finally {
      setIsSearchLoading(false);
    }
  };

  const fetchTrendingMovies = async () => {
    setIsTrendingLoading(true);
    try {
      const docs = await getTrendingMovies();
      setTrendingMovies(docs || []);
    } catch (err) {
      console.error(err);
    } finally {
      setIsTrendingLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies(debouncedSearchTerm);
  }, [debouncedSearchTerm]);

  useEffect(() => {
    fetchTrendingMovies();
  }, []);

  return (
    <main>
      <div className='pattern' />

      <div className='wrapper'>
        <img src='/logo.svg' alt='Filmlytics Logo' className='w-15 self-center' />

        <header>
          <img src='/hero.png' alt='Hero Banner' />

          <h1>
            Find <span className='text-gradient'>Movies</span> You'll Love without Any Hassle
          </h1>

          <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </header>

        {isTrendingLoading ? (
          <Spinner />
        ) : trendingMovies.length > 0 ? (
          <section className='trending'>
            <h2>Trending Movies</h2>

            <ul>
              {trendingMovies.map((movie, index) => (
                <li key={movie.$id}>
                  <p>{index + 1}</p>
                  <img src={movie.poster_url || '/no-movie.png'} alt={movie.search_term} />
                </li>
              ))}
            </ul>
          </section>
        ) : ''}

        <section className='all-movies mt-5'>
          <h2>All Movies</h2>

          {isSearchLoading ? (
            <Spinner />
          ) : errorMessage ? (
            <p className='text-red-500'>{errorMessage}</p>
          ) : movieList.length > 0 ? (
            <ul>
              {movieList.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </ul>
          ) : (
            <p className='text-red-500'>No movies available.</p>
          )}
        </section>
      </div>
    </main>
  )
}

export default App
