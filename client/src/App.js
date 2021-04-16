import axios from 'axios';
import MovieTable from './MovieTable.js';
import './App.css';
import GenreToggle from './GenreToggle.js';
import Navigation from './Navigation.js';
import MovieForm from './MovieForm.js';
import MovieDetails from './MovieDetails.js';
import { useState, useEffect } from 'react';
import { Router } from '@reach/router';

function App() {

    const [movies, setMovies] = useState([]);
    useEffect(() => {
        axios.get("http://localhost:3030/api")
            .then(res => setMovies(res.data));
    }, []);
    const updateMovie = (movie) => {
        axios.put(`http://localhost:3030/api/${movie._id}`, movie)
            .then(res => {
                setMovies([...movies, res.data]);
            })
            .catch(err => console.log(err));
    }
    const createMovie = (movie) => {
        axios.post('http://localhost:3030/api', movie)
            .then(res => {
                setMovies([...movies, res.data]);
            })
            .catch(err => console.log(err));
    }
    return (
        <div className="">
            <h1 className="main-title">Dojo Movies</h1>
            <Navigation />
            <Router>
                <MovieTable movies={movies} default />
                <MovieForm action={'post'} onSubmitProp={createMovie} path="/movies/new" />
                <MovieDetails onSubmitProp={updateMovie} path="/movies/:id"/>
            </Router>
        </div>
    )

}

export default App;
