import React, { Component } from "react";
import { View, ActivityIndicator } from "react-native";
import { observer, inject } from "mobx-react/native";
import { Actions } from "react-native-router-flux";
import { Index } from "./MeetCute/Index";
//import DeviceInfo from "react-native-device-info";

@inject("prey","store") @observer
export default class MeetCute extends Component {

  componentWillMount() {
    Actions.refresh({ key: "drawer", open: false });
  }

  componentDidMount() {
    this.props.prey.grepLists(this.props.store.user.sexOrientation)
  }

  render() {
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
        {this.props.prey.loading && indicator}
        {
          this.props.prey.user && !this.props.prey.loading && 
          <Index
            //user = {this.props.prey.user}
            //getNext = {this.props.prey.getNext}
            //handleLike = {this.props.prey.handleLike}
          />
        }
      </View>
    );
  }
}
    //const deviceId = DeviceInfo.getUniqueID();
    //const locale = DeviceInfo.getDeviceLocale();
    //const country = DeviceInfo.getDeviceCountry();
    //this.seekMeetQs(this.store.user.sexOrientation);
