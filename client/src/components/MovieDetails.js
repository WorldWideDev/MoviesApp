import { React, useEffect, useState } from 'react';
import { navigate } from '@reach/router';
import API_URI from '../utilities/apiUtils.js';
import MovieForm from './MovieForm.js';
import axios from 'axios';

const MovieDetails = (props) => {
    const { id, onSubmitProp, onDeleteProp, errors } = props;
    const [movie, setMovie] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
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
    const renderConditionalEdit = () => {
        return (isEditing)
            ? (
                <section>
                    <MovieForm movie={movie} errors={errors} onSubmitProp={onSubmitProp}>
                        <button 
                            onClick={() => setIsEditing(false)}
                            className="btn btn-warning">Cancel</button>
                    </MovieForm>
                </section>
            )
            : (
                <section className="movie-details-card">
                    <div>
                        <main>
                            <h1>{ movie.title }</h1>     
                            <p><strong>Rated:</strong> {movie.rating}</p>
                            <p><strong>Genre:</strong> {movie.genre}</p>
                            <p><strong>Release Date:</strong> { new Date(movie.releaseDate).toLocaleDateString("en-us")}</p>
                            <blockquote>{ movie.plot }</blockquote>
                        </main>
                        <aside>
                            <img src={movie.movieUrl} alt={movie.title} />
                        </aside>
                    </div>
                    <button 
                        onClick={() => setIsEditing(true)}
                        className="btn btn-warning">Edit</button>
                    <button 
                        onClick={deleteHandler}
                        className="btn btn-danger">Delete</button>
                </section>
            );
    }
    return (movie === null) 
        ? <h1>...loading...</h1>
        : renderConditionalEdit();
        
}

export default MovieDetails;
