import React, { Component } from 'react';
import { View, Dimensions} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { observer } from 'mobx-react/native';
import { Text, Button } from 'react-native-elements';
import Reactotron from 'reactotron-react-native';

const { width, height } = Dimensions.get('window'); //eslint-disable-line

@observer
export default class Nearby extends Component {
  // static propTypes = {
  //   store: PropTypes.object,
  //   fire: PropTypes.object,
  // }

  // constructor(props) {
  //   super(props);
  //   this.store = this.props.store;
  //   this.fs = this.props.fire;
  //   // this.state = {
  //   //   size: {
  //   //       width,
  //   //       height
  //   //   },
  //   // };
  // }
  //
  componentWillMount() {
    Reactotron.log('Rendering Nearby');
    Actions.refresh({ key: 'drawer', open: false });
  }


  getLocation = () =>{
    navigator.geolocation.getCurrentPosition(
      (position) => {
        console.log('pos', position);
        var initialPosition = JSON.stringify(position);
        this.setState({initialPosition});
      },
      (error) => alert(JSON.stringify(error)),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
    );
  }

  render() {
    return(
      <View>
      <Button
        backgroundColor='#007AFF'
        //color='#007AFF'
        buttonStyle={{marginTop: 20}}
        onPress={this.getLocation}

        title='送出' />

      </View>
    );
  }
}
