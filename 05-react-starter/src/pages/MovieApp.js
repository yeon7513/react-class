import React, { useEffect, useState } from 'react';
import Movie from '../components/Movie';
import '../scss/MovieApp.scss';

function MovieApp(props) {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const url =
    'https://yts.mx/api/v2/list_movies.json?minimum_rating=8&sort_by=year';

  const getMovies = async () => {
    setIsLoading(true);

    const response = await fetch(url);
    const data = await response.json();
    // console.log(response);
    const movieArr = data.data.movies;
    setMovies(movieArr);

    setIsLoading(false);
  };

  useEffect(() => {
    getMovies();
  }, []);

  return (
    <div className="container">
      {isLoading ? (
        <div className="loader">Loading....</div>
      ) : (
        <div className="movies">
          <Movie data={movies} />
        </div>
      )}
    </div>
  );
}

export default MovieApp;
