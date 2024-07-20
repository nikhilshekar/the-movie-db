import { Routes, Route } from "react-router-dom";
import "./App.css";
import React, { useEffect, useState } from "react";
import Home from "./pages/Home";
import MovieDetail from "./pages/MovieDetail";
import WatchList from "./pages/WatchList";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import SearchResult from "./pages/SearchResult";

function App() {
  const [popularMovies, setPopularMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const [watchListIds, setWatchListIds] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchPopularMovieData = async () => {
    setLoading(true);
    await fetch(
      "https://api.themoviedb.org/3/movie/popular?page=1&language=en-US&api_key=01b5eded76ea49c5b8d81c50b6d8ecc2"
    )
      .then((res) => res.json())
      .then((data) => {
        setPopularMovies(data.results);
        setLoading(false);
      })
      .catch((error) => console.log(error));
  };

  const fetchTopRatedMoviesData = async () => {
    setLoading(true);
    await fetch(
      "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1&api_key=01b5eded76ea49c5b8d81c50b6d8ecc2"
    )
      .then((res) => res.json())
      .then((data) => {
        setTopRatedMovies(data.results);
        setLoading(false);
      })
      .catch((error) => console.log(error));
  };

  const fetchTrendingRatedMoviesData = async () => {
    setLoading(true);
    await fetch(
      "https://api.themoviedb.org/3/trending/movie/day?language=en-US&api_key=01b5eded76ea49c5b8d81c50b6d8ecc2"
    )
      .then((res) => res.json())
      .then((data) => {
        setTrendingMovies(data.results);
        setLoading(false);
      })
      .catch((error) => console.log(error));
  };

  const fetchUpcomingMoviesData = async () => {
    setLoading(true);
    await fetch(
      "https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1&api_key=01b5eded76ea49c5b8d81c50b6d8ecc2"
    )
      .then((res) => res.json())
      .then((data) => {
        setUpcomingMovies(data.results);
        setLoading(false);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    fetchPopularMovieData();
    fetchTopRatedMoviesData();
    fetchTrendingRatedMoviesData();
    fetchUpcomingMoviesData();
    setWatchListIds(JSON.parse(localStorage.getItem("wathListIds")));
  }, []);

  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <Home
              popularMovies={popularMovies}
              topRatedMovies={topRatedMovies}
              watchListIds={watchListIds}
              trendingMovies={trendingMovies}
              upcomingMovies={upcomingMovies}
              setWatchListIds={setWatchListIds}
              loading={loading}
            />
          }
        />
        <Route
          path="/movie-detail/:id"
          element={
            <MovieDetail
              watchListIds={watchListIds}
              setWatchListIds={setWatchListIds}
              loading={loading}
              setLoading={setLoading}
            />
          }
        />
         <Route
          path="/search/:value"
          element={
            <SearchResult
              watchListIds={watchListIds}
              setWatchListIds={setWatchListIds}
              loading={loading}
              setLoading={setLoading}
            />
          }
        />
        <Route
          path="/watchlist"
          element={
            <WatchList
              watchListIds={watchListIds}
              setWatchListIds={setWatchListIds}
              loading={loading}
              setLoading={setLoading}
            />
          }
        />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
