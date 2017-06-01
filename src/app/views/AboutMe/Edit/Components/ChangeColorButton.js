import React, { Component } from 'react';
import { Text, View, TouchableHighlight } from 'react-native';

const styles = {
  view: {
    justifyContent: 'center', 
    alignItems: 'center',
    paddingRight: 25,
    //paddingLeft: 18,
  },  
  touchable: {
    width: 60,
    borderWidth: 1,
    borderRadius: 50,
    height: 20,
  },
  text:{
    textAlign: 'center'
  }
}

class ChangeColorButton extends Component {
  
  constructor(props) {
    super(props);
    //this.state = { buttonColor: this.props.initButtonColor, textColor: this.props.initTextColor};
    this.state = { buttonState: false } //true means chosed
  }

  onPress = () => {
    //if (this.state.buttonColor === this.props.initButtonColor)
    //  this.setState({ buttonColor: this.props.changedButtonColor, textColor: this.props.changedTextColor })
    //else
    //  this.setState({ buttonColor: this.props.initButtonColor, textColor: this.props.initTextColor })
    this.setState({ buttonState: !this.state.buttonState })
  }

  render(){
    return(
      //backgroundColor: this.state.buttonColor
      //this.state.textColor
      <View style = { styles.view }>
        <TouchableHighlight style = { [styles.touchable,{ backgroundColor: this.state.buttonState ? this.props.changedButtonColor : this.props.initButtonColor }] } onPress = { this.onPress }>
          <Text style = { [styles.text,{ color: this.state.buttonState ? this.props.changedTextColor : this.props.initTextColor }] }>
            { this.props.title }
          </Text>
        </TouchableHighlight>
      </View>     
    )
  }
}

export default ChangeColorButton;