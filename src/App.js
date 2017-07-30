import React, { Component } from 'react'
import { Provider } from 'mobx-react/native'
// initial config
import AppInitial from './configs/AppInitial'
import Routes from './app/Routes'

export default class App extends Component {

  render() {
    return (
      <Provider 
        firebase={ AppInitial.firebase } 
        SignUpInStore={ AppInitial.SignUpInStore } 
        SubjectStore={ AppInitial.SubjectStore }>
        <Routes/>
      </Provider>
    )
  }
}