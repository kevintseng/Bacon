import { useStrict, observable, extendObservable, action, computed } from 'mobx'

useStrict(true)

export default class SubjectEditStore {

  @observable nickname
  @observable birthday
  @observable address
  @observable bio
  @observable languages
  @observable hobbies

  constructor() {
  }


  @computed get languagesToFlatList() {
    return Object.keys(this.languages).map((key,index) => ({ key: key, check: this.languages[key] }))
    // { 中文: true } -> [{key: 中文, check: true}]
  }

  @computed get hobbiesToFlatList() {
    return Object.keys(this.hobbies).map((key,index) => ({ key: key, check: this.hobbies[key] }))
    // { 打球: true } -> [{key: 打球, check: true}]
  }

  @action setNickname = str => {
    this.nickname = str
  }

  @action setBirthday = str => {
    this.birthday = str    
  }

  @action setAddress = str => {
    this.address = str    
  }

  @action setBio = str => {
    this.bio = str    
  }

  @action setLanguages = object => {
    this.languages = object
  }

  @action switchLanguages = key => {
    this.languages[key] = !this.languages[key]
  }

  @action setHobbies = object => {
    this.hobbies = object
  }

  @action switchHobbies = key => {
    this.hobbies[key] = !this.hobbies[key]
  }

  @action addHobby = key => {
    this.hobbies[key] = true
    this.hobbies = Object.assign({},this.hobbies)
  }
}