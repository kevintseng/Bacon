import { observable } from 'mobx'; // eslint-disable-line

export default class ListedUser {
  @observable uid;
  @observable nickname;
  @observable avatar;
  @observable city;
  @observable country;
  @observable lastGeo;

}
