import './GenreToggle.css';
const GenreToggle = (props) => {
    const { genres } = props;
    return (
        <nav className="genre-nav">
            {genres.map((genre, i) => {
                return (
                    <button class="btn btn-warning">{genre}</button>
                )
            })}
        </nav>
    )
}
export default GenreToggle;
