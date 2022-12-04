import React, { Component } from 'react'
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';

import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

import Slider from "react-slick";

export default class RecommendedPuzzlesComponent extends Component {
    render() {
        const settings = {
          className: "center",
          centerMode: true,
          infinite: true,
          centerPadding: "60px",
          slidesToShow: 4,
          speed: 500
        };
        return (
          <div>
            <h2>Center Mode</h2>
            <Slider {...settings}>
              <div>
                <img src="img1.jpg" />
              </div>
              <div>
                <img src="img2.jpg" />
              </div>
              <div>
                <img src="img3.jpg" />
              </div>
              <div>
                <h3>4</h3>
              </div>
              <div>
                <img src="img5.jpg" />
              </div>
              <div>
                <img src="img6.jpg" />
              </div>
            </Slider>
          </div>
        );
      }
}


