const getFormattedDate = (date) => new Date(date).toLocaleDateString();
const MovieTable = (props) => {
    let { movies } = props;
    return (
        <table className="table table-dark table-striped">
            <thead>
                <tr>
                    <td>Title</td>
                    <td>Rating</td>
                    <td>Release Date</td>
                    <td>Genre</td>
                </tr>
            </thead>
            <tbody>
            {movies.map((movie, i) => {
                return (
                <tr key={movie._id}>
                    <td>{ movie.title }</td>
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
