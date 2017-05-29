import { action } from 'mobx'
import GeoFire from 'geofire'
import Moment from 'moment'

//useStrict(true)
const MeetCuteActions = {

  setUser: action(function setUser(){
    this.user = this.store.user
  }),

  initPreyList: action(function initPreyList(){
    this.loading = true
  }),

  seekNearBy: action(function seekNearBy(latitude, longitude){
    const query = this.firebase.database().ref("/user_locations/")
    const geoFire = new GeoFire(query)
    const geoQuery = geoFire.query({
      center: [latitude, longitude],
      radius: 1000
    })
    geoQuery.on("key_entered", (key, location, distance) => {
      this.setPreyListByKey(key)
    })
    geoQuery.on("ready", () => {
      this.loading = false
    })
  }),

  setPreyListByKey: action(function setPreyListByKey(key){
    this.firebase.database().ref('users/' + key).once('value').then(snap => { this.preyList.push(snap.val()) })
  }),

  fetchPreyListsByMeetCute: action(function fetchPreyListsByMeetCute(sexOrientation){
    this.preyList = []
    this.seekMeetQs(sexOrientation)
  }),

  seekMeetQs: action(function seekMeetQs(sexOrientation) {
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
  }),

  mq: action(function mq(sexOrientation) {
    sexOrientation = 'test'
    const query = this.firebase.database().ref("users")
      //.database()
      //.ref(`seeking/${this.store.prey.country}/${cond}`);
    //ref.orderByKey().equalTo(cond,"sexOrientation")
    query.orderByChild("sexOrientation").equalTo(sexOrientation).once("value", snap => {
        snap.forEach(childsnap => {
          //if (childsnap.val().country === 'Taiwan')
          //{
            this.preyList.push(childsnap.val());
          //}
        })
      })
      .then(() => {
        this.setprey(this.preyList[0]);
    })
  }),  

  getNext: action(async function getNext(){
    this.loading = true
    await this.sleep(1000)
    const _index = this.preyList.indexOf(this.prey) + 1;
    if (this.preyList.length > _index) {
      this.setprey(this.preyList[_index]);
    } else {
      this.loading = false
      alert('這是最後一位了, 在沒有有fu的對象我也沒辦法惹...GG');
    }
  }), 

  setprey: action(function setprey(prey){
    this.prey = prey
    this.loading = false
  }),

  handleLike: action(function handleLike(){
    //console.warn(this)
    const r = this.firebase.database().ref("preys/" + this.prey.uid + "/likes").child(this.prey.uid);
    r.set({time: Moment().unix()});
    this.getNext();
  }),

  sleep: function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  
}

export { MeetCuteActions }