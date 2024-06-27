import { Link } from "react-router-dom";
import { FaEye } from "react-icons/fa";

const MovieDetailsHeader = ({ movieData }) => {
  const addToWatchList = () => {
    let watchListIds = [];
    watchListIds = JSON.parse(localStorage.getItem("wathListIds"));
    if (!watchListIds) {
      localStorage.setItem("wathListIds", JSON.stringify(watchListIds));
    }
    watchListIds.push(movieData.id);
    watchListIds = [...new Set(watchListIds)];
    localStorage.setItem("wathListIds", JSON.stringify(watchListIds));
  };

  return (
    <header className="py-3 d-flex justify-content-between position-relative z-1">
      <Link to="/">
        <button className="btn btn-secondary">Back</button>
      </Link>
      <Link to="/watchlist">
        <button className="btn btn-success">Watchlist</button>
      </Link>

      <Link to="">
        <button className="btn btn-success">
          <span className="me-2 mb-2">
            <FaEye />
          </span>
          <span onClick={addToWatchList}>Add to Watchlist</span>
        </button>
      </Link>
    </header>
  );
};

export default MovieDetailsHeader;
