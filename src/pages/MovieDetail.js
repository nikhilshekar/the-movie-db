import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import dayjs from "dayjs";
import Avatar from "../assets/images/avatar.png";
import Loading from "../components/Loading";
import SimilarMovies from "../components/SimilarMovies";
import NoPoster from "../assets/images/no-poster.png";
import VideoSection from "../components/VideoSection";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import VideoPopup from "../components/VideoPopup";

const MovieDetail = ({
  setLoading,
  loading,
  watchListIds,
  setWatchListIds,
}) => {
  const { id } = useParams();
  const [movieData, setMovieData] = useState();
  const [crewData, setCrewData] = useState();
  const [castData, setCastData] = useState();
  const [videoData, setVideoData] = useState();

  useEffect(() => {
    setLoading(true);
    const fetchMovieDetails = async () => {
      const urls = [
        `https://api.themoviedb.org/3/movie/${id}?api_key=01b5eded76ea49c5b8d81c50b6d8ecc2`,
        `https://api.themoviedb.org/3/movie/${id}/credits?api_key=01b5eded76ea49c5b8d81c50b6d8ecc2`,
        `https://api.themoviedb.org/3/movie/${id}/videos?api_key=01b5eded76ea49c5b8d81c50b6d8ecc2`,
      ];
      await Promise.all(urls.map((url) => fetch(url).then((res) => res.json())))
        .then(([movieData, creditData, videoData]) => {
          setMovieData(movieData);
          setCrewData(creditData.crew);
          setCastData(creditData.cast.slice(0, 7));
          setVideoData(videoData.results);
          setLoading(false);
        })
        .catch((error) => console.log(error));
    };
    fetchMovieDetails();
  }, [id, setLoading]);

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
    <div style={{ minHeight: "80vh" }}>
      {loading ? (
        <Loading />
      ) : (
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
                  {movieData.poster_path ? (
                    <img
                      className="rounded "
                      src={`https://image.tmdb.org/t/p/w500${movieData.poster_path}`}
                      alt="poster"
                      width={"280px"}
                      height={"375px"}
                    />
                  ) : (
                    <img
                      className="rounded "
                      src={NoPoster}
                      alt="poster"
                      width={"280px"}
                      height={"375px"}
                    />
                  )}
                </div>
                <div className="m-3 mb-4" style={{ minWidth: "90%" }}>
                  <div className="d-flex justify-content-between align-items-center gap-3">
                    <div className="title fw-bolder">
                      <h3 className="h3">{movieData.title}</h3>
                    </div>
                    <div className="ratings">
                      <div style={{ width: "70px" }}>
                        <CircularProgressbar
                          value={movieData.vote_average}
                          strokeWidth={15}
                          maxValue={10}
                          text={`${movieData.vote_average.toFixed(1)}`}
                          background
                          styles={buildStyles({
                            textSize: "25px",
                            textColor: "white",
                            pathColor: "gold",
                            trailColor: "white",
                            backgroundColor: "#04152d",
                          })}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="subtitle fst-italic fw-medium fs-6">
                    {movieData.tagline}
                  </div>
                  <div className="d-flex justify-content-between align-items-center">
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
                    {videoData.length !== 0 && (
                      <div
                        className="display-4 trailer-section text-center"

                      >
                        <VideoPopup
                          video={videoData.filter(
                            (video) =>
                              video.type === "Trailer" ||
                              video.type === "Teaser"
                          )}
                        />
                      </div>
                    )}
                  </div>
                  <div className="overview fs-6 lh-sm fw-normal my-3">
                    <p>{movieData.overview}</p>
                  </div>
                  <div className="d-flex flex-wrap gap-4 justify-content-between">
                    {director.length !== 0 && (
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
                    )}

                    {writer.length !== 0 && (
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
                    )}
                    {movieData.release_date && (
                      <div className="release_date fs-6">
                        Release Date :{" "}
                        <span className="fw-light subtitle">
                          {dayjs(movieData.release_date).format("MMM D, YYYY")}
                        </span>
                      </div>
                    )}
                    {movieData.runtime !== 0 && (
                      <div className="run-time fs-6">
                        Runtime :{" "}
                        <span className="fw-light subtitle">
                          {toHoursAndMinutes(movieData.runtime)}
                        </span>
                      </div>
                    )}
                  </div>
                  {castData.length !== 0 && (
                    <div className="casting mt-5">
                      <div className="h4 fw-semibold mb-3 text-center">
                        Top Cast
                      </div>
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
                  )}
                </div>
              </div>
            </div>
          )}
          {videoData && <VideoSection data={videoData} />}
        </div>
      )}
      <SimilarMovies
        watchListIds={watchListIds}
        setWatchListIds={setWatchListIds}
        movie_id={id}
      />
    </div>
  );
};

export default MovieDetail;
