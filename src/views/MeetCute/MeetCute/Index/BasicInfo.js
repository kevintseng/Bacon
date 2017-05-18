import React from "react"
import { View, Text } from "react-native"
import { observer, inject } from "mobx-react/native"


const calculateAge = (birthday) => { // birthday is a date
    const ageDifMs = Date.now() - birthday.getTime();
    const ageDate = new Date(ageDifMs); // miliseconds from epoch
    return Math.abs(ageDate.getUTCFullYear() - 1970);
}

const BasicInfo = inject("prey")(observer(({ prey }) => {
  return(
    <View style = {{margin: 10}}>
      <Text style = {{fontSize: 24, color: "#000000"}}>
        {prey.user.displayName}, {calculateAge(new Date(prey.user.birthday))}
      </Text>
    </View>
  )
}))

export { BasicInfo }