import "./App.css";
import { useEffect, useState } from "react";
import { getMoviesList, searchMovie } from "./api";

function App() {
  const [popularMovies, setPopularMovies] = useState([]);

  useEffect(() => {
    getMoviesList().then((result) => {
      setPopularMovies(result);
    });
  }, []);

  const PopularMovieList = () => {
    return popularMovies.map((movie, i) => {
      return (
        <div className="Movie-wrapper" key={i}>
          <div className="Movie-title">{movie.title}</div>
          <img
            className="Movie-image"
            src={`${process.env.REACT_APP_BASEIMGURL}/${movie.poster_path}`}
            alt=""
          />
          <div className="Movie-date">Release: {movie.release_date}</div>
          <div className="Movie-rate">{movie.vote_average}</div>
        </div>
      );
    });
  };

  const search = async (q) => {
    if (q.length > 3) {
      const query = await searchMovie(q);
      setPopularMovies(query.results);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Shuuhei Movie</h1>
        <input
          type="text"
          placeholder="Search"
          className="Movie-search"
          onChange={({ target }) => search(target.value)}
        />
        <div className="Movie-container">
          <PopularMovieList></PopularMovieList>
        </div>
      </header>
    </div>
  );
}

export default App;
