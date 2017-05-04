import React, { Component } from 'react';
import { View } from 'react-native';
import { ListItem } from 'react-native-elements';
import { Actions } from "react-native-router-flux";
//import AutoExpandingTextInput from 'react-native-auto-expanding-textinput';
// 
/*
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
    paddingRight: 15,
    justifyContent: 'space-between',
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
*/
export default class NewInfoArea extends Component {
  constructor(props) {
    super(props);
    let multiline = false;
    if(this.props.maxLength > 25) {
      multiline = true;
    }

    let minH = this.props.defaultValue ? Math.round(this.props.defaultValue.length * 0.6) : 30;
    // console.log(minH);
    if(minH < 30) minH = 30;

    this.state = {
      maxLength: this.props.maxLength ? this.props.maxLength: 25,
      multiline,
      editMode: false,
      text: this.props.defaultValue ? this.props.defaultValue: 'NoData',
      maxHeight: 300,
      minHeight: minH,
      label: this.props.label,
    };
  }


  handleEndEditing = () => {
    Actions.edit()
  }

  render() {

    //const viewStyle = this.state.editMode ? styles.editViewStyle : styles.normalViewStyle;
    //const editModeIcon = <Icon name='mode-edit' size={16} color='#2962FF'/>;
    return (
      <View>
      <ListItem
        key={this.props.label}
        title={this.props.title}
        rightTitle={"編輯"}
        rightTitleStyle={{ color: '#2962FF' }}
        onPress={this.handleEndEditing}
        hideChevron
        subtitle={this.state.text}
      />
      </View>

    )     
  }
}
