import React, {useEffect, useState} from 'react'
import { IMovieDetail } from './types'
import { MovieCard } from '../../components/MovieCard'
import { get } from 'http'
import { getDetailMovies } from '../../services/movies/getDetailMovies'

function Favorites() {
    const [loading, setLoading] = useState<boolean>(false)
    const favorites: string = localStorage.getItem('favorites') || ""
    const [shows, setShows] = useState<IMovieDetail[]>([])

    const runGetFavorites = async () => {
        if (favorites.length) {
            const favoritesArray = JSON.parse(favorites);
            const newShows = await Promise.all(
                favoritesArray.map(async (favoriteId: string) => {
                    return getDetailMovies(favoriteId)
                     .then((res) => {
                        if (res && res) {
                            return res;
                        }
                     }).catch((err) => {
                            console.log(err)
                     });
                })
            );
            setShows(newShows);
            setLoading(false);
        }
    }

    useEffect(() => {
        setLoading(true)
        runGetFavorites()

    },[]);


  return (
    <div>
        {!loading ?(
            <div>
                <h2 className='my-6 text-4xl font-semibold text-gray-800 mt-8 ml-8 uppercase'>My Favorites</h2>
                {favorites && favorites.length > 0 ? (
                    <div>
                        {shows && shows.length > 0 ? (
                            <div className='p-4'>{shows.map((show: IMovieDetail) =>(
                                <MovieCard
                                    key={show.id}
                                    title={show.title}
                                    movieId={show.id}
                                    posterPath={show.poster_path}
                                    genreId={show.genres[0].id}
                                    voteAverage={show.vote_average}
                                />
                            ))}</div>
                        ) : (
                            <div className='my-6 text-4xl font-semibold text-red-600 mt-8 ml-8 uppercase'>Error fetching movies</div>
                        )
                    }
                    </div>
                ) : (
                    <div>
                        <h3 className='my-6 text-4xl font-semibold text-gray-800 mt-8 ml-8 uppercase'>No Favorites</h3>
                    </div>
                )
            }
            </div>
        ) : (
            <div>Loading...</div>
        )
    }
    </div>
  )
}

export default Favorites