import React, { Component } from 'react'
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';

export default class RecommendedPuzzlesComponent extends Component {
    render() {
        return (
            <div class="carousel-wrapper-recommended-puzzles">
                <Carousel infiniteLoop useKeyboardArrows autoPlay>
                    <div>
                        <img src="img1.jpg" />
                    </div>
                    <div>
                        <img src="img2.jpg" />
                    </div>
                    <div>
                        <img src="img3.jpg" />
                    </div>
                </Carousel>
            </div>
        );
    }
}


