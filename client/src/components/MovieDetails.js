import { React, useEffect, useState } from 'react';
import { navigate } from '@reach/router';
import './MovieDetails.css'
import API_URI from '../utilities/apiUtils.js';
import MovieForm from './MovieForm.js';
import axios from 'axios';

const MovieDetails = (props) => {
    const { id, onSubmitProp, onDeleteProp } = props;
    const [movie, setMovie] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    console.log(API_URI);
    useEffect(() => {
        axios.get(`${API_URI}/${id}`)
            .then((res) => {
                setMovie(res.data);
            })
            .catch((err) => {
                console.log("uh oh", err);
            });

    }, []);
    const deleteHandler = () => {
        const result = prompt("Type 'yes' to delete");
        if(result !== 'yes') { return; }
        onDeleteProp(movie._id);
        navigate('/');
    }
    const renderConditionalEdit = () =>{
        return (isEditing)
            ? (
                <div>
                    <MovieForm movie={movie} onSubmitProp={onSubmitProp}></MovieForm>
                    <button 
                        onClick={() => setIsEditing(false)}
                        className="btn btn-warning">Cancel</button>
                </div>
            )
            : (<button 
                onClick={() => setIsEditing(true)}
                className="btn btn-warning">Edit</button>);
    }
    return (movie === null) ? <h1>...loading...</h1>
    :(
        <div>
            <section className="movie-details-card">
                <h1>{ movie.title }</h1>     
                <p><strong>Rated:</strong> {movie.rating}</p>
                <p><strong>Genre:</strong> {movie.genre}</p>
                <p><strong>Release Date:</strong> { new Date(movie.releaseDate).toLocaleDateString("en-us")}</p>
                <blockquote>{ movie.plot }</blockquote>
            </section>
            { renderConditionalEdit() } 
            <hr />
            <button 
                onClick={deleteHandler}
                className="btn btn-danger">Delete</button>
        </div>
     )
}

export default MovieDetails;
