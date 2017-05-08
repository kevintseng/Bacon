import React, { Component } from 'react';
import { Alert, Button } from 'react-native';


class Interests extends Component {
  constructor(props) {
    super(props);
  
    this.state = {color: "#b0c4de"};
  }

  onPressLearnMore = () => {
    //Alert.alert('Button has been pressed!');
    this.setState = {color: "#008000"};
  }

  render(){
    return(
      <Button color={this.state.color} onPress={this.onPressLearnMore} title="Learn More" accessibilityLabel="Learn more about this purple button" />
    )
  }
}


export default Interests;