import React from "react";
import { FaEye } from "react-icons/fa";

const AddToWatchlist = ({ movieData,setWatchListIds }) => {
  const addToWatchList = () => {
    let watchListIds = [];
    watchListIds = JSON.parse(localStorage.getItem("wathListIds"));
    if (!watchListIds) {
      watchListIds = [];
    }
    localStorage.setItem("wathListIds", JSON.stringify(watchListIds));
    watchListIds.push(movieData.id);
    watchListIds = [...new Set(watchListIds)];
    localStorage.setItem("wathListIds", JSON.stringify(watchListIds));
    setWatchListIds(JSON.parse(localStorage.getItem("wathListIds")));
  };

  return (
    <span
      className="addToWatchListBtn position-absolute   btn btn-secondary"
      onClick={addToWatchList}
      title="Add to Watch List"
    >
      <FaEye className="mb-1" />
    </span>
  );
};

export default AddToWatchlist;
