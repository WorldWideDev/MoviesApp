import { navigate } from '@reach/router';
import {useState} from 'react';
const getFormReadyDate = (date=null) => {
    const dt = (date === null) ? new Date() : new Date(date);
    return dt.toISOString().split('T')[0];
}
const INITIAL_MOVIE_STATE = {
    title: '',
    genre: '',
    plot: '',
    releaseDate: getFormReadyDate(),
    rating: ''
}
// const RATINGS = ['G', 'PG', 'PG-13', 'R', 'NC-17', 'Unrated'];
const MovieForm = (props) => {
    console.log("rendering movie form");
    const initialState = (props.movie === undefined)
        ? INITIAL_MOVIE_STATE
        : {...props.movie, releaseDate:getFormReadyDate(props.movie.releaseDate)};
    const { errors, onSubmitProp, children } = props;
    const [movie, setMovie] = useState({...initialState});
    const {title, genre, releaseDate, rating, plot} = movie;
    function onInputChanged(field, value) {
        setMovie({ ...movie, [field]:value});
    }
    function onSubmitHandler(e) {
        e.preventDefault();
        onSubmitProp(movie);
        if(errors.length < 1) { setMovie({...INITIAL_MOVIE_STATE}); }
        //navigate('/');
    }
    return (
        <form onSubmit={(e) => onSubmitHandler(e)}>
            <div className="form-group">
                <label htmlFor="title">Title</label>
                <span className="error">{ errors?.title?.message }</span>
                <input className="form-control" type="text" id="title" value={title} onChange={(e) => onInputChanged('title', e.target.value)} />
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
