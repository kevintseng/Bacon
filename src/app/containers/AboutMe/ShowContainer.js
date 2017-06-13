import React, { Component } from 'react'
import { Actions } from 'react-native-router-flux'
import { inject, observer } from 'mobx-react/native'
import { View, ActivityIndicator } from "react-native"
// views
import ShowView from "../../views/AboutMe/ShowView"

@inject("SubjectStore") @observer
export default class ShowContainer extends Component {

  componentWillMount() {
    //console.warn("AboutMeShow")
    Actions.refresh({ key: 'drawer', open: false })
    this.props.SubjectStore.initAboutMeShow()
  }

  render() {

    const { SubjectStore } = this.props
    
    const indicator = (
      <ActivityIndicator
        style={{
          alignItems: "center",
          justifyContent: "center",
          padding: 8,
          marginTop: 150
        }}
        size="large"
      />
    )

    return(
      <View style={{flex: 1}}>
        { SubjectStore.loading && indicator }
        {!SubjectStore.loading && <ShowView/> }
      </View>
    )
  }
}
