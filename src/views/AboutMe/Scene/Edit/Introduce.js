import React, { Component } from 'react';
import { View, Text, TextInput } from 'react-native';

class Introduce extends Component {
  
  constructor(props) {
    super(props);
    this.state = { text: 'Useless Placeholder' };
  }
  //let firebase = this.props.fire

  render(){
    return(
      <View> 
        <Text>自我介紹</Text> 
        <TextInput
          //style={{height: 400, width: 200}}
          multiline={true}
          numberOfLines={4}          
          onChangeText={(text) => this.setState({text})}
          value={this.state.text}
        />  
      </View>
    )
  }
}

export default Introduce;