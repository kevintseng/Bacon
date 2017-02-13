import {reaction, observable, observe, computed, autorun} from 'mobx'; // eslint-disable-line
import autobind from 'autobind-decorator';

@autobind
class SignupStore {
  @observable uid;
  @observable email;
  @observable password;
  @observable nickname;
  @observable birthday;
  @observable termsagreed;
  @observable city;
  @observable state;
  @observable country;
  @observable gender;
  @observable selectedSexOrientation;

  constructor() {
    this.uid = '';
    this.email = '';
    this.password = '';
    this.nickname = '';
    this.birthday = '';
    this.termsAgreed = false;
    this.city = '';
    this.country = '';
    this.gender = '';
    this.selectedSexOrientation = 0;
  }

  @computed get birthdayTimestamp() {
    let temp = new Date(this.birthday).getTime()/1000;
    return temp;
  }

  @computed get sexOrientation() {
    switch(this.selectedSexOrientation) {
      case 0:
      return 'm';
      case 1:
      return 'f';
      case 3:
      return 'b';
    }
  }



}



const signupStore = new SignupStore();

autorun(() => {
  console.log(signupStore);
})

export default signupStore;
