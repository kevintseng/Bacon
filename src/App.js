import React from 'react'
import { Provider } from 'mobx-react/native'
// initial config
import AppInitial from './configs/AppInitial'
import Routes from './app/Routes'

const App = () => {
  return (
    <Provider 
      firebase={ AppInitial.firebase } 
      SignUpInStore={ AppInitial.SignUpInStore } 
      SubjectStore={ AppInitial.SubjectStore }>
      <Routes/>
    </Provider>
  )
}

export default App