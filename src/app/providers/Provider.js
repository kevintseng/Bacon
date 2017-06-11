// Inject stores to each scene
// The file is DI about what props inject to each scene
import React from "react"
import { Provider } from "mobx-react/native"
// AppInitStore
import AppInitStore from "../../configs/AppInitStore"
// containers
import MeetCuteShowContainer from "../containers/MeetCute/MeetCuteShowContainer"
import MeetCuteEditContainer from "../containers/MeetCute/MeetCuteEditContainer"

import MeetChanceAllContainer from "../containers/MeetChance/MeetChanceAllContainer"
import MeetChanceSingleContainer from "../containers/MeetChance/MeetChanceSingleContainer"
import MeetChanceEditContainer from "../containers/MeetChance/MeetChanceEditContainer"

import FateAllContainer from "../containers/Fate/FateAllContainer"
import FateSingleContainer from "../containers/Fate/FateSingleContainer"
// AboutMe containers
import ShowContainer from "../containers/AboutMe/ShowContainer"
import EditContainer from "../containers/AboutMe/EditContainer"

export const MeetCuteShowProvider = () => (
  <Provider SubjectStore = { AppInitStore.wooer } ObjectStore = { AppInitStore.meetCute } >
    <MeetCuteShowContainer/>
  </Provider>
)

export const MeetCuteEditProvider = () => (
  <Provider SubjectStore = { AppInitStore.wooer } ObjectStore = { AppInitStore.meetCute } >
    <MeetCuteEditContainer/>
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

export const MeetChanceEditProvider = () => (
  <Provider SubjectStore = { AppInitStore.wooer } ObjectStore = { AppInitStore.meetChance } >
    <MeetChanceEditContainer/>
  </Provider>
)

export const FateAllProvider = () => (
  <Provider SubjectStore = { AppInitStore.wooer } ObjectStore = { AppInitStore.fate } >
    <FateAllContainer/>
  </Provider>
)

export const FateSingleProvider = () => (
  <Provider SubjectStore = { AppInitStore.wooer } ObjectStore = { AppInitStore.fate } >
    <FateSingleContainer/>
  </Provider>
)

// AboutMe
export const ShowProvider = () => (
  <Provider SubjectStore = { AppInitStore.wooer } >
    <ShowContainer/>
  </Provider>  
)

export const EditProvider = (props) => (
  <Provider SubjectStore = { AppInitStore.wooer } >
    <EditContainer {...props}/>
  </Provider>  
)