import React from "react"
// AppInitStore
import AppInitStore from "./configs/AppInitStore"
// Router
import RouterComponent from "./app/Router"

// Router
const App = () => {
  return (
    <RouterComponent firebase={AppInitStore.firebase} ui={AppInitStore.ui} wooer={AppInitStore.wooer} meetCute={AppInitStore.meetCute} meetChance={AppInitStore.meetChance} fate={AppInitStore.fate}/> //為了相容舊系統
  )
}

export default App