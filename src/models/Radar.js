import {observable, computed, action, autorun, reaction} from 'mobx'; // eslint-disable-line

export default class Radar {
  @observable views = 0;
  @observable nearbyVisits = 0;
  @observable liked = 0;
  @observable meetViews = 0;
  @observable invites = 0;
  @observable acceptInvites = 0;
  @observable onlineTime = 0;
  @observable avgOnlineTime = 0;
  @observable sentMsgs = 0;
  @observable avgSentMsgs = 0;

  //熱門度
  @computed get popularity() {
    return (this.nearbyVisits/this.views).toFixed(2);
  }

  //好感度
  @computed get likable() {
    return (this.liked/this.meetViews).toFixed(2);
  }

  //友好度
  @computed get friendliness() {
    return (this.acceptInvites/this.invites).toFixed(2);
  }

  //活耀度
  @computed get activity() {
    return (this.onlineTime/this.avgOnlineTime).toFixed(2);
  }

  //愛聊度
  @computed get chatty() {
    return (this.sentMsgs/this.avgSentMsgs).toFixed(2);
  }

}
