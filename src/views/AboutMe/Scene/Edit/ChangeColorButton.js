import React, { Component } from 'react';
import { Text, View, TouchableHighlight } from 'react-native';

const styles = {
  touchable: {
    width: 70,
    borderWidth: 1,
    borderRadius: 50,
    borderColor: "#696969"
  },
  view: {
    justifyContent: 'center', 
    alignItems: 'center'
  },
  text:{
    color: "#696969",
    textAlign: 'center'
  }
}

class ChangeColorButton extends Component {
  
  constructor(props) {
    super(props);
    this.state = { buttonColor: this.props.initButtonColor, textColor: this.props.initTextColor};
  }

  onPress = () => {
    if (this.state.buttonColor === this.props.initButtonColor)
      this.setState({ buttonColor: this.props.changedButtonColor, textColor: this.props.changedTextColor })
    else
      this.setState({ buttonColor: this.props.initButtonColor, textColor: this.props.initTextColor })
  }

  render(){
    return(
      <TouchableHighlight style={[styles.touchable,{ backgroundColor: this.state.buttonColor }]} onPress={this.onPress}> 
        <View style={styles.view}>
          <Text style={[styles.text,{ color: this.state.textColor }]}>
            {this.props.title}
          </Text>
        </View>
      </TouchableHighlight>     
    )
  }
}

export default ChangeColorButton;