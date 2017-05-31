// Firebase
import Firebase from "firebase"
import { FirebaseConfig } from "./Firebase"
// Stores Classes
import SubjectStore from "../mobx/stores/SubjectStore"
import ObjectStore from "../mobx/stores/ObjectStore"
// Actions
import MeetCuteAction from "../mobx/actions/MeetCuteAction"
import MeetChanceAction from "../mobx/actions/MeetChanceAction"
import FateAction from "../mobx/actions/FateAction"

const AppInitStore = {
  init: () => {
    this.firebase = Firebase.initializeApp(FirebaseConfig)
    this.wooer = new SubjectStore(this.firebase)
    this.meetCute = Object.assign(new ObjectStore(this.firebase,this.wooer),MeetCuteAction)
    this.meetChance = Object.assign(new ObjectStore(this.firebase,this.wooer),MeetChanceAction)
    this.fate = Object.assign(new ObjectStore(this.firebase,this.wooer),FateAction)
    return this
  }
}.init()

export default AppInitStore