import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FaStar, FaStarHalf } from "react-icons/fa6";
import dayjs from "dayjs";


const MovieDetail = () => {
  const { id } = useParams();
  const [movieData, setMovieData] = useState();

  useEffect(() => {
    const fetchMovieDetails = async () => {
      return await fetch(
        `https://api.themoviedb.org/3/movie/${id}?api_key=01b5eded76ea49c5b8d81c50b6d8ecc2`
      )
        .then((res) => res.json())
        .then((data) => setMovieData(data))
        .catch((err) => console.log(err));
    };
    fetchMovieDetails();
  }, [id]);

  const toHoursAndMinutes = (totalMinutes) => {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return `${hours}h${minutes > 0 ? ` ${minutes}m` : ""}`;
  };

  return (
    <div className="container mt-3">
      {movieData && (
        <div className="details-banner">
          <div>
            <span>
              
              <img
                className="backdrop-img"
                src={
                  `https://image.tmdb.org/t/p/original${movieData.backdrop_path}` ||
                  `https://image.tmdb.org/t/p/w500${movieData.poster_path}`
                }
                alt="banner"
              />
            </span>
          </div>
          <div className="opacity-layer"></div>
          <div
            className="details d-flex flex-wrap  justify-content-center"
            style={{ gap: "1rem" }}
          >
            <div>
              <img
                className="rounded "
                src={`https://image.tmdb.org/t/p/w500${movieData.poster_path}`}
                alt="poster"
                width={"280px"}
                height={"375px"}
              />
            </div>
            <div className="m-3" style={{ minWidth: "90%" }}>
              <div className="d-flex justify-content-between">
                <div className="title fw-bolder mb-1">
                  <h2>{movieData.title}</h2>
                </div>
                <div className="ratings mt-1 ms-2">
                  {[...Array(Math.floor(movieData.vote_average))].map(
                    (e, i) => {
                      return (
                        <span key={i}>
                          <FaStar />
                        </span>
                      );
                    }
                  )}
                  {movieData.vote_average % 1 ? <FaStarHalf /> : null}
                </div>
              </div>

              <div className="subtitle fst-italic fw-medium fs-6">
                {movieData.tagline}
              </div>
              <div className="genres">
                {movieData.genres.map((genre, i) => (
                  <div
                    className="badge text-bg-primary fs-6 fw-lighter me-1 mt-1"
                    key={i}
                  >
                    {genre.name}
                  </div>
                ))}
              </div>
              <div className="overview fs-5 lh-sm fw-light my-3">
                <p>{movieData.overview}</p>
              </div>
              <div className="d-flex flex-wrap gap-4">
                <div className="release_date fs-6">
                  Release Date:{" "}
                  <span className="fw-light subtitle">
                    {dayjs(movieData.release_date).format("MMM D, YYYY")}
                  </span>
                </div>
                <div className="run-time fs-6">
                  Runtime:{" "}
                  <span className="fw-light subtitle">
                    {toHoursAndMinutes(movieData.runtime)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieDetail;
