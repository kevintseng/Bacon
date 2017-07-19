import React from 'react'
import Router from './app/Router'
import { Provider } from 'mobx-react/native'
import AppInitStore from './configs/AppInitStore'

const App = () => {
  return (
    <Provider firebase={AppInitStore.firebase} signUp={AppInitStore.signUp}>
      <Router/>
    </Provider>
  )
}

export default App