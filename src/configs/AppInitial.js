import RNFirebase from 'react-native-firebase'
// Stores Classes
import MeetChanceStore from "../mobx/stores/MeetChanceStore"
import SignUpInStore from "../mobx/stores/SignUpInStore"
import SubjectStore from "../mobx/stores/SubjectStore"

const FirebaseConfig = {
  debug: true
}

const AppInitial = {
  init: () => {
    this.firebase = RNFirebase.initializeApp(FirebaseConfig)
    this.SignUpInStore = new SignUpInStore(this.firebase)
    this.SubjectStore = new SubjectStore()
    this.MeetChanceStore = new MeetChanceStore()
    return this
  }
}.init()

export default AppInitial


//this.wooer = new SubjectStore(this.firebase,this.ui)
//this.meetCute = Object.assign(new ObjectStore(this.firebase,this.wooer),MeetCuteAction)
//this.meetChance = Object.assign(new ObjectStore(this.firebase,this.wooer),MeetChanceAction)
//this.fate = Object.assign(new ObjectStore(this.firebase,this.wooer,this.meetChance),FateAction)