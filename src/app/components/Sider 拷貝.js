import React from 'react'
import { View, ScrollView, Dimensions } from 'react-native'

import { List, ListItem, Icon } from 'react-native-elements'
import SIDEBAR_LINKS from '../../configs/SidebarLinks'

//const loading = require('Bacon/src/images/loading.gif')

const { height } = Dimensions.get('window')
const list = SIDEBAR_LINKS

const styles = {
  scrollView: {
    height,
    backgroundColor: '#ffffff',
    flex: 1
  },
  listContainerStyle:{
    marginTop: 0,
    borderBottomWidth: 0,
    backgroundColor: '#ffffff',
    flex: 1
  },
  listItemContainerStyle: {
    borderBottomWidth: 0
    //backgroundColor: '#f0f0f0'
  },
  titleContainerStyle: {
    //marginLeft: 50,
    //paddingLeft: 30,
    width: 50,
    justifyContent:'center',
    alignItems: 'center',
    backgroundColor: "#2e8b57"
  },
  subListContainerStyle: {
    //paddingLeft: 100,
    backgroundColor: "#f0e68c",
    //width: 300,
    //marginLeft: 30,
    justifyContent:'center',
    alignItems: 'center',
  },
  wrapperStyle: {
    //flex: 1,
    //flexDirection: 'row',
    backgroundColor: "#4169e1",
    //justifyContent: 'flex-end',
    //margin: 10
    justifyContent:'center',
    alignItems: 'center',
    marginLeft: 15,
    //marginRight: 15
    //paddingLeft: 47
  }
}

const Sider = ({ displayTitle, displayName, photoURL, rightIconOnPress, avatarOnPress, itemOnPress }) => {

  return(
    <ScrollView style = { styles.scrollView } >
      <List containerStyle = { styles.listContainerStyle } >
        <ListItem
          title={ displayTitle }
          containerStyle = { [styles.listItemContainerStyle,{height: 53, borderBottomWidth: 0.5, borderBottomColor: '#808080'}] }
          rightIcon = {{name: 'menu', color: 'black'}}
          onPress = { rightIconOnPress }
        />
        <ListItem
          roundAvatar
          containerStyle = { styles.listItemContainerStyle }
          avatar = { photoURL }
          title = { displayName }
          onPress = { avatarOnPress }
        />
        
        {
          list.map((item, i) => (
            <View style={{flexDirection: 'row'}} key = { i }>
              <Icon style={{flex: 1, justifyContent:"center", alignItems: "flex-end"}} name={item.icon}></Icon>
                <ListItem
                  key = { i }
                  titleContainerStyle = {{justifyContent:"center", alignItems: "flex-start" }}
                  containerStyle = {{flex: 2, marginRight: 5 }}
                  underlayColor = { '#f8f8f8' }
                  title = { item.title }
                  badge = { false }
                  onPress = { itemOnPress }
                />
            </View>
          ))
        }
        </List>
    </ScrollView>
  )
 }

export default Sider
