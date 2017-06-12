import React from 'react';
import { View, Text } from 'react-native';
//import { ListItem } from 'react-native-elements';
//import { Actions } from "react-native-router-flux";
import { EditIcon } from './EditIcon'

//const turnToEdit = () => {
//  Actions.edit({ content: this.props.editcontent })
//}

const styles = {
  Item: {
    borderBottomWidth: 1,
    borderBottomColor: "#f5f5f5",
    paddingRight: 20,  
    paddingLeft: 20,
    paddingTop: 10,
    paddingBottom: 10,
    //justifyContent: "flex-start"
    //marginBottom: 8,
    //marginHorizontal: 10,      
  },
  columnOne: {
    flexDirection: "row",
    justifyContent: "space-between"    
  }
};

const Item = (props) => {
  // API 
  const { title, displayTitle, styleTitle, tag, styleTag, onpress } = props

  return (
    <View style = { styles.Item }>
      <View style = { styles.columnOne }>
        <Text numberOfLines={1} style = { styleTitle }>{ displayTitle ? title : null }</Text>
        <EditIcon textstyle = { styleTag } text = { tag } onpress = { onpress }></EditIcon>
      </View>
      <View>
        { props.children }
      </View>  
    </View> 
  )   
}

export { Item }
/*

      <ListItem
        containerStyle = { props.containerStyle }
        key = { props.label }
        title = { props.title }
        rightTitle = "編輯"
        rightTitleStyle = { { color: '#2962FF' } }
        onPress = { turnToEdit }
        hideChevron
        subtitle = { props.content }
      />
  //handleEndEditing = () => {
  //  Actions.edit({content: this.props.content})
  //}

  render() {

    //const viewStyle = this.state.editMode ? styles.editViewStyle : styles.normalViewStyle;
    //const editModeIcon = <Icon name='mode-edit' size={16} color='#2962FF'/>;
    return (
      <View>
      <ListItem
        containerStyle = {this.props.containerStyle}
        key={this.props.label}
        title={this.props.title}
        //rightTitle={"編輯"}
        rightTitleStyle={{ color: '#2962FF' }}
        //onPress={this.handleEndEditing}
        hideChevron
        subtitle={this.state.text}
      />
      </View>

    )  
*/

/*
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
 }*/
