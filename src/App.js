import React from "react"
import RouterComponent from "./Router"
// Using <Provider/> to inject global store
//import { Provider } from "mobx-react/native"
// Firebase
import Firebase from "firebase"
import { FirebaseConfig } from "./Configs"
// Stores Classes
import HunterStore from "./mobx/stores/HunterStore"
import PreyStore from "./mobx/stores/PreyStore"
// Actions
import MeetCuteAction from "./mobx/actions/MeetCuteAction"
import MeetChanceAction from "./mobx/actions/MeetChanceAction"
import FateAction from "./mobx/actions/FateAction"

// 初始化 stores
const AppInitStates = {
  init: () => {
    this.fire = Firebase.initializeApp(FirebaseConfig)
    this.self = new HunterStore(this.fire)
    this.meetCute = Object.assign(new PreyStore(this.fire,this.self),MeetCuteAction)
    this.meetChance = Object.assign(new PreyStore(this.fire,this.self),MeetChanceAction)
    this.fate = Object.assign(new PreyStore(this.fire,this.self),FateAction)
    return this
  }
}.init()

// Router
const App = () => {
  return (
    <RouterComponent {...AppInitStates}/>
  )
}

export default App;