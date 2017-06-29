import React from 'react';
import { observer, inject } from "mobx-react/native"
import HuntingGrounds from "../../components/HuntingGrounds"

const MeetChanceSingle = inject("ObjectStore")(observer(({ ObjectStore }) => {

  const rightIconColor = ObjectStore.is_coll ? "#ff0000" : "#ffffff"

  return(
    <HuntingGrounds leftIcon={"comment"} rightIcon={"paperclip"} rightIconColor={rightIconColor} showbutton/>
  )

}))

export default MeetChanceSingle