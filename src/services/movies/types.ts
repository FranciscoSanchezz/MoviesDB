export interface IMovieResponse {
    genre_ids: any;
    adult:             boolean;
    backdrop_path:     string;
    genres:            Genre[];
    id:                number;
    original_language: string;
    original_title:    string;
    overview:          string;
    popularity:        number;
    poster_path:       string;
    release_date:      string;
    title:             string;
    video:             boolean;
    vote_average:      number;
    vote_count:        number;
    runtime:           number;
    tagline:           string;
}

export interface Genre {
    id:  number;
    name: string;
}