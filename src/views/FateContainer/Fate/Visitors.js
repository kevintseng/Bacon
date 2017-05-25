import React, { Component } from 'react'
import { View, Text, ActivityIndicator } from 'react-native'
import { Cookie } from './components/Cookie'
import { observer, inject } from "mobx-react/native"
import { autorun } from 'mobx'

//autorun(() => { console.warn("BBBB") })

@inject("fate") @observer
export default class Visitors extends Component {

  //const a = autorun(() => { console.warn("BBBB") })


  componentWillReact() {
    //console.warn("Re-render FateContainer!!");
  }
  
 renderVisitors = () => (
    this.props.fate.preyList.map(prey => (<Cookie key={prey.uid} name={ prey.displayName }><Text style={{color: '#000000'}}>剛剛來訪</Text></Cookie>))
  )

  indicator = () => (
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

  render(){
  return(
    <View style={{flex: 1}}>
     { this.props.fate.loading && this.indicator() }
     {
      this.props.fate.preyList && !this.props.fate.loading && this.renderVisitors()
     }
    </View>
  )}
}

//export { Visitors