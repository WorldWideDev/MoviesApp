import axios from 'axios';
import { useState, useEffect } from 'react';
import { Router } from '@reach/router';
import API_URI from '../utilities/apiUtils.js';
import Navigation from './Navigation.js';
import MovieForm from './MovieForm.js';
import MovieDetails from './MovieDetails.js';
import MovieTable from './MovieTable.js';
import './App.css';

const moviesAreSame = (movieA, movieB) => {
    console.log(movieA, movieB);
    return (
        movieA._id === movieB._id &&
        movieA.title === movieB.title &&
        movieA.releaseDate.split('T')[0] === movieB.releaseDate.split('T')[0] &&
        movieA.genre === movieB.genre &&
        movieA.rating === movieB.rating
    )
}
function App() {

    const [movies, setMovies] = useState([]);
    useEffect(() => {
        axios.get(API_URI)
            .then(res => setMovies(res.data));
    }, []);
    const updateMovie = (movie) => {
        const idx = movies.findIndex(m => m._id === movie._id);
        if(moviesAreSame(movie, movies[idx])) { return; }
        axios.put(`${API_URI}/${movie._id}`, movie)
            .then(res => {
                const updatedMovies = [...movies];
                updatedMovies[idx] = movie;
                setMovies(updatedMovies);
            })
            .catch(err => console.log(err));
    }
    const createMovie = (movie) => {
        axios.post(API_URI, movie)
            .then(res => {
                setMovies([...movies, res.data]);
            })
            .catch(err => console.log(err));
    }
    const deleteHandler = (id) => {
        axios.delete(`${API_URI}/${id}`)
            .then((res) => {
                setMovies(movies.filter(m => m._id !== res.data.id));
            })
            .catch((err) => {
                console.log(err);
            })
    }
    return (
        <div className="">
            <h1 className="main-title">Dojo Movies</h1>
            <Navigation />
            <Router>
                <MovieTable movies={movies} default />
                <MovieForm onSubmitProp={createMovie} path="/movies/new" />
                <MovieDetails onDeleteProp={deleteHandler} onSubmitProp={updateMovie} path="/movies/:id"/>
            </Router>
        </div>
    )

}

export default App;
