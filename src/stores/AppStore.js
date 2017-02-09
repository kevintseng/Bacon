import {reaction, observable, observe, computed, autorun} from 'mobx'; // eslint-disable-line

class AppStore {
  @observable user = '';
  @observable profile = {};
  @observable nearbys = [];
  @observable recommands = [];
  @observable settings = {};
  @observable chats = [];

}

const appStore = new AppStore();

autorun(() => {
  console.log(appStore);
})

export default appStore;
