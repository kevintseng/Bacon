import React, { Component } from 'react';
import { View, TextInput } from 'react-native';

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
    let multiline = false;
    if(this.props.maxLength > 25) {
      multiline = true;
    }
    this.state = {
      maxLength: this.props.maxLength ? this.props.maxLength: 20,
      multiline: multiline,
      editMode: false,
      text: this.props.defaultValue,
      autoFocus: this.props.autoFocus,
    };
  }

  componentDidMount() {

  }

  handleEndEditing = () => {

    this.setState({ editMode: false });
  }

  render() {
    const { text, multiline, maxLength, autoFocus, editMode } = this.state;

    const viewStyle = editMode ? styles.editViewStyle : styles.normalViewStyle;

    const fieldStyle = editMode ? styles.editFieldStyle : styles.normalFieldStyle;


    return (
      <View style={viewStyle}>
        <TextInput
          multiline={multiline}
          style={fieldStyle}
          autoFocus={autoFocus}
          onFocus={() => this.setState({ editMode: true })}
          onEndEditing={() => this.setState({ editMode: false })}
          autoCapitalize="none"
          onChangeText={(text) => this.setState({text})}
          value={text}
          maxLength = {maxLength}
          />
      </View>
    );
  }
}
