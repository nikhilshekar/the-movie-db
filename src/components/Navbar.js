import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { SiThemoviedatabase } from "react-icons/si";

const Navbar = () => {
  const navigate = useNavigate();
  return (
    <header className=" d-flex justify-content-between align-items-center position-relative z-1 container">
      <div className="logo display-1">
        <SiThemoviedatabase
          onClick={(e) => {
            e.preventDefault();
            navigate("/");
          }}
        />
      </div>
      <Link to="/watchlist">
        <button className="btn btn-success">Watch List</button>
      </Link>
    </header>
  );
};

export default Navbar;
