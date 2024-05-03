export interface IMovieCard {
    /**
     * The title of the movie
     */
    title: string;
    /**
     * The genre id of the movie
     */
    genreId: number;
    /**
     * The movie id
     */
    movieId: number;
    /**
     * The average vote of the movie
     */
    voteAverage: number;
    /**
     * The path to the poster image
     */
    posterPath: string;
    /**
     * The path to the poster image
     */
}