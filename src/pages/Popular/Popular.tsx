import React, { useEffect, useState } from 'react'
import { getPopularMovies } from '../../services';
import { MovieCard } from '../../components/MovieCard';

const Popular: React.FC = () => {
  const [movies, setMovies] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMovies, setErrorMovies] = useState<boolean>(false);

  const getPopular = async () => {
    await getPopularMovies()
      .then((res) => {
        if (res && res.data) {
          console.log(res.data, "res");
          setMovies(res.data.results);
        }
      })
      .catch((err) => {
        setErrorMovies(true);
      });
    setLoading(false);
  };

  useEffect(() => {
    setLoading(true);
    getPopular();
  }, []);
  return (
    <div>
      {loading && <div>Loading...</div>}
      {errorMovies && <div>Error..</div>}
      {movies?.length > 0 && 
        movies.map((movie) => (
          <MovieCard
            key={movie.id}
            title={movie.title}
            movieId={movie.id}
            posterPath={movie.poster_path}
            genreId={movie.genre_ids[0]}
            voteAverage={movie.vote_average}
          />
        ))}

    </div>
  )
}

export default Popular