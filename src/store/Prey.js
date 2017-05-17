import { observable, action, useStrict, autorun } from 'mobx'
import { Actions } from 'react-native-router-flux'
// import autobind from 'autobind-decorator';
useStrict(true)
// @autobind

class Prey {
  @observable users;

  constructor(firebase) {
    this.users = [];
    this.firebase = firebase
  }

  @action setUser(user) {
    this.user = user;
    console.log('Current User in AppStore: ' + user.uid);
  }
   
}

export default MeetCute;
