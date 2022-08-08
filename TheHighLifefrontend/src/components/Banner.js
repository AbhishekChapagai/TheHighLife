import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";

const Banner = () => {
  return (
    <Carousel
      infiniteLoop
      autoPlay
      showThumbs={false}
      showStatus={false}
      useKeyboardArrows
      className="presentation__mode"
    >
      <div>
        <img
          src="https://dokansewa.com/image/cache/catalog/demo/slideshow/home2/id2-slide1-1920x510.jpg"
          alt="slider 1"
        />
        <p className="legend">Mac Book Pro</p>
      </div>
      <div>
        <img
          src="https://dokansewa.com/image/cache/catalog/demo/slideshow/home2/id2-slide2-1920x510.jpg"
          alt="slider 2"
        />
        <p className="legend">Women Fashion</p>
      </div>
      <div>
        <img
          src="https://dokansewa.com/image/cache/catalog/demo/slideshow/home2/id2-slide3-1920x510.jpg"
          alt="slider 3"
        />
        <p className="legend">Men Shoes</p>
      </div>
    </Carousel>
  );
};

export default Banner;
