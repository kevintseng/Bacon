import React, { Component } from "react"
import { View, ActivityIndicator } from "react-native"
import { observer, inject } from "mobx-react/native"
//import { Actions } from "react-native-router-flux"
// views
import MeetChanceSingle from "../../views/MeetChance/MeetChanceSingle"

//const { width, height } = Dimensions.get('window')

@inject("SubjectStore","ObjectStore") @observer
export default class MeetChanceSingleContainer extends Component {

  constructor(props) {
    super(props);
    this.SubjectStore = props.SubjectStore
    this.ObjectStore = props.ObjectStore
  }

  componentWillMount() {
    //console.log('Rendering Nearby');
    //Actions.refresh({ key: 'drawer', open: false })
    //this.ObjectStore.initPreyList()
    // this.getLocation();
  }

  render() {
    return(
      <View style={{flex: 1}}>
        <MeetChanceSingle/>
      </View>
    )
  }
}
/*
    const { ObjectStore } = this.props
    
    const indicator = (
      <ActivityIndicator
        style={{
          alignItems: "center",
          justifyContent: "center",
          padding: 8,
          marginTop: 150
        }}
        size="large"
      />
    )

      { ObjectStore.loading && indicator }
      {
        ObjectStore.preyList && !ObjectStore.loading && 
        <MeetChanceSingle/>
      }
*/
