import React from "react"
import { Provider } from "mobx-react/native"
// AppInitStore
import AppInitStore from "./configs/AppInitStore"
// Router
import RouterComponent from "./app/Router"

// Router
const App = () => {
  return (
    <Provider firebase={AppInitStore.firebase} signUp={AppInitStore.signUp}>
      <RouterComponent />
    </Provider>
  )
}

export default App

/*

      firebase={AppInitStore.firebase} 
      ui={AppInitStore.ui} 
      wooer={AppInitStore.wooer} 
      meetCute={AppInitStore.meetCute} 
      meetChance={AppInitStore.meetChance} 
      fate={AppInitStore.fate}
      singUp={AppInitStore.singUp}
*/