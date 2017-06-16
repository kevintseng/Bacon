import React, { Component } from 'react'
import { Actions } from 'react-native-router-flux'
import { inject, observer } from 'mobx-react/native'
import { View } from "react-native"
// views
import PhotoView from "../../views/AboutMe/PhotoView"

@inject("SubjectStore") @observer
export default class PhotoContainer extends Component {

  componentWillMount() {
    //console.warn("AboutMeShow")
    Actions.refresh({ key: 'drawer', open: false })
  }

  render() {

    return(
      <View style={{flex: 1}}>
        <PhotoView/>
      </View>
    )
  }
}
