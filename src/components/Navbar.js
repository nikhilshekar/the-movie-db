import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { SiThemoviedatabase } from "react-icons/si";

const Navbar = () => {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/search/${e.target.search.value}`);
  };

  return (
    <header className=" d-flex justify-content-around align-items-center position-relative z-1 container flex-wrap gap-2">
      <div className="logo display-1">
        <SiThemoviedatabase
          onClick={(e) => {
            e.preventDefault();
            navigate("/");
          }}
        />
      </div>
      <form onSubmit={handleSubmit}>
        <div className="input-group mt-2">
          <input
            type="search"
            name="search"
            className="form-control search-field"
          />
          <span className="input-group-addon fs-6">
            <input type="submit" value="Search" className="search-btn" />
          </span>
        </div>
      </form>
      <Link to="/watchlist">
        <button className="btn btn-success">Watch List</button>
      </Link>
    </header>
  );
};

export default Navbar;
