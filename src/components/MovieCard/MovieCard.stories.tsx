import { Meta, StoryFn } from '@storybook/react';

import { IMovieCard } from './types';
import MovieCard from './MovieCard';
import React from 'react';

const meta = {
    title: 'Components/MovieCard',
    component: MovieCard,
    parameters: {
        layout : 'centered',
        docs: {
            story:{
                inline: true,
                iframeHeight: 400,
            }
        }
    },
    argTypes:{
        title: {
            control: 'text',
            description: 'The title of the movie'
        },
        genreId: {
            control: 'number',
            description: 'The genre id of the movie'
        },
        movieId: {
            control: 'number',
            description: 'The movie id'
        },
        voteAverage: {
            control: 'number',
            description: 'The average vote of the movie'
        },
        posterPath: {
            control: 'text',
            description: 'The path to the poster image'
        }
    },
    tags: ["autodocs"],
}as Meta;

export default meta;

const Template: StoryFn<IMovieCard> = (args) => <MovieCard {...args} />;

/**
 * A default movieCard with all the props
 */

export const Default = Template.bind({});

Default.args = {
    title: 'John Wick: Chapter 4',
    voteAverage: 8.1,
    movieId: 603692,
    genreId: 28,
    posterPath: 'https://image.tmdb.org/t/p/w500/vZloFAK7NmvMGKE7VkF5UHaz0I.jpg',
};

