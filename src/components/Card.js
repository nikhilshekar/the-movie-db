import React from "react";
import { useNavigate } from "react-router-dom";
import AddToWatchlist from "../components/AddToWatchlist";
import RemoveFromWatchlist from "./RemoveFromWatchlist";

const Card = ({ movie, watchListIds, setWatchListIds }) => {
  const navigate = useNavigate();
  return (
    <div className="card m-3" style={{ width: "18rem" }}>
      {watchListIds && watchListIds.includes(movie.id) ? (
        <RemoveFromWatchlist
          id={movie.id}
          watchListIds={watchListIds}
          setWatchListIds={setWatchListIds}
        />
      ) : (
        <AddToWatchlist movieData={movie} setWatchListIds={setWatchListIds} />
      )}

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
  );
};

export default Card;
