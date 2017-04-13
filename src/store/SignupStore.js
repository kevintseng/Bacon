import { action, observable, computed } from 'mobx'; // eslint-disable-line
import Moment from 'moment';
// import autobind from 'autobind-decorator';

// @autobind
export default class SignupStore {
  @observable uid;
  @observable email;
  @observable password;
  @observable nicknamel;
  @observable birthday;
  @observable termsAgreed;
  @observable city;
  @observable gender;
  @observable sexOrientation;
  @observable geocode;
  @observable placeID;
  @observable locale;
  @observable country;
  @observable avatar;
  @observable lastUpdated;

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
    this.sexOrientation = '';
    this.geocode = null;
    this.placeID = '';
    this.locale = '';
    this.avatar = null;
    this.created = null;
  }

  @action setTermsAgreement(termsAgreed) {
    this.termsAgreed = termsAgreed;
  }

  @action setEmail(email) {
    this.email = email;
  }

  @action setPassword(pass) {
    this.password = pass;
  }

  @action setBirthday(birthday) {
    this.birthday = birthday;
  }

  @action setNickname(name) {
    this.nickname = name;
  }

  @action setUid(id) {
    this.uid = id;
    this.created = Moment().unix();
  }

  @action setCity(city) {
    this.city = city;
  }

  @action setCountry(country) {
    this.country = country;
  }

  @action setLocale(locale) {
    this.locale = locale;
  }

  @action setGender(gender) {
    switch(gender) {
      case 0:
      this.gender = 'm';
      break;
      case 1:
      this.gender = 'f';
      break;
    }
  }

  @action setPlaceID(pid) {
    this.placeID = pid;
  }

  @action setGeocode(geo) {
    this.geocode = geo;
  }

  @action setSexOrientation(gender, selected) {
    if(gender === 0) {
      switch(selected) {
        case 0:
        this.sexOrientation = 'msm'
        break;
        case 1:
        this.sexOrientation = 'msf';
        break;
      }
    } else {
      switch(selected) {
        case 0:
        this.sexOrientation = 'fsf'
        break;
        case 1:
        this.sexOrientation = 'fsm';
        break;
      }
    }
  }

  @computed get birthdayTimestamp() {
    return new Date(this.birthday).getTime()/1000;
  }

  @action getNewUid() {

  }

  @action setAvatar(url) {
    this.avatar = url;
  }

}
