import React from "react";
import { FaEyeSlash } from "react-icons/fa";

const RemoveFromWatchlist = ({ id, setWatchListIds }) => {
  const removeFromWatchlist = () => {
    let watchListIds = JSON.parse(localStorage.getItem("wathListIds"));
    let res = watchListIds.filter((i) => i !== id);
    localStorage.setItem("wathListIds", JSON.stringify(res));
    setWatchListIds(JSON.parse(localStorage.getItem("wathListIds")));
  };
  return (
    <span
      className="removeFromWatchListBtn position-absolute   btn btn-danger"
      title="Remove from the Watch List"
      onClick={removeFromWatchlist}
    >
      <FaEyeSlash className="mb-1" />
    </span>
  );
};

export default RemoveFromWatchlist;
