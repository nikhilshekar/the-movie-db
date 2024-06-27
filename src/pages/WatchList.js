import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEyeSlash } from "react-icons/fa";

const WatchList = ({ movieList }) => {
  const [watchListIds, setWatchListIds] = useState([]);
  const [watchListMovie, setWatchListMovie] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setWatchListIds(JSON.parse(localStorage.getItem("wathListIds")));
  }, []);

  useEffect(() => {
    let movies = movieList.filter((movie) => watchListIds.includes(movie.id));
    setWatchListMovie(movies);
  }, [watchListIds, movieList]);

  const removeFromWatchlist = (id) => {
    console.log(id);
    let watchListIds = JSON.parse(localStorage.getItem("wathListIds"));
    let res = watchListIds.filter((i) => i !== id);
    localStorage.setItem("wathListIds", JSON.stringify(res));
    window.location.reload();
  };

  return (
    <div className="container">
      <div className="container d-flex justify-content-around align-content-around  flex-wrap py-3 ">
        {watchListMovie.map((movie, i) => (
          <div className="card m-3" style={{ width: "18rem" }}>
            <span className="addToWatchListBtn position-absolute   btn btn-danger"  title="Remove from the Watch List">
              <FaEyeSlash
                className="mb-1"
                onClick={() => removeFromWatchlist(movie.id)}
               
              />
            </span>
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              className="card-img-top"
              alt="poster"
              onClick={() => {
                navigate(`/movie-detail/${movie.id}`);
              }}
            />
            <div className="card-body">
              <h5 className="card-title text-center">
                {movie.original_title || movie.original_name}
              </h5>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WatchList;
