// File for dashboard page

import RecommendedPuzzlesComponent from "../components/recommendedPuzzlesComponent"
import React, { useState } from 'react';
import axios from 'axios';

export default function DashboardPage() {
    const[image, updatedImage] = useState("");

    axios.get('http://localhost:4002/getAllPuzzles')
    .then(res => {
      //console.log(res.data[0].img);
      updatedImage(res.data[0].img);
    }).catch(err => {
      console.log(err);
    })    

    return (

        <div>
            <RecommendedPuzzlesComponent />
            <img width="500" height="500" src={image} alt="idk"/>

        </div>       
        
    )
  }