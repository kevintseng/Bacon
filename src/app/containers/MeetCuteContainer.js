import React, { Component } from "react"
import { View, ActivityIndicator } from "react-native"
import { observer, inject } from "mobx-react/native"
import { Actions } from "react-native-router-flux"
// views
import MeetCute from "../views/MeetCute"

@inject("HunterStore","PreyStore") @observer
export default class MeetCuteContainer extends Component {

  constructor(props) {
    super(props);
    this.HunterStore = props.HunterStore
    this.PreyStore = props.PreyStore
  }

  componentWillReact() {
    //console.warn("I will re-render, since the component has changed!");
  }

  componentWillMount() {
    Actions.refresh({ key: "drawer", open: false })
    this.PreyStore.initPreyList()
  }

  componentDidMount() {
    this.PreyStore.fetchPreyListsByMeetCute(this.HunterStore.user.sexOrientation)
  }

  componentWillUnmount(){

  }

  render() {
    const { PreyStore } = this.props
    
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
    
    return (
      <View style={{flex: 1}}>
        { PreyStore.loading && indicator }
        {
          PreyStore.prey && !PreyStore.loading && 
          <MeetCute/>
        }
      </View>
    )
  }
}