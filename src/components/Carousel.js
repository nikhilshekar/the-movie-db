import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Card from "./Card";

const Carousel = ({ movies, watchListIds, setWatchListIds }) => {
  const settings = {
    infinite: true,
    className: "center",
    lazyLoad: true,
    slidesToShow: 5,
    slidesToScroll: 4,
    autoplaySpeed: 7000,
    cssEase: "ease-in-out",
    pauseOnHover: true,
    speed: 500,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 650,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <div className="slider-container  text-center container">
      <Slider {...settings}>
        {movies &&
          movies.map((movie, i) => (
              <Card
                movie={movie}
                watchListIds={watchListIds}
                setWatchListIds={setWatchListIds}
                key={i}
              />
          ))}
      </Slider>
    </div>
  );
};

export default Carousel;
