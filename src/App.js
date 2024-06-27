import { Routes, Route } from "react-router-dom";
import "./App.css";
import React, { useEffect, useState } from "react";
import Home from "./pages/Home";
import MovieDetail from "./pages/MovieDetail";
import WatchList from "./pages/WatchList";
import Navbar from "./components/Navbar";

function App() {
  const [movieList, setMovieList] = useState([]);

  const fetchMovieData = async () => {
    const urls = [
      "https://api.themoviedb.org/3/discover/movie?page=1&language=en-US&api_key=01b5eded76ea49c5b8d81c50b6d8ecc2",
      "https://api.themoviedb.org/3/discover/movie?page=2&language=en-US&api_key=01b5eded76ea49c5b8d81c50b6d8ecc2",
    ];
    Promise.all(urls.map((url) => fetch(url).then((r) => r.json())))
      .then(([res1, res2]) => {
        setMovieList([...res1.results, ...res2.results]);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    fetchMovieData();
  }, []);

  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home movieList={movieList} />} />
        <Route path="/movie-detail/:id" element={<MovieDetail />} />
        <Route
          path="/watchlist"
          element={<WatchList movieList={movieList} />}
        />
      </Routes>
    </div>
  );
}

export default App;
