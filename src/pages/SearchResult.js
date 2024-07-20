import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loading from "../components/Loading";
import Card from "../components/Card";

const SearchResult = ({
  loading,
  setLoading,
  watchListIds,
  setWatchListIds,
}) => {
  const { value } = useParams();
  const [result, setResults] = useState([]);

  useEffect(() => {
    setLoading(true);
    const fetchSearchData = async () => {
      await fetch(
        `https://api.themoviedb.org/3/search/movie?query=${value}&api_key=01b5eded76ea49c5b8d81c50b6d8ecc2`
      )
        .then((response) => response.json())
        .then((response) => {
          setResults(response.results);
          setLoading(false);
        })
        .catch((err) => console.error(err));
    };
    fetchSearchData();
  }, [value, setLoading]);

  return (
    <div className="container">
      {loading ? (
        <Loading />
      ) : (
        <div
          className="container d-flex justify-content-around align-content-around  flex-wrap py-3 "
          style={{ minHeight: "74vh" }}
        >
          {result ? (
            result.map((movie, i) => (
                <Card
                movie={movie}
                watchListIds={watchListIds}
                setWatchListIds={setWatchListIds}
                key={i}
              />
            ))
          ) : (
            <h3 className="h3 mb-5">
              <strong>No result found!</strong>
            </h3>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchResult;
