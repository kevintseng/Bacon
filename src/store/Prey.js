import { observable, action, useStrict, autorun } from 'mobx'
import { Actions } from 'react-native-router-flux'
//import DeviceInfo from "react-native-device-info"
// import autobind from 'autobind-decorator';
useStrict(true)
// @autobind

class Prey {
  @observable users;

  constructor(firebase) {
    this.prey = null;
    this.firebase = firebase
  }

  @action grepUsers(sexOrientation){
    //const deviceId = DeviceInfo.getUniqueID();
    //const locale = DeviceInfo.getDeviceLocale();
    //const country = DeviceInfo.getDeviceCountry();
    this.seekMeetQs(sexOrientation)
  }


  seekMeetQs(sexOrientation) {
    switch (sexOrientation) {
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
  }

  mq(cond) {
    cond = 'test'
    const _list = [];
    const query = this.firebase.database().ref("users")
    //console.warn(query)
      //.database()
      //.ref(`seeking/${this.store.user.country}/${cond}`);
    //ref.orderByKey().equalTo(cond,"sexOrientation")
    query.orderByChild("sexOrientation").equalTo(cond).once("value", snap => {
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
      })
  }

  getProfile(uid) {
    const q = this.firebase.database().ref("users/" + uid);
    q.once("value", snap => {
      this.prey = snap.val()
      //this.setState({
      //  data: snap.val(),
      //  loading: false,
      //})
    })
  }
   
}

export default Prey;
