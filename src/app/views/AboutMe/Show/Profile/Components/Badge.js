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
    paddingBottom: 10 
    //marginBottom: 8,
    //marginHorizontal: 10,      
  },
  columnOne: {
    flexDirection: "row",
    justifyContent: "space-between"    
  }
};

const Badge = (props) => {
  // API 
  const { title, displayTitle, styleTitle, tag, styleTag, onpress } = props

  return (
    <View style = { styles.Item }>
      <View style = { styles.columnOne }>
        <Text style = { styleTitle }>{ displayTitle ? title : null }</Text>
        <EditIcon textstyle = { styleTag } text = { tag } onpress = { onpress }></EditIcon>
      </View>
      <View>
        { props.children }
      </View>  
    </View> 
  )   
}

export default Badge
