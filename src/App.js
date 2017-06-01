import React from "react"
// AppInitStore
import AppInitStore from "./configs/AppInitStore"
// Router
import RouterComponent from "./app/Router"

// Router
const App = () => {
  return (
    <RouterComponent {...AppInitStore}/> //為了相容舊系統
  )
}

export default App