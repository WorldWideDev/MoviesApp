import './MovieForm.css';
import { navigate } from '@reach/router';
import {useState} from 'react';
const getFormReadyDate = (date=null) => {
    return new Date(date).toISOString().split('T')[0];
}
const INITIAL_MOVIE_STATE = {
    title: '',
    genre: '',
    releaseDate: getFormReadyDate(),
    rating: ''
}
const RATINGS = ['G', 'PG', 'PG-13', 'R', 'NC-17', 'Unrated'];
const MovieForm = (props) => {
    const initialState = (props.movie === undefined)
        ? INITIAL_MOVIE_STATE
        : {...props.movie, releaseDate:getFormReadyDate(props.movie.releaseDate)};
    const { action } = props;
    const {onSubmitProp} = props;
    const [movie, setMovie] = useState({...initialState});
    const {title, genre, releaseDate, rating} = movie;
    function onInputChanged(field, value) {
        setMovie({ ...movie, [field]:value});
    }
    function onSubmitHandler(e) {
        e.preventDefault();
        onSubmitProp(movie);
        setMovie({...INITIAL_MOVIE_STATE});
        navigate('/');
    }
    return (
        <form onSubmit={(e) => onSubmitHandler(e)}>
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
