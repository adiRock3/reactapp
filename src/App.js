import { useState, useEffect } from 'react';
import './App.css';
import MovieCard from './moviecard'; // Capitalized to follow React convention
import SearchIcon from './search.svg';

const API_URL = 'http://www.omdbapi.com?apikey=cb876d2a';

const App = () => {
    const [movies, setMovies] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    const searchMovies = async (title) => {
        const response = await fetch(`${API_URL}&s=${title}`);
        const data = await response.json();
        setMovies(data.Search);
    };

    useEffect(() => {
        searchMovies('SpiderMan');
    }, []);

    return (
        <div className="app">
            <h1>MovieLand</h1>
            <div className="search">
                <input 
                    placeholder="Search for movies"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <img 
                    src={SearchIcon} 
                    alt="search" 
                    onClick={() => searchMovies(searchTerm)} 
                />
            </div>
            {movies?.length > 0 ? (
                <div className="container">
                    {movies.map((movie) => (
                        <MovieCard key={movie.imdbID} movie={movie} /> // Corrected the component name
                    ))}
                </div>
            ) : (
                <div className="empty">No movies found</div>
            )}
        </div>
    );
};

export default App;
