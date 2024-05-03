import React, { useEffect, useState } from 'react'
import { useLocation, useParams, useNavigate } from 'react-router-dom'
import { getDetailMovies } from '../../services/movies/getDetailMovies';
import { IMovieResponse } from '../../services/movies/types';
import { MovieCard } from '../../components/MovieCard';
import { Pill } from '../../components/Pill';
import './Show.css'
import {Groups, Time, Calendar, Star, Graph} from '../../assets';
import { getRecommendedMovies } from '../../services/movies/getRecommendedMovies';



const Show: React.FC = () => {
    
    const [detailmovies, setDetailMovies] = useState<IMovieResponse>();
    const [detailloading, setDetailLoading] = useState<boolean>(false);
    const [detailerrorMovies, setDetailErrorMovies] = useState<boolean>(false);

    const [recommendations, setRecommendations] = useState<any[]>([]);
    const [loadingRecommendations, setLoadingRecommendations] = useState<boolean>(false);
    const [errorRecommendations, setErrorRecommendations] = useState<boolean>(false);

    const [isFavorite, setIsFavorite] = useState<boolean>(false);
    const [favorites, setFavorites] = useState<string>("");

    const { id } = useParams();
    const location = useLocation();
    const navigate = useNavigate();

    const addFavorite = () => {
        const favs = favorites.length > 0 ? JSON.parse(favorites) : [];
        const newFavorites = [...favs, id];
        setFavorites(JSON.stringify(newFavorites));
        setIsFavorite(true);
        localStorage.setItem('favorites', JSON.stringify(newFavorites));
    }

    const removeFavorite = () => {
        const favs = favorites.length > 0 ? JSON.parse(favorites) : [];
        const newFavorites = favs.filter((fav: string) => fav !== id);
        setFavorites(JSON.stringify(newFavorites));
        setIsFavorite(false);
        localStorage.setItem('favorites', JSON.stringify(newFavorites));
    }

    const getDetails = async () => {
        await getDetailMovies(id)
        .then((res) => {
            setDetailMovies(res);
        })
        .catch((err) => {
            setDetailErrorMovies(true);
        });
        setDetailLoading(false);
    }

    useEffect(() => {
        const favs = localStorage.getItem('favorites')|| "";
        setFavorites(favs);
        if( favs.includes(String(id))) {
            setIsFavorite(true);
        }
        setDetailLoading(true);
        getDetails();
    }, []);

    const getRecommendations = async () => {
        await getRecommendedMovies(id)
        .then((res) => {
            setRecommendations(res.results);
        })
        .catch((err) => {
            setErrorRecommendations(true);
        });
        setLoadingRecommendations(false);
    }
    useEffect(() => {
        setLoadingRecommendations(true);
        getRecommendations();
    }, []);

    const goBack = () => {
        navigate(-1);
    }



    return (
        <div>
            <div className='flex'>
                {detailloading && <div>Loading...</div>}
                {detailerrorMovies && <div>Error...</div>}
                <div className='flex-none w-1/4 h-fit overflow-hidden shadow-xl rounded-lg mx-3 my-3'>{detailmovies?.poster_path && <img src={`https://image.tmdb.org/t/p/w500/${detailmovies?.poster_path}`} alt={detailmovies?.title} />}</div>
                <div className='shrink flex-col-5 w-3/4 justify-between space-y-10 mr-5'>
                    <div className='text-5xl text-gray-800 font-semibold mx-4 mt-16'>{location.state.title}</div>
                    <div className='flex h-0'>
                        <div className='text-md font-medium mx-4'>
                            <div className='flex h-6'>
                                <img src={Groups} alt='people'></img>
                                <div className='mx-1 text-xl'>{detailmovies?.adult === true && '18+'}{detailmovies?.adult === false && '18-'}</div>
                            </div>
                        </div>
                        <div className='text-xl font-medium mx-4'>
                            <div className='flex h-6'>
                                <img src={Time} alt='time'></img>
                                <div className='text-md font-medium'>{detailmovies?.runtime} min.</div>
                            </div>
                        </div>
                        <div className='text-xl font-medium mx-4'>
                            <div className='flex h-6'>
                                <img src={Calendar} alt='calendar'></img>
                                <div className='mx-1'>{detailmovies?.release_date}</div>
                            </div>
                        </div>
                        <div className='text-xl font-medium mx-4'>
                            <div className='flex h-6'>
                                <img src={Star} alt='star'></img>
                                <div className='text-md font-medium'>{detailmovies?.vote_average}</div>
                            </div>
                        </div>
                        <div className='text-xl font-medium mx-4'>
                            <div className='flex h-6'>
                                <img src={Graph} alt='graph'></img>
                                <div className='text-md font-medium'>{detailmovies?.vote_count}</div>
                            </div>
                        </div>
                    </div>
                    <div className=' text-xl font-light mx-4'>
                        "{detailmovies?.tagline}"
                        <br></br>
                        {detailmovies?.overview}
                    </div>
                    <div className='flex w-auto'>
                        <div className='grid'>
                            <div className='text-lg font-semibold h-5 mx-4'>Genres</div>
                            <div className='flex space-x-2 mx-4'>
                                {detailmovies?.genres && detailmovies?.genres.map((genre) => (
                                <Pill title={genre.name}color={detailmovies?.vote_average > 6 ? 'green' :detailmovies?.vote_average > 5 && detailmovies?.vote_average < 6 ? 'yellow' : 'red'}></Pill>))}
                            </div>
                        </div>
                        <div className='grid mx-20'>
                            <div className='text-lg font-semibold'>Favorite</div>
                            {isFavorite ? (
                                <div>
                             <button className=" bg-blue-500 hover:bg-blue-900 border-2 border-blue-300 text-white font-bold p-2 h-fit rounded-md" onClick={removeFavorite}>
                             remove from favorites
                            </button>                                   
                                </div>
                            ):(
                                <div>
                                <button className="bg-red-500 hover:bg-blue-900 border-2 border-blue-300 text-white font-bold p-2 h-fit rounded-md" onClick={addFavorite}>
                                ♥ Add to favorites
                                </button>
                                </div>
                            )}

                        </div>
                    </div>
                    <button className=" bg-indigo-700 hover:bg-indigo-900 border-2 border-indigo-200 text-white font-bold p-2 h-fit rounded-md mx-4 mb-5" onClick={goBack}>⏎ Ir atrás</button>
                </div>
            </div>
            <div className='text-4xl text-gray-800 font-bold mx-12 my-5'>RECOMMENDATIONS</div>
            {loadingRecommendations && <div>Loading...</div>}
            {errorRecommendations && <div>Error...</div>}
            <div className='overflow-x-scroll flex -space-x-5 hide-scrollbar'>
                {recommendations?.length > 0 && recommendations.map((movie) => (
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

export default Show
