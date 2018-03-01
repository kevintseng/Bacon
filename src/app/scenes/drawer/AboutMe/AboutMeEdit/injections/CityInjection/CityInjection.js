import React, { Component } from 'react'
import { View } from 'react-native'
import { inject, observer } from 'mobx-react'

import BaconRoutesContainer from './containers/BaconRoutesContainer'
import CityChooseContainer from './containers/CityChooseContainer'

const styles = {
  view: {
    flex: 1,
    alignItems: 'center'
  },
  routes: {
    position: 'absolute', 
    bottom: 0
  }
}

@inject('firebase','SubjectEditStore','SubjectStore') @observer
export default class CityInjection extends Component {

  constructor(props) {
    super(props)
    this.firebase = this.props.firebase
    this.SubjectEditStore = this.props.SubjectEditStore
    this.SubjectStore = this.props.SubjectStore  
  }

  componentWillMount() {
    this.SubjectEditStore.setAddress(this.SubjectStore.address)      
  }

  render() {
    return(
      <View style={styles.view}>
        <CityChooseContainer/>
        <View style={styles.routes}>
          <BaconRoutesContainer/>
        </View>
      </View>
    )
  }
}