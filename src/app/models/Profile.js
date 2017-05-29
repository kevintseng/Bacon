import { reaction, observable, computed, autorun } from 'mobx'; // eslint-disable-line

export default class Profile {
  @observable uid:String;
  @observable age:Number;
  @observable sex:String = "";
  @observable acctType:Number = 0;
  @observable email:String = "";
  @observable nickname:String = "";
  @observable avatar:String = "";
  @observable bday:Date;
  @observable country:String = "";
  @observable city:String = "";
  @observable origGeo:Object = {};
  @observable lastGeo:Object = {};
  @observable level:Number = 0;
  @observable verified:Boolean = false;
  @observable photoVerified:Boolean = false;
  @observable photos:Array = [];
  @observable sexPref:String = "";
  @observable selfIntro:String = "";
  @observable shoutout:String = "";
  @observable interests:Array = [];
  @observable languages:Array = [];
  @observable credits:Number = 0;
  @observable invisible:Boolean = false;
  @observable online:Boolean = true;
  @observable status:String = "";
  @observable matchFilter:Object = {};

  constructor(uid) {
    this.uid = uid;
    this.age = this.age();
  }

  @computed age() {
    var now = new Date();
    var age = now.getFullYear() - this.bday.year;
    var mdif = now.getMonth() - this.bday.month + 1; //0=jan

    if(mdif < 0) {
      --age;
    } else if(mdif == 0) {
      var ddif = now.getDate() - this.biday.day;
      if(ddif < 0) {
        --age;
      }
    }

    return age;
  }

}
