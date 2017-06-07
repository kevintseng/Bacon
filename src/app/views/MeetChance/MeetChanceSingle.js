import React from 'react';
import { View, Text } from 'react-native'
import HuntingGrounds from "../../components/HuntingGrounds"
import { observer, inject } from "mobx-react/native"


const MeetChanceSingle = inject("ObjectStore")(observer(({ObjectStore}) => {

  return(
    <HuntingGrounds/>
  )
}))

export default MeetChanceSingle