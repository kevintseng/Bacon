import React, {Component, PropTypes} from 'react';
import { Dimensions, Text, View } from 'react-native';
import { Actions } from 'react-native-router-flux';
//import { autorun } from 'mobx';
import { observer,inject } from 'mobx-react/native';
import { Fate } from './FateContainer/Fate'


const {width, height} = Dimensions.get('window'); //eslint-disable-line

@inject("fate") @observer
export default class FateContainer extends Component {
  //static propTypes = {
  //  store: PropTypes.object,
  //  fire: PropTypes.object,
  //}

  componentWillReact() {
    //console.warn("Re-render FateContainer!!");
  }

  componentWillMount() {
    Actions.refresh({ key: 'drawer', open: false })
    this.props.fate.initPreyList()
  }

  componentDidMount(){
    //this.props.fate.test()
  }

  //autorun(() => { console.warn("AAAA") })

  render() {
    //console.warn("render")
    return(
      <Fate/>
    );
  }
}
