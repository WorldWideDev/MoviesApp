import axios from 'axios';
import MovieTable from './MovieTable.js';
import GenreToggle from './GenreToggle.js';
import { useState, useEffect } from 'react';

function App() {

    const [movies, setMovies] = useState([]);
    useEffect(() => {
        axios.get("http://localhost:3030/api")
            .then(res => setMovies(res.data));
    }, []);
    function renderMovies() {
        return movies === null 
            ? <h1>(...loading...)</h1>
            : <MovieTable movies={movies}/>;
    }
    return (
        <section class="movies">
            <GenreToggle genres={["Action", "Romance", "Horror"]}/>
            {renderMovies()}
        </section>
    )

}

export default App;
