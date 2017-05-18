import { observable, action, useStrict } from 'mobx'
//import { Actions } from 'react-native-router-flux'
//import { Alert } from "react-native";
//import DeviceInfo from "react-native-device-info"
// import autobind from 'autobind-decorator';
useStrict(false)
// @autobind

class Prey {
  @observable user;
  @observable list;
  @observable loading;

  constructor(firebase) {
    this.list = []
    this.user = {}
    this.loading = true
    this.firebase = firebase
  }

  @action grepLists(sexOrientation){
    //const deviceId = DeviceInfo.getUniqueID();
    //const locale = DeviceInfo.getDeviceLocale();
    //const country = DeviceInfo.getDeviceCountry();
    this.seekMeetQs(sexOrientation)
    //console.warn(this.list)
  }

  @action getNext = () => {
    //alert("Next")
    //console.warn(this.loading)
    this.loading = true
    //this.setState({
    //  loading: true
    //});
    //console.warn(this.user)
    const uid = this.user.uid;
    const list = this.list;
    //console.log("MeetCute: getNext() pressed");
    const _index = list.indexOf(uid) + 1;
    //console.log(_index);
    if (list.length > _index) {
      this.getProfile(list[_index]);
    } else {
      //this.setState({
      //  loading: false,
      //});
      this.loading = false
      alert('這是最後一位了, 在沒有有fu的對象我也沒辦法惹...GG');
      //console.log("This is the last user");
    }
  }  


  @action seekMeetQs(sexOrientation) {
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

  @action mq(cond) {
    cond = 'test'
    //console.warn(cond)
    //const _list = [];
    const query = this.firebase.database().ref("users")
    //console.warn(query)
      //.database()
      //.ref(`seeking/${this.store.user.country}/${cond}`);
    //ref.orderByKey().equalTo(cond,"sexOrientation")
    //console.warn(query)
    query.orderByChild("sexOrientation").equalTo('test').once("value", snap => {
        //console.log("Executing mq cond:" + cond);
        snap.forEach(childsnap => {
          //if (childsnap.val().country === 'Taiwan')
          //{
            const _uid = childsnap.val().uid;
            //console.warn(_uid)
            this.list.push(_uid);
          //}
        });
        //console.log("Print list");
        //console.log(_list);
        //this.setState({ list: this.list });
      })
      .then(() => {
        //console.warn(_list[0]);
        this.getProfile(this.list[0]);
      })
  }

  @action getProfile(uid) {
    const q = this.firebase.database().ref("users/" + uid);
    q.once("value", snap => {
      this.user = snap.val()
      //console.warn(this.user)
      this.loading = false
      //console.warn(this.user)
      //this.setState({
      //  data: snap.val(),
      //  loading: false,
      //})
    })
  }   
}

export default Prey;
