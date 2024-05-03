import React from 'react'
import { IMovieCard } from './types'
import { IMAGE_SOURCE } from '../../constants/moviesMock'
import { Pill } from '../Pill';
import './MovieCard.css'
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../routes/constants';

const MovieCard: React.FC<IMovieCard> = ({
    title,
    genreId,
    movieId,
    voteAverage,
    posterPath,
}) => {
    const navigate = useNavigate();
    const poster = IMAGE_SOURCE + posterPath;
    const getGenre = (genreId: number): string => {
        switch (genreId) {
            case 28:
                return 'Action';
            case 12:
                return 'Adventure';
            case 16:
                return 'Animation';
            case 35:
                return 'Comedy';
            case 80:
                return 'Crime';
            case 99:
                return 'Documentary';
            case 18:
                return 'Drama';
            case 10751:
                return 'Family';
            case 14:
                return 'Fantasy';
            case 36:
                return 'History';
            case 27:
                return 'Horror';
            case 10402:
                return 'Music';
            case 9648:
                return 'Mystery';
            case 10749:
                return 'Romance';
            case 878:
                return 'Science Fiction';
            case 10770:
                return 'TV Movie';
            case 53:
                return 'Thriller';
            case 10752:
                return 'War';
            case 37:
                return 'Western';
            default:
                return 'Unknown';
        }
    }

    const navigateMovies = (id: number, movieName: string) => {
        navigate(`${ROUTES.SHOW}${id}`, {state: { movieName } })// /show/id
    }

  return (
    <div>
      <div className='ml-5 bg-white w-64  h-96 float-left overflow-hidden block mx-3 mb-8 mr-7 relative shadow-xl rounded-lg' 
       onClick={() => {
        navigateMovies(movieId, title);
    }}
       >
        <div className='bg-slate-600 min-w-32 h-96 relative shadow-xl'>
          <img className=' transition duration-1000 scale-100 overflow-hidden w-64 h-96 relative max-w-none ml-0 hover:scale-125 hover:opacity-40' src={poster} alt={title} />
        </div>
        <div className='rounded-lg border border-t-0 border-l-0 border-r-0 absolute bottom-0 left-0 w-full h-auto opacity-100 transition-all duration-300 bg-gradient-to-t from-black to-transparent'>
          <div className='p-4  table-cell w-full align-middle text-white'>
            <div>
              <Pill title={getGenre(genreId)} color='red' />
              <p>{title}</p>
              <p>* {voteAverage}/10</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MovieCard
