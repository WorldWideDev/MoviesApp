import { Link } from '@reach/router';
const getFormattedDate = (date) => new Date(date).toLocaleDateString();
const MovieTable = (props) => {
    let { movies } = props;
    return (
        <table className="table table-dark table-striped">
            <thead>
                <tr>
                    <th>Title</th>
                    <th>Rating</th>
                    <th>Release Date</th>
                    <th>Genre</th>
                </tr>
            </thead>
            <tbody>
            {movies.map((movie, i) => {
                return (
                <tr key={movie._id}>
                    <td><Link to={`/movies/${ movie._id }`}>{ movie.title }</Link></td>
                    <td>{ movie.rating }</td>
                    <td>{ getFormattedDate(movie.releaseDate) }</td>
                    <td>{ movie.genre }</td>
                </tr>
                )
            })}
            </tbody>
        </table>
    )
}
export default MovieTable;
