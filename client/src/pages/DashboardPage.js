// File for dashboard page

import RecommendedPuzzlesComponent from "../components/recommendedPuzzlesComponent"
import FavoritePuzzlesComponent from "../components/favoritePuzzlesComponent"
import './DashboardPage.css'

export default function DashboardPage() {
    return (
        <>
            <RecommendedPuzzlesComponent />
            <FavoritePuzzlesComponent />
        </>
    )
  }