import React, { Component } from "react";
import { View, Dimensions, ActivityIndicator } from "react-native";
import { observer, inject } from "mobx-react/native";
import Moment from "moment";
import { Actions } from "react-native-router-flux";
import DeviceInfo from "react-native-device-info";
import { Index } from "./MeetCute/Index";

const width = Dimensions.get("window").with;

@inject("prey") @observer
export default class MeetCute extends Component {
  constructor(props) {
    super(props);
    this.prey = this.props.prey
    //this.firebase = this.props.fire;
    //this.store = this.props.store;
    //this.db = this.props.localdb;
    //this.state = {
     // size: { width },
    //  list: null,
    //  next: null,
    //  data: null,
    //  loading: true,
    //};
  }

  componentWillMount() {
    console.debug("Rendering MeetCute");
    Actions.refresh({ key: "drawer", open: false });
  }

  componentDidMount() {
    this.props.prey.grepUsers(this.store.user.sexOrientation)
    ///console.debug("MeetCute rendered");
    //const deviceId = DeviceInfo.getUniqueID();
    //const locale = DeviceInfo.getDeviceLocale();
    //const country = DeviceInfo.getDeviceCountry();
    //console.log(
    //  "Device ID: " + deviceId + ", locale: " + locale + ", country: " + country
    //);
    //this.seekMeetQs(this.store.user.sexOrientation);
  }

  mq = cond => {
    const _list = [];
    const query = this.firebase.database().ref("users")
    //console.warn(query)
      //.database()
      //.ref(`seeking/${this.store.user.country}/${cond}`);
    //ref.orderByKey().equalTo(cond,"sexOrientation")
    query.orderByChild("sexOrientation").equalTo("test").once("value", snap => {
        //console.log("Executing mq cond:" + cond);
        snap.forEach(childsnap => {
          if (childsnap.val().country === 'Taiwan')
          {
            const _uid = childsnap.val().uid;
            _list.push(_uid);
          }
        });
        console.log("Print list");
        console.log(_list);
        this.setState({ list: _list });
      })
      .then(() => {
        //console.warn(_list[0]);
        this.getProfile(_list[0]);
      });
  };

  getProfile = uid => {
    const q = this.firebase.database().ref("users/" + uid);
    q.once("value", snap => {
      console.log("Profile data:");
      console.log(snap.val());
      this.setState({
        data: snap.val(),
        loading: false,
      });
    });
  };

  seekMeetQs = so => {
    switch (so) {
      case "msf":
        this.mq("fsm");
        break;
      case "msm":
        this.mq("msm");
        break;
      case "fsm":
        this.mq("msf");
        break;
      case "fsf":
        this.mq("fsf");
        break;
    }
  };

  getNext = () => {
    //alert("Next")
    this.setState({
      loading: true
    });
    const uid = this.state.data.uid;
    const list = this.state.list;
    console.log("MeetCute: getNext() pressed");
    const _index = list.indexOf(uid) + 1;
    console.log(_index);
    if (list.length > _index) {
      this.getProfile(list[_index]);
    } else {
      this.setState({
        loading: false,
      });
      alert('這是最後一位了, 在沒有有fu的對象我也沒辦法惹...GG');
      console.log("This is the last user");
    }
  };

  handleLike = uid => {
    console.log('MeetCute: handleLike pressed: ' + uid);
    const r = this.firebase.database().ref("users/" + this.store.user.uid + "/likes").child(uid);
    r.set({time: Moment().unix()});
    this.getNext();
  };

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
        {this.state.loading && indicator}
        {
          this.state.data && !this.state.loading && 
          <Index
            data={this.state.data}
            getNext={this.getNext}
            handleLike={this.handleLike}
          />
        }
      </View>
    );
  }
}
