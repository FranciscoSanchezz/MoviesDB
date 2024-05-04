import React, {useEffect, useState} from "react";
import { getNowPlayingMovies } from "../../services";
import { MovieCard } from "../../components/MovieCard";

const NowPLaying: React.FC = () => {
    const [movies, setMovies] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [errorMovies, setErrorMovies] = useState<boolean>(false);

    const getNowPlaying = async () => {
        await getNowPlayingMovies()
        .then((res) => {
            if (res && res.data) {
                setMovies(res.data.results);
            }
        })
        .catch((err) => {
            setErrorMovies(true);
        });
        setLoading(false);
    }

    useEffect(() => {
        setLoading(true);
        getNowPlaying();
    }, []);

    return (
        <div>
            <div className="text-3xl text-gray-800 font-semibold my-6" >
                <h2 className="text-4xl font-semibold text-gray-800 mt-8 ml-8 uppercase">NOW PLAYING</h2>
            </div>
            <div className=" p-4">
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
        </div>
    )
}

export default NowPLaying
