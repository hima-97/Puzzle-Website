import React, { Component } from 'react'
import Slider from "react-slick";

import "react-responsive-carousel/lib/styles/carousel.min.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default class RecommendedPuzzlesComponent extends Component {
  render() {
    const settings = {
      centerMode: false,
      infinite: false,
      slidesToShow: 5,
      speed: 500
    };
    return (
      <div className="carousel-wrapper-recommended-puzzles m-5 px-5">
        <h2>Recommended Puzzles</h2>
        <Slider {...settings}>
          <div>
            <img className="w-100" style={{ aspectRatio: 1 / 1 }} alt="" src="img1.jpg" />
          </div>
          <div>
            <img className="w-100" style={{ aspectRatio: 1 / 1 }} alt="" src="img2.jpg" />
          </div>
          <div>
            <img className="w-100" style={{ aspectRatio: 1 / 1 }} alt="" src="img3.jpg" />
          </div>
          <div>
            <img className="w-100" style={{ aspectRatio: 1 / 1 }} alt="" src="img4.jpg" />
          </div>
          <div>
            <img className="w-100" style={{ aspectRatio: 1 / 1 }} alt="" src="img5.jpg" />
          </div>
          <div>
            <img className="w-100" style={{ aspectRatio: 1 / 1 }} alt="" src="img6.jpg" />
          </div>
        </Slider>
      </div>
    );
  }
}

