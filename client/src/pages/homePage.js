// File for home page

import RecommendedPuzzlesComponent from "../components/recommendedPuzzlesComponent"
import FavoritePuzzlesComponent from "../components/favoritePuzzlesComponent"
//import './HomePage.css'

export default function HomePage() {
  return (
    <>
        <RecommendedPuzzlesComponent />
        <FavoritePuzzlesComponent />
    </>
)
  }