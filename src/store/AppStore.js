import { observable, action, autorun } from 'mobx'; // eslint-disable-line
// import autobind from 'autobind-decorator';

// @autobind
class AppStore {
  @observable user;
  @observable view;

  constructor() {
    this.user = null;
    this.view = 'signin';
  }

  @action setUser(user) {
    this.user = user;
  }

  @action signOut() {
    this.user = null;
  }

  @action setView(sceneKey) {
    this.view = sceneKey;
  }
}

export default AppStore;
