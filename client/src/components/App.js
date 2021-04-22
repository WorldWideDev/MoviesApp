import axios from 'axios';
import Typography from 'typography';
import funstonTheme from 'typography-theme-funston';
import { Router, navigate } from '@reach/router';
import Navigation from './Navigation.js';
import MovieForm from './MovieForm.js';
import MovieDetails from './MovieDetails.js';
import MovieTable from './MovieTable.js';
import '../styles/_main.scss';

const typography = new Typography(funstonTheme);
const moviesAreSame = (movieA, movieB) => {
    return (
        movieA._id === movieB._id &&
        movieA.title === movieB.title &&
        movieA.releaseDate.split('T')[0] === movieB.releaseDate.split('T')[0] &&
        movieA.genre === movieB.genre &&
        movieA.plot === movieB.plot &&
        movieA.rating === movieB.rating
    )
}
function App() {
    return (
        <div className="">
            <header>
            { typography.injectStyles() }
                <h1 className="main-title">Dojo Movies</h1>
            </header>
            <Navigation />
            <Router>
                <MovieTable movies={movies} default />
                <MovieForm isCreate={true} path="/movies/new" />
                <MovieDetails onDeleteProp={deleteHandler} path="/movies/:id"/>
            </Router>
        </div>
    )

}

export default App;
