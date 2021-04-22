import { navigate } from '@reach/router';
import axios from 'axios';
import API_URI from '../utilities/apiUtils.js';
import { useState } from 'react';

const getFormReadyDate = (date=null) => {
    const dt = (date === null) ? new Date() : new Date(date);
    return dt.toISOString().split('T')[0];
}

const INITIAL_MOVIE_STATE = {
    title: '',
    genre: '',
    director: '',
    plot: '',
    releaseDate: getFormReadyDate(),
    rating: ''
}
// const RATINGS = ['G', 'PG', 'PG-13', 'R', 'NC-17', 'Unrated'];
const MovieForm = (props) => {

    const initialState = (props.movie === undefined)
        ? INITIAL_MOVIE_STATE
        : {...props.movie, releaseDate:getFormReadyDate(props.movie.releaseDate)};
    const { isCreate, children } = props;
    const [movie, setMovie] = useState({...initialState});
    const [errors, setErrors] = useState([]);
    const {title, director, genre, releaseDate, rating, plot} = movie;
    function onInputChanged(field, value) {
        console.log(field, value);
        setMovie({ ...movie, [field]:value});
    }
    const updateMovie = () => {
        setErrors([]);
        axios.put(`${API_URI}/${movie._id}`, movie)
            .then(res => {
                setErrors([]);
                navigate('/');
            })
            .catch(err => {
                setErrors(err.response.data.errors);
            });
    }
    const createMovie = () => {
        axios.post(API_URI, movie)
            .then(res => {
                console.log(res);
                setErrors([]);
                navigate('/');
            })
            .catch(err => {
                console.log(err.response.data);
                setErrors(err.response.data.errors);
            });
    }
    function onSubmitHandler(e) {
        e.preventDefault();
        if(isCreate) {
            createMovie();
        } else {
            updateMovie();
        }
        // if(errors.length < 1) { setMovie({initialState}); }
    }
    return (
        <form onSubmit={(e) => onSubmitHandler(e)}>
            <div className="form-group">
                <label htmlFor="title">Title</label>
                <span className="error">{ errors?.title?.message }</span>
                <input className="form-control" type="text" id="title" value={title} onChange={(e) => onInputChanged('title', e.target.value)} />
            </div>
            <div className="form-group">
                <label htmlFor="director">Director</label>
                <span className="error">{ errors?.director?.message }</span>
                <input className="form-control" type="text" id="director" value={director} onChange={(e) => onInputChanged('director', e.target.value)} />
            </div>
            <div className="form-group">
                <label htmlFor="genre">Genre</label>
                <span className="error">{ errors?.genre?.message }</span>
                <input className="form-control" type="text" id="genre" value={genre} onChange={(e) => onInputChanged('genre', e.target.value)} />
            </div>
            <div className="form-group">
                <label htmlFor="releaseDate">Release Date</label>
                <span className="error">{ errors?.releaseDate?.message }</span>
                <input className="form-control" type="date" id="releaseDate" value={releaseDate} onChange={(e) => onInputChanged('releaseDate', e.target.value)} />
            </div>
            <div className="form-group">
                <label htmlFor="rating">Rating</label>
                <span className="error">{ errors?.rating?.message }</span>
                <input className="form-control" type="text" id="rating" value={rating} onChange={(e) => onInputChanged('rating', e.target.value)} />
            </div>
            <div className="form-group">
                <label htmlFor="plot">Plot</label>
                <span className="error">{ errors?.plot?.message }</span>
                <textarea className="form-control" type="text" id="plot" value={plot} onChange={(e) => onInputChanged('plot', e.target.value)}></textarea>
            </div>
            <button type="submit" className="btn btn-primary">Send</button>
            { children }
        </form>
    )
}
export default MovieForm;
