import React, { Component } from 'react';
import { View, TextInput, TouchableOpacity } from 'react-native';

const styles = {
  editViewStyle: {
    borderBottomWidth: 0.3,
    borderBottomColor: 'gray',
    marginBottom: 3
  },
  normalViewStyle: {
    marginBottom: 3,
  },
  editFieldStyle: {
    alignSelf: 'flex-start',
    width: 200,
    paddingHorizontal: 5,
    paddingBottom: 2,
    height: 30,
    fontSize: 14,
    color: 'gray',
  },
  normalFieldStyle: {
    alignSelf: 'flex-start',
    width: 200,
    paddingHorizontal: 5,
    paddingBottom: 2,
    height: 30,
    fontSize: 14,
  },
};

export default class InputField extends Component {
  constructor(props) {
    super(props);
    this.state = {
      maxLength: 20,
      editMode: false,
      text: '',
    };
  }

  componentDidMount() {
    this.setState({
      text: this.props.defaultValue,
      maxLength: this.props.maxLength ? this.props.maxLength: 20
    });
  }

  handleEndEditing = () => {
    
    this.setState({ editMode: false });
  }

  render() {
    const viewStyle = this.state.editMode ? styles.editViewStyle : styles.normalViewStyle;
    const fieldStyle = this.state.editMode ? styles.editFieldStyle : styles.normalFieldStyle;
    return (
      <View style={viewStyle}>
        <TextInput
          style={fieldStyle}
          onFocus={() => this.setState({ editMode: true })}
          onEndEditing={() => this.setState({ editMode: false })}
          autoCapitalize="none"
          onChangeText={(text) => this.setState({text})}
          value={this.state.text}
          maxLength = {this.state.maxLength}
          />
      </View>
    );
  }
}
