import React from "react";
import { Link } from "react-router-dom";
import {
  FaFacebookF,
  FaInstagram,
  FaXTwitter,
  FaLinkedin,
} from "react-icons/fa6";

const Footer = () => {
  return (
    <footer>
      <div className="d-flex justify-content-center gap-3 p-4 container fs-6 flex-wrap">
        <div className="">
          <Link to="">Terms of Use</Link>
        </div>
        <div className="">
          <Link to="">Privacy-Policy</Link>
        </div>
        <div className="">
          <Link to="">About</Link>
        </div>
        <div className="">
          <Link to="">FAQ</Link>
        </div>
      </div>
      <div>
        <p className="fs-6 container text-center text-mute p-sm-2">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur.
        </p>
      </div>
      <div className="d-flex justify-content-center gap-4 container fs-6 flex-wrap pb-4">
        <div className="footer-btns border border-1 rounded p-1 pb-2 px-3">
          <Link to="">
            <FaFacebookF />
          </Link>
        </div>
        <div className="footer-btns border border-1 rounded p-1 pb-2 px-3">
          <Link to="">
            <FaInstagram />
          </Link>
        </div>
        <div className="footer-btns border border-1 rounded p-1 pb-2 px-3">
          <Link to="">
            <FaXTwitter />
          </Link>
        </div>
        <div className="footer-btns border border-1 rounded p-1 pb-2 px-3">
          <Link to="">
            <FaLinkedin />
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
