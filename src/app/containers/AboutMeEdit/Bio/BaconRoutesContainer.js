import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { Actions } from 'react-native-router-flux'

import BaconRoutes from '../../../views/BaconRoutes/BaconRoutes'

@inject("SignUpInStore") @observer
export default class BaconRoutesContainer extends Component {

  constructor(props) {
    super(props)
    this.SignUpInStore = this.props.SignUpInStore
  }
  
  buttonOnPress = () => {
    if (this.SignUpInStore.bio) {
      Actions.AboutMeTab({type: 'reset'})
    } else {
      alert('請填入自我介紹')
    }
  }

  render() {
    return(
      <BaconRoutes
        routesText='下一步'
        routesOnPress={ this.buttonOnPress } 
      />
    )
  }
}