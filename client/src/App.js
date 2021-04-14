import axios from 'axios';
import MovieTable from './MovieTable.js';
import './App.css';
import GenreToggle from './GenreToggle.js';
import MovieForm from './MovieForm.js';
import { useState, useEffect } from 'react';

function App() {

    const [movies, setMovies] = useState([]);
    useEffect(() => {
        axios.get("http://localhost:3030/api")
            .then(res => setMovies(res.data));
    }, []);
    const createMovie = (movie) => {
        axios.post('http://localhost:3030/api', movie)
            .then(res => {
                setMovies([...movies, res.data]);
            })
            .catch(err => console.log(err));
    }
    return (
        <div className="container">
            <h1 className="main-title">Dojo Movies</h1>
            <main>
                <section>
                    <MovieForm onSubmitProp={createMovie}/>
                </section>
                <section className="movies">
                    <MovieTable movies={movies}/>
                </section>
            </main>
        </div>
    )

}

export default App;
