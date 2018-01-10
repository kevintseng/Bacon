import RNFirebase from 'react-native-firebase'
// Stores Classes
// control flow
import ControlStore from '../mobx/ControlStore'
// data
import SignUpStore from '../mobx/SignUpStore'
import SignInStore from '../mobx/SignInStore'
import PasswordStore from '../mobx/PasswordStore'
import SubjectStore from '../mobx/SubjectStore'
import SubjectEditStore from '../mobx/SubjectEditStore'

import MeetCuteStore from '../mobx/MeetCuteStore'
import MeetChanceStore from '../mobx/MeetChanceStore'
import FateStore from '../mobx/FateStore'
import ChatStore from '../mobx/ChatStore'

const FirebaseConfig = {
  debug: true,
}

const AppInitial = {
  init: () => {
    this.firebase = RNFirebase.initializeApp(FirebaseConfig)
    this.ControlStore = new ControlStore()
    this.SignUpStore = new SignUpStore(this.firebase)
    this.SignInStore = new SignInStore()
    this.PasswordStore = new PasswordStore()
    this.SubjectStore = new SubjectStore(this.firebase)
    this.SubjectEditStore = new SubjectEditStore()
    this.MeetCuteStore = new MeetCuteStore(this.firebase)
    this.MeetChanceStore = new MeetChanceStore(this.firebase)
    this.FateStore = new FateStore(this.firebase)
    this.ChatStore = new ChatStore(this.firebase)
    return this
  },
}.init()

export default AppInitial


// this.wooer = new SubjectStore(this.firebase,this.ui)
// this.meetCute = Object.assign(new ObjectStore(this.firebase,this.wooer),MeetCuteAction)
// this.meetChance = Object.assign(new ObjectStore(this.firebase,this.wooer),MeetChanceAction)
// this.fate = Object.assign(new ObjectStore(this.firebase,this.wooer,this.meetChance),FateAction)
