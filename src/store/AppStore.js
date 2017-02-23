import { observable, action, autorun } from 'mobx'; // eslint-disable-line
// import autobind from 'autobind-decorator';
import Reactotron from 'reactotron-react-native';

// @autobind
class AppStore {
  @observable user;

  constructor() {
    this.user = null;
  }

  @action signIn(user) {
    this.user = user;
    Reactotron.log({'AppStore user in': this.user});
  }

  @action signOut() {
    this.user = null;
    Reactotron.log({'AppStore user out': this.user});
  }

}

autorun(() => {
  Reactotron.log({AppStore});
})

export default AppStore;
