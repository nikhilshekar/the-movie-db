import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import RemoveFromWatchlist from "../components/RemoveFromWatchlist";
import Loading from "../components/Loading";

const WatchList = ({ watchListIds, setWatchListIds, loading, setLoading }) => {
  const [watchListMovie, setWatchListMovie] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setWatchListMovie([]);
    watchListIds.map((id) => {
      fetch(
        `https://api.themoviedb.org/3/movie/${id}?language=en-US&api_key=01b5eded76ea49c5b8d81c50b6d8ecc2`
      )
        .then((response) => response.json())
        .then((response) => {
          setWatchListMovie((prev) => [...prev, response]);
        })
        .catch((err) => console.error(err));
      return null;
    });
  }, [watchListIds, setLoading]);

  return (
    <div className="container">
      {loading ? (
        <Loading />
      ) : (
        <div
          className="container d-flex justify-content-around align-content-around  flex-wrap py-3 "
          style={{ minHeight: "74vh" }}
        >
          {watchListMovie && watchListMovie.length !== 0 ? (
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
                    {movie.title || movie.original_title || movie.original_name}
                  </h5>
                </div>
              </div>
            ))
          ) : (
            <h3 className="h3 mb-5">
              <strong>Your Watch List is empty!</strong>
            </h3>
          )}
        </div>
      )}
    </div>
  );
};

export default WatchList;
