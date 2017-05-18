import { observable, action, useStrict } from 'mobx'
import Moment from "moment"

useStrict(false)

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

  @action mq(sexOrientation) {
    sexOrientation = 'test'
    const query = this.firebase.database().ref("users")
      //.database()
      //.ref(`seeking/${this.store.user.country}/${cond}`);
    //ref.orderByKey().equalTo(cond,"sexOrientation")
    query.orderByChild("sexOrientation").equalTo(sexOrientation).once("value", snap => {
        snap.forEach(childsnap => {
          //if (childsnap.val().country === 'Taiwan')
          //{
            this.list.push(childsnap.val());
          //}
        })
      })
      .then(() => {
        this.setUser(this.list[0]);
    })
  } 

  @action handleLike = () => {
    const r = this.firebase.database().ref("users/" + this.user.uid + "/likes").child(this.user.uid);
    r.set({time: Moment().unix()});
    this.getNext();
  } 

  @action getNext = async () => {
    this.loading = true
    await this.sleep(1000)
    const _index = this.list.indexOf(this.user) + 1;
    if (this.list.length > _index) {
      this.setUser(this.list[_index]);
    } else {
      this.loading = false
      alert('這是最後一位了, 在沒有有fu的對象我也沒辦法惹...GG');
    }
  } 

  @action setUser(user){
    this.user = user
    this.loading = false
  } 

  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }     
}

export default Prey;
