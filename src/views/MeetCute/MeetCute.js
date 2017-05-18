import React, { Component } from "react";
import { View, Dimensions, ActivityIndicator } from "react-native";
import { observer, inject } from "mobx-react/native";
//import Moment from "moment";
import { Actions } from "react-native-router-flux";
//import DeviceInfo from "react-native-device-info";
import { Index } from "./MeetCute/Index";

//const width = Dimensions.get("window").with;

@inject("prey","store") @observer
export default class MeetCute extends Component {
  //constructor(props) {
    //super(props);
  //}

  componentWillMount() {
    Actions.refresh({ key: "drawer", open: false });
  }

  componentDidMount() {
    this.props.prey.grepLists(this.props.store.user.sexOrientation)
    //const deviceId = DeviceInfo.getUniqueID();
    //const locale = DeviceInfo.getDeviceLocale();
    //const country = DeviceInfo.getDeviceCountry();
    //this.seekMeetQs(this.store.user.sexOrientation);
  }
/*

  handleLike = uid => {
    console.log('MeetCute: handleLike pressed: ' + uid);
    const r = this.firebase.database().ref("users/" + this.store.user.uid + "/likes").child(uid);
    r.set({time: Moment().unix()});
    this.getNext();
  };
*/

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
            data={this.props.prey.user}
            getNext={this.props.prey.getNext}
            handleLike={this.props.prey.handleLike}
          />
        }
      </View>
    );
  }

}
