import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FaStar, FaStarHalf } from "react-icons/fa6";
import dayjs from "dayjs";
import Avatar from "../assets/images/avatar.png";

const MovieDetail = () => {
  const { id } = useParams();
  const [movieData, setMovieData] = useState();
  const [crewData, setCrewData] = useState();
  const [castData, setCastData] = useState();

  useEffect(() => {
    const fetchMovieDetails = async () => {
      const urls = [
        `https://api.themoviedb.org/3/movie/${id}?api_key=01b5eded76ea49c5b8d81c50b6d8ecc2`,
        `https://api.themoviedb.org/3/movie/${id}/credits?api_key=01b5eded76ea49c5b8d81c50b6d8ecc2`,
      ];
      await Promise.all(urls.map((url) => fetch(url).then((res) => res.json())))
        .then(([movieData, creditData]) => {
          setMovieData(movieData);
          setCrewData(creditData.crew);
          setCastData(creditData.cast.slice(0, 7));
        })
        .catch((error) => console.log(error));
    };
    fetchMovieDetails();
  }, [id]);


  const toHoursAndMinutes = (totalMinutes) => {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return `${hours}h${minutes > 0 ? ` ${minutes}m` : ""}`;
  };

  const director = crewData?.filter((c) => c.job === "Director");
  const writer = crewData?.filter(
    (c) => c.job === "Screenplay" || c.job === "Story" || c.job === "Writer"
  );

  return (
    <div className="container mt-3">
      {movieData && (
        <div className="details-banner">
          <div>
            {movieData.poster_path && (
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
            )}
          </div>
          <div className="opacity-layer"></div>
          <div className="details d-flex flex-wrap  justify-content-center">
            <div>
              <img
                className="rounded "
                src={`https://image.tmdb.org/t/p/w500${movieData.poster_path}`}
                alt="poster"
                width={"280px"}
                height={"375px"}
              />
            </div>
            <div className="m-3 mb-4" style={{ minWidth: "90%" }}>
              <div className="d-flex justify-content-between">
                <div className="title fw-bolder mb-1 ">
                  <h3 className="h3">{movieData.title}</h3>
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
              <div className="overview fs-6 lh-sm fw-normal my-3">
                <p>{movieData.overview}</p>
              </div>
              <div className="d-flex flex-wrap gap-4 justify-content-between">
                <div className="release_date fs-6">
                  Director :{" "}
                  <span className="fw-light subtitle">
                    {director?.map((d, i) => (
                      <span key={i}>
                        {d.name}
                        {director.length - 1 !== i && ", "}
                      </span>
                    ))}
                  </span>
                </div>
                <div className="release_date fs-6">
                  Writer :{" "}
                  <span className="fw-light subtitle">
                    {writer?.map((w, i) => (
                      <span key={i}>
                        {w.name}
                        {writer.length - 1 !== i && ", "}
                      </span>
                    ))}
                  </span>
                </div>
                <div className="release_date fs-6">
                  Release Date :{" "}
                  <span className="fw-light subtitle">
                    {dayjs(movieData.release_date).format("MMM D, YYYY")}
                  </span>
                </div>
                <div className="run-time fs-6">
                  Runtime :{" "}
                  <span className="fw-light subtitle">
                    {toHoursAndMinutes(movieData.runtime)}
                  </span>
                </div>
              </div>
              <div className="casting my-3">
                <div className="h5 fw-semibold mb-3">Top Cast</div>
                <div className="d-flex flex-wrap gap-3 justify-content-around align-self-stretch">
                  {castData?.map((item) => {
                    let imgUrl = item.profile_path
                      ? `https://image.tmdb.org/t/p/w500${item.profile_path}`
                      : Avatar;
                    return (
                      <div key={item.id} className="castListItem">
                        <div className="text-center">
                          <img
                            className="rounded-circle"
                            width={"150px"}
                            height={"150px"}
                            alt=" "
                            src={imgUrl}
                            style={{ objectFit: "cover" }}
                          />
                        </div>
                        <div className="fs-6 fw-bold text-center">
                          {item.name}
                        </div>
                        <div className="fs-6 fw-lighter text-center">
                          {item.character}
                        </div>
                      </div>
                    );
                  })}
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
