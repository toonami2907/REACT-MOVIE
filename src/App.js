import { useEffect, useState } from "react";
import MovieCard from "./MovieCard";
import './App.css';
import SearchIcon from './search.svg';





const App  = () => {
    const [movies, setMovies] = useState([]);
    const [ searchTerm, setSearchTerm] = useState('');

    const searchMovies  = async (title)  => {
        const response  = await fetch(`${process.env.API_URL}&s=${title}`);
        const data  = await response.json();

        setMovies(data.Search);
    }
    useEffect(() => {
        searchMovies('spiderman');
}, []);
    return (
        <div className="app">
            <h1>REACT MOVIE</h1>

            <div className="search">
                <input 
                placeholder="Search for Movies"
                value={searchTerm}
                // defaultValue='superman'
            onChange={(e) => setSearchTerm(e.target.value)}
                />
                <img 
                src={SearchIcon} 
                alt="search"
                onClick={() => searchMovies(searchTerm)}
                />
            </div>
            {
                movies?.length > 0 
                ? (
                 <div className="container">
                   {movies && movies.map((movie, idx) => (
                    <MovieCard key={idx} movie={movie}/>
                   ))}
                </div>
                ) : (
                    <div className="empty">
                      <h2>NO MOVIES FOUND</h2>
                    </div>
                )
            }
           
        </div>
    );
}

export default App;