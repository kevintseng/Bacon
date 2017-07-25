import RNFirebase from 'react-native-firebase'
// Stores Classes
import SignUpInStore from "../mobx/stores/SignUpInStore"
import SubjectStore from "../mobx/stores/SubjectStore"

const FirebaseConfig = {
  debug: true
}

const AppInitStore = {
  init: () => {
    this.firebase = RNFirebase.initializeApp(FirebaseConfig)
    this.SignUpInStore = new SignUpInStore()
    this.SubjectStore = new SubjectStore()
    //this.wooer = new SubjectStore(this.firebase,this.ui)
    //this.meetCute = Object.assign(new ObjectStore(this.firebase,this.wooer),MeetCuteAction)
    //this.meetChance = Object.assign(new ObjectStore(this.firebase,this.wooer),MeetChanceAction)
    //this.fate = Object.assign(new ObjectStore(this.firebase,this.wooer,this.meetChance),FateAction)
    return this
  }
}.init()

export default AppInitStore