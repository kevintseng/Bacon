import React from 'react'
import Router from './app/Router'
import { Provider } from 'mobx-react/native'
import AppInitStore from './configs/AppInitStore'

const App = () => {
  return (
    <Provider 
      firebase={ AppInitStore.firebase } 
      SignUpInStore={ AppInitStore.SignUpInStore } 
      SubjectStore={ AppInitStore.SubjectStore }>
      <Router/>
    </Provider>
  )
}

export default App