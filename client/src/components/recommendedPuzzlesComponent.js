import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';

export default function RecommendedPuzzlesComponent() {
    return (
        <div class="carousel-wrapper">
            <Carousel infiniteLoop useKeyboardArrows autoPlay>
                <div>
                    <img src="C:\Users\himak\Desktop\Computer Science\Projects\Puzzle Website\Puzzle-Website\client\src\images\img1.jpg" />
                </div>
                <div>
                    <img src="C:\Users\himak\Desktop\Computer Science\Projects\Puzzle Website\Puzzle-Website\client\src\images\img2.jpgg" />
                </div>
                <div>
                    <img src="C:\Users\himak\Desktop\Computer Science\Projects\Puzzle Website\Puzzle-Website\client\src\images\img3.jpg" />
                </div>
            </Carousel>
        </div>
    );
}


