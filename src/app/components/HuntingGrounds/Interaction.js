import React from "react"
//import { View, Text } from "react-native"
import { observer, inject } from "mobx-react/native"
import Report from "../../views/AboutMe/Show/Report"

const Interaction = inject("SubjectStore")(observer(({ SubjectStore }) => {
  return(
    SubjectStore.interaction && <Report/>
  )
}))

export { Interaction }