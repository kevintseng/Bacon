import React, { Component } from 'react'
import { Dimensions } from 'react-native'
import { Actions } from 'react-native-router-flux'
// views
import FateSingle from "../../views/Fate/FateSingle"

const {width, height} = Dimensions.get('window'); //eslint-disable-line

export default class FateContainer extends Component {

  componentWillReact() {
    console.warn("Re-render FateContainer!!");
  }

  componentWillMount() {
    Actions.refresh({ key: 'drawer', open: false })
    //this.props.fate.initPreyList()
  }

  componentDidMount(){
    //this.props.fate.test()
  }

  render() {
    return(
      <FateSingle/>
    );
  }
}
