import React, { useEffect, useState} from "react";
import { getPopularMovies, getTopRatedMovies, getNowPlayingMovies} from "../../services";
import { MovieCard } from "../../components/MovieCard";


const Home = () => {
  const [popularmovies, setPopularMovies] = useState<any[]>([]);
  const [popularloading, setPopularLoading] = useState<boolean>(false);
  const [popularerrorMovies, setPopularErrorMovies] = useState<boolean>(false);

  const [topRatedmovies, setTopMovies] = useState<any[]>([]);
  const [topRatedloading, setTopLoading] = useState<boolean>(false);
  const [topRatederrorMovies, setTopErrorMovies] = useState<boolean>(false);

  const [nowPlayingmovies, setNowPlayingMovies] = useState<any[]>([]);
  const [nowPlayingloading, setNowPlayingLoading] = useState<boolean>(false);
  const [nowPlayingerrorMovies, setNowPlayingErrorMovies] = useState<boolean>(false);

  const getPopular = async () => {
    await getPopularMovies()
      .then((res) => {
        if (res && res.data) {
          console.log(res.data, "res");
          setPopularMovies(res.data.results);
        }
      })
      .catch((err) => {
        setPopularErrorMovies(true);
      });
    setPopularLoading(false);
  };


  useEffect(() => {
    setPopularLoading(true);
    getPopular();
  }, []);

  const getTopRated = async () => {
    await getTopRatedMovies()
      .then((res) => {
        if (res && res.data) {
          console.log(res.data, "res");
          setTopMovies(res.data.results);
        }
      })
      .catch((err) => {
        setTopErrorMovies(true);
      });
    setTopLoading(false);
  };

  useEffect(() => {
    setTopLoading(true);
    getTopRated();
  }, []);

  const getNowPlaying = async () => {
    await getNowPlayingMovies()
      .then((res) => {
        if (res && res.data) {
          console.log(res.data, "res");
          setNowPlayingMovies(res.data.results);
        }
      })
      .catch((err) => {
        setNowPlayingErrorMovies(true);
      });
    setNowPlayingLoading(false);
  };

  useEffect(() => {
    setNowPlayingLoading(true);
    getNowPlaying();
  }, []);
  return (
    <div className="overflow-x-auto">
      <div className="text-3xl text-gray-800 font-semibold my-6 ">
        <h1 className="text-4xl font-semibold text-gray-800 mt-8 ml-8 uppercase">POPULAR</h1>
      </div>
      <div className="overflow-x-scroll flex -space-x-5 hide-scrollbar">
        {popularloading && <div>Loading...</div>}
        {popularerrorMovies && <div>Error..</div>}
        {popularmovies?.length > 0 && 
         popularmovies.map((movie) => (
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
      <div className="text-3xl text-gray-800 font-semibold my-6 ">
        <h2 className="text-4xl font-semibold text-gray-800 mt-8 ml-8 uppercase">TOP RATED</h2>
      </div>
      <div className="overflow-x-scroll flex -space-x-5 hide-scrollbar">
        {topRatedloading && <div>Loading...</div>}
        {topRatederrorMovies && <div>Error..</div>}
        {topRatedmovies?.length > 0 && 
          topRatedmovies.map((movie) => (
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
      <div className="text-3xl text-gray-800 font-semibold my-6 ">
        <h2 className="text-4xl font-semibold text-gray-800 mt-8 ml-8 uppercase">NOW PLAYING</h2>
      </div>
      <div className="overflow-x-scroll flex -space-x-5 hide-scrollbar">
        {nowPlayingloading && <div>Loading...</div>}
        {nowPlayingerrorMovies && <div>Error..</div>}
        {nowPlayingmovies?.length > 0 && 
          nowPlayingmovies.map((movie) => (
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
    </div>
  );
}

export default Home;
