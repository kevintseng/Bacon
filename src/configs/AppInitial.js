import RNFirebase from 'react-native-firebase'
// Stores Classes
// control flow
import ControlStore from '../mobx/stores/ControlStore'
// data
import SignUpStore from '../mobx/stores/SignUpStore'
import SignInStore from '../mobx/stores/SignInStore'
import SubjectStore from '../mobx/stores/SubjectStore'
import SubjectEditStore from '../mobx/stores/SubjectEditStore'


import MeetChanceStore from '../mobx/stores/MeetChanceStore'
//import SignUpInStore from '../mobx/stores/SignUpInStore'

const FirebaseConfig = {
  debug: true
}

const AppInitial = {
  init: () => {
    this.firebase = RNFirebase.initializeApp(FirebaseConfig)

    this.ControlStore = new ControlStore()
    
    this.SignUpStore = new SignUpStore(this.firebase)
    this.SignInStore = new SignInStore()
    this.SubjectStore = new SubjectStore()
    this.SubjectEditStore = new SubjectEditStore()
    
    //this.SignUpInStore = new SignUpInStore(this.firebase)
    this.MeetChanceStore = new MeetChanceStore()
    return this
  }
}.init()

export default AppInitial


//this.wooer = new SubjectStore(this.firebase,this.ui)
//this.meetCute = Object.assign(new ObjectStore(this.firebase,this.wooer),MeetCuteAction)
//this.meetChance = Object.assign(new ObjectStore(this.firebase,this.wooer),MeetChanceAction)
//this.fate = Object.assign(new ObjectStore(this.firebase,this.wooer,this.meetChance),FateAction)