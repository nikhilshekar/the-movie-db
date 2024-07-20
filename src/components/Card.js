import React from "react";
import { useNavigate } from "react-router-dom";
import AddToWatchlist from "../components/AddToWatchlist";
import RemoveFromWatchlist from "./RemoveFromWatchlist";
import NoPoster from "../assets/images/no-poster.png";

const Card = ({ movie, watchListIds, setWatchListIds }) => {
  const navigate = useNavigate();
  let imgUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : NoPoster;

  return (
    <div className="card m-3">
      {watchListIds && watchListIds.includes(movie.id) ? (
        <RemoveFromWatchlist id={movie.id} setWatchListIds={setWatchListIds} />
      ) : (
        <AddToWatchlist id={movie.id} setWatchListIds={setWatchListIds} />
      )}
      <img
        src={imgUrl}
        className="card-img-top rounded"
        alt="poster"
        onClick={() => {
          navigate(`/movie-detail/${movie.id}`);
        }}
      />

      <div className="card-body">
        <h6 className="card-title text-center" style={{ color: "darkcyan" }}>
          {movie.title || movie.original_title || movie.original_name}
        </h6>
      </div>
    </div>
  );
};

export default Card;
