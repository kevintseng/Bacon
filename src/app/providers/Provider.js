// Inject stores to each scene
// The file is DI about what props inject to each scene
import React from "react"
import { Provider } from "mobx-react/native"
// AppInitStore
import AppInitStore from "../../configs/AppInitStore"
// containers
import MeetCuteContainer from "../containers/MeetCuteContainer"
import MeetChanceAllContainer from "../containers/MeetChance/MeetChanceAllContainer"
import MeetChanceSingleContainer from "../containers/MeetChance/MeetChanceSingleContainer"
import FateContainer from "../containers/FateContainer"
// AboutMe containers
import ShowContainer from "../containers/AboutMe/ShowContainer"
import EditContainer from "../containers/AboutMe/EditContainer"

export const MeetCuteProvider = () => (
  <Provider SubjectStore = { AppInitStore.wooer } ObjectStore = { AppInitStore.meetCute } >
    <MeetCuteContainer/>
  </Provider>
)

export const MeetChanceAllProvider = () => (
  <Provider SubjectStore = { AppInitStore.wooer } ObjectStore = { AppInitStore.meetChance } >
    <MeetChanceAllContainer/>
  </Provider>
)

export const MeetChanceSingleProvider = () => (
  <Provider SubjectStore = { AppInitStore.wooer } ObjectStore = { AppInitStore.meetChance } >
    <MeetChanceSingleContainer/>
  </Provider>
)

export const FateProvider = () => (
  <Provider SubjectStore = { AppInitStore.wooer } ObjectStore = { AppInitStore.fate } >
    <FateContainer/>
  </Provider>
)

// AboutMe
export const ShowProvider = () => (
  <Provider SubjectStore = { AppInitStore.wooer } displayName={AppInitStore.wooer.displayName} city={AppInitStore.wooer.city} >
    <ShowContainer/>
  </Provider>  
)

export const EditProvider = (props) => (
  <Provider SubjectStore = { AppInitStore.wooer } >
    <EditContainer {...props}/>
  </Provider>  
)