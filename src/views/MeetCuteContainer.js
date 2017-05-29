import React, { Component } from "react";
import { View, ActivityIndicator } from "react-native";
import { observer, inject } from "mobx-react/native";
import { Actions } from "react-native-router-flux";
import { MeetCute } from "./MeetCuteContainer/MeetCute";
//import DeviceInfo from "react-native-device-info";

@inject("prey","store") @observer
export default class MeetCuteContainer extends Component {

  componentWillReact() {
    //console.warn("I will re-render, since the component has changed!");
  }

  componentWillMount() {
    //console.warn("componentWillMount")
    Actions.refresh({ key: "drawer", open: false })
    this.props.prey.initPreyList()
    //this.props.prey.test()
  }

  componentDidMount() {
    this.props.prey.fetchPreyListsByMeetCute(this.props.store.user.sexOrientation)
  }

  componentWillUnmount(){

  }

  render() {
    const { prey } = this.props

    //{ this.props.prey.initPreyList() }
    
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
          {prey.loading && indicator}
          {
            prey.prey && !prey.loading && 
            <MeetCute/>
          }
        </View>
    );
  }
}
//const deviceId = DeviceInfo.getUniqueID();
//const locale = DeviceInfo.getDeviceLocale();
//const country = DeviceInfo.getDeviceCountry();
//this.seekMeetQs(this.store.user.sexOrientation);
