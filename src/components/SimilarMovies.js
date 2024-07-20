import React, { useEffect, useState } from "react";
import Carousel from "./Carousel";

const SimilarMovies = ({ movie_id, watchListIds, setWatchListIds }) => {
  const [result, setResults] = useState([]);

  useEffect(() => {
    const fetchSiliarMovies = async () => {
      await fetch(
        `https://api.themoviedb.org/3/movie/${movie_id}/recommendations?api_key=01b5eded76ea49c5b8d81c50b6d8ecc2`
      )
        .then((response) => response.json())
        .then((response) => setResults(response.results))
        .catch((err) => console.error(err));
    };
    fetchSiliarMovies();
  }, [movie_id]);

  return (
    <>
      {result.length !== 0 && (
        <div className="container mb-2 px-4">
          <div className="h4 fw-semibold text-center">Similar Movies</div>
          <Carousel
            movies={result}
            watchListIds={watchListIds}
            setWatchListIds={setWatchListIds}
          />
        </div>
      )}
    </>
  );
};

export default SimilarMovies;
