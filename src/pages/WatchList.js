import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import RemoveFromWatchlist from "../components/RemoveFromWatchlist";

const WatchList = ({ movieList, watchListIds, setWatchListIds }) => {
  const [watchListMovie, setWatchListMovie] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    let movies =[];
    if (watchListIds) {
      movies = movieList.filter((movie) => watchListIds.includes(movie.id));
    }
    setWatchListMovie(movies);
  }, [watchListIds, movieList]);

  return (
    <div className="container">
      <div className="container d-flex justify-content-around align-content-around  flex-wrap py-3 ">
        {watchListMovie.length !== 0 ? (
          watchListMovie.map((movie, i) => (
            <div className="card m-3" style={{ width: "18rem" }} key={i}>
              <RemoveFromWatchlist
                id={movie.id}
                setWatchListIds={setWatchListIds}
              />
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
          ))
        ) : (
          <h3 className="h3 mt-5">
            <strong>Your Watch List is empty!</strong>
          </h3>
        )}
      </div>
    </div>
  );
};

export default WatchList;
