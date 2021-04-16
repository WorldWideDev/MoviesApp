import { React, useEffect, useState } from 'react';
import './MovieDetails.css'
import MovieForm from './MovieForm.js';
import axios from 'axios';

const MovieDetails = (props) => {
    const { id, onSubmitProp } = props;
    const [movie, setMovie] = useState(null);
    useEffect(() => {
        axios.get(`http://localhost:3030/api/${id}`)
            .then((res) => {
                setMovie(res.data);
            })
            .catch((err) => {
                console.log("uh oh", err);
            });

    }, []);
    return (movie === null) ? <h1>...loading...</h1>
    :(
        <div>
            <section className="movie-details-card">
                <h1>{ movie.title }</h1>     
                <p><strong>Rated:</strong> {movie.rating}</p>
                <p><strong>Genre:</strong> {movie.genre}</p>
                <p><strong>Release Date:</strong> { new Date(movie.releaseDate).toLocaleDateString("en-us")}</p>
            </section>
            <MovieForm movie={movie} onSubmitProp={onSubmitProp}></MovieForm>
        </div>
     )
}

export default MovieDetails;
