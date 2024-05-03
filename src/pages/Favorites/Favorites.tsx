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
                        if (res && res.data) {
                            return res.data;
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
                <h2>My Favorites</h2>
                {favorites && favorites.length > 0 ? (
                    <div>
                        {shows && shows.length > 0 ? (
                            <div>{shows.map((show: IMovieDetail) =>(
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
                            <div>Error fetching movies</div>
                        )
                    }
                    </div>
                ) : (
                    <div>
                        <h3>No Favorites</h3>
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