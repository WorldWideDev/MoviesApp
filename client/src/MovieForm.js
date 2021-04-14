import './MovieForm.css';
import axios from 'axios';
import {useState} from 'react';
const INITIAL_MOVIE_STATE = {
    title: '',
    genre: '',
    releaseDate: new Date().toISOString().split('T')[0],
    rating: ''
}
const RATINGS = ['G', 'PG', 'PG-13', 'R', 'NC-17', 'Unrated'];
const MovieForm = (props) => {
    const {onSubmitProp} = props;
    const [movie, setMovie] = useState({...INITIAL_MOVIE_STATE});
    const {title, genre, releaseDate, rating} = movie;
    function onInputChanged(field, value) {
        let tempMovieState = {...movie};
        tempMovieState[field] = value;
        setMovie(tempMovieState);
    }
    function onSubmitHandler(e) {
        e.preventDefault();
        onSubmitProp(movie);
        setMovie({...INITIAL_MOVIE_STATE});
    }
    return (
        <form onSubmit={onSubmitHandler}>
            <div className="form-group">
                <label htmlFor="title">Title</label>
                <input className="form-control" type="text" id="title" value={title} onChange={(e) => onInputChanged('title', e.target.value)} />
            </div>
            <div className="form-group">
                <label htmlFor="genre">Genre</label>
                <input className="form-control" type="text" id="genre" value={genre} onChange={(e) => onInputChanged('genre', e.target.value)} />
            </div>
            <div className="form-group">
                <label htmlFor="releaseDate">Release Date</label>
                <input className="form-control" type="date" id="releaseDate" value={releaseDate} onChange={(e) => onInputChanged('releaseDate', e.target.value)} />
            </div>
            <div className="form-group">
                <label htmlFor="rating">Rating</label>
                <input className="form-control" type="text" id="rating" value={rating} onChange={(e) => onInputChanged('rating', e.target.value)} />
            </div>
            <button type="submit" className="btn btn-primary">Send</button>
        </form>
    )
}
export default MovieForm;
