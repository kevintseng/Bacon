import React, { Component } from 'react'
import Orientation from 'react-native-orientation-locker'
import { Provider } from 'mobx-react/native'
// initial config
import AppInitial from './configs/AppInitial'
import Routes from './app/Routes'

export default class App extends Component {

  componentWillMount() {
    Orientation.lockToPortrait()
  }

  render() {
    return (
      <Provider
        firebase={AppInitial.firebase}

        ControlStore={AppInitial.ControlStore}

        SignUpStore={AppInitial.SignUpStore}
        SignInStore={AppInitial.SignInStore}
        PasswordStore={AppInitial.PasswordStore}
        SubjectStore={AppInitial.SubjectStore}
        SubjectEditStore={AppInitial.SubjectEditStore}
        MeetChanceStore={AppInitial.MeetChanceStore}
        MeetCuteStore={AppInitial.MeetCuteStore}
        FateStore={AppInitial.FateStore}
        LineStore={AppInitial.LineStore}
      >
        <Routes />
      </Provider>
    )
  }
}
//SignUpInStore={ AppInitial.SignUpInStore }
