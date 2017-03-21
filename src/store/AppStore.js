import { observable, action } from 'mobx';
// import autobind from 'autobind-decorator';
import Reactotron from 'reactotron-react-native';

// @autobind
class AppStore {
  @observable user;
  @observable inSignupProcess;

  constructor() {
    this.user = null;
    this.inSignupProcess = false;
  }

  @action setUser(user) {
    this.user = user;
  }

  @action signOut() {
    this.user = '';
  }

  @action setView(sceneKey) {
    this.view = sceneKey;
  }

  @action setInSignupProcess(val) {
    this.inSignupProcess = val;
    Reactotron.log('Set inSignupProcess: ' + val);
  }
}

export default AppStore;
