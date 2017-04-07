import React, { Component } from 'react';
import { View } from 'react-native';
import { FormLabel, FormValidationMessage, Icon} from 'react-native-elements';
import AutoExpandingTextInput from 'react-native-auto-expanding-textinput';
import Reactotron from 'reactotron-react-native';

const styles = {
  textAreaStyle: {
    marginHorizontal: 10,
    fontSize: 14,
  },
  labelStyle: {
    flex: 0,
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingBottom: 3 ,
  },
  editViewStyle: {
    borderBottomWidth: 1.3,
    borderBottomColor: '#B0BEC5',
    marginBottom: 8,
    marginHorizontal: 10,
  },
  normalViewStyle: {
    marginBottom: 8,
    marginHorizontal: 10,
  },
};

export default class InfoArea extends Component {
  constructor(props) {
    super(props);
    let multiline = false;
    if(this.props.maxLength > 25) {
      multiline = true;
    };

    let minH = this.props.defaultValue ? Math.round(this.props.defaultValue.length * 0.6) : 30;
    // Reactotron.log(minH);
    if(minH < 30) minH = 30;

    this.state = {
      maxLength: this.props.maxLength ? this.props.maxLength: 25,
      multiline: multiline,
      editMode: false,
      text: this.props.defaultValue ? this.props.defaultValue: '',
      maxHeight: 300,
      minHeight: minH,
      label: this.props.label,
    };
  }

  componentDidMount() {
  }

  _onChangeHeight = (before, after) => {
    // Reactotron.log('before: ' + before + ' after: ' + after);
  }

  handleTextChange = text => {
    this.setState({
      text,
    });
  }

  handleOnFocus = () => {
    this.setState({
      editMode: true,
      minHeight: 32,
    });
  }

  handleEndEditing = () => {
    this.setState({ editMode: false });
    this.props.handleFunc(this.state.text);
  }

  render() {

    const viewStyle = this.state.editMode ? styles.editViewStyle : styles.normalViewStyle;
    const editModeIcon = <Icon name='mode-edit' size={16} color='#2962FF'/>;
    return (
      <View style={viewStyle}>
        <View style={styles.labelStyle}>
          <FormLabel>
            {this.state.label}
          </FormLabel>
          {this.state.editMode && editModeIcon}
        </View>
        <AutoExpandingTextInput
          style={styles.textAreaStyle}
          value={this.state.text}
          placeholder='請輸入...'
          onFocus={this.handleOnFocus}
          onEndEditing={this.handleEndEditing}
          enablesReturnKeyAutomatically
          returnKeyType='done'
          minHeight={this.state.minHeight}
          maxHeight={240}
          onChangeText={this.handleTextChange}
          onChangeHeight={this._onChangeHeight}
          />
      </View>
    );
  }
}
