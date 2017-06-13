import React, { Component } from 'react'
import { Dimensions } from 'react-native'
import { Actions } from 'react-native-router-flux'
import { observer, inject } from "mobx-react/native"
// views
import Fate from "../../views/Fate/FateAll"

const {width, height} = Dimensions.get('window'); //eslint-disable-line

@inject("ObjectStore") @observer
export default class FateAllContainer extends Component {

  componentWillReact() {
    console.warn("Re-render FateContainer!!");
  }

  componentWillMount() {
    Actions.refresh({ key: 'drawer', open: false })
    this.props.ObjectStore.testFate()
  }

  componentDidMount(){
    //this.props.fate.test()
  }

  render() {
    return(
      <Fate/>
    );
  }
}
