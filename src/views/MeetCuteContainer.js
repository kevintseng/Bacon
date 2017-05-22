import React, { Component } from "react";
import { View, ActivityIndicator } from "react-native";
import { observer, inject } from "mobx-react/native";
import { Actions } from "react-native-router-flux";
import { MeetCute } from "./MeetCuteContainer/MeetCute";
//import DeviceInfo from "react-native-device-info";

@inject("prey","store") @observer
export default class MeetCuteContainer extends Component {

  componentWillMount() {
    Actions.refresh({ key: "drawer", open: false });
  }

  componentDidMount() {
    this.props.prey.fetchPreyLists(this.props.store.user.sexOrientation)
  }

  render() {

    const { prey } = this.props 
    
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
    );
    
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
