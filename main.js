// Huvudkomponent för hela applikationen
class MovieApplication extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            movies: []
        };
    }

    // Funktion för att lägga till en ny film
    addMovie = (title, rating) => {
        const newMovie = { title: title, rating: rating };
        this.setState(prevState => ({
            movies: [...prevState.movies, newMovie]
        }));
    }

    // Funktion för att ta bort en film från listan
    deleteMovie = (index) => {
        this.setState(prevState => ({
            movies: prevState.movies.filter((_, i) => i !== index)
        }));
    }

    render() {
        return (
            <div className="container mt-5">
                <h1>Filmlista</h1>
                <AddMovieForm onAddMovie={this.addMovie} />
                <Movies movies={this.state.movies} onDeleteMovie={this.deleteMovie} />
            </div>
        );
    }
}

// Komponent för formuläret för att lägga till en ny film
class AddMovieForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            rating: ''
        };
    }

    // Funktion för att hantera ändringar i input-fälten
    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    // Funktion för att hantera formulärsubmit och lägga till en ny film
    handleSubmit = (e) => {
        e.preventDefault();
        const { title, rating } = this.state;
        if (!title || !rating) {
            alert('Både titel och betyg måste anges!');
            return;
        }
        this.props.onAddMovie(title, rating);
        this.setState({
            title: '',
            rating: ''
        });
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <div className="form-group">
                    <input type="text" className="form-control" name="title" value={this.state.title} onChange={this.handleChange} placeholder="Titel" />
                </div>
                <div className="form-group">
                    <input type="number" className="form-control" name="rating" value={this.state.rating} onChange={this.handleChange} placeholder="Betyg" />
                </div>
                <button type="submit" className="btn btn-primary">Lägg till film</button>
            </form>
        );
    }
}

// Komponent för att visa listan med filmer
function Movies({ movies, onDeleteMovie }) {
    return (
        <ul className="list-group mt-3">
            {movies.map((movie, index) => (
                <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                    {movie.title} <span>{'★'.repeat(movie.rating)}</span>
                    <button className="btn btn-danger btn-sm" onClick={() => onDeleteMovie(index)}>❌</button>
                </li>
            ))}
        </ul>
    );
}

// Rendera huvudkomponenten till DOM
ReactDOM.render(<MovieApplication />, document.getElementById('root'));
