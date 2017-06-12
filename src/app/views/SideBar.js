import React from 'react'
import { View, ScrollView, Dimensions, Text } from 'react-native'

import { List, ListItem, Icon } from 'react-native-elements'
//import { Actions } from 'react-native-router-flux'
import { observer } from 'mobx-react/native'
import SIDEBAR_LINKS from '../../configs/SidebarLinks'

const loading = require('hookup/src/images/loading.gif')
const { height, width } = Dimensions.get('window') //eslint-disable-line
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
//43
const SideBar = observer(({ store }) => {

  const { scrollView, listContainerStyle, listItemContainerStyle, subListContainerStyle, titleContainerStyle, wrapperStyle } = styles

  return(
    <ScrollView style = { scrollView } >
      <List containerStyle = { listContainerStyle } >
        <ListItem
            containerStyle = { [listItemContainerStyle,{height: 53, borderBottomWidth: 0.5, borderBottomColor: '#808080'}] }
            rightIcon = {{name: 'menu', color: 'black'}}
            onPress = { store.refreshDrawer }
        />
        <ListItem
            roundAvatar
            containerStyle = { listItemContainerStyle }
            avatar = { store.user.photoURL ? store.user.photoURL : loading}
            title = { store.user.displayName }
            onPress = { store.handleOnPress('AboutMe') }
        />
        
        {
          list.map((item, i) => (
              <View style={{flexDirection: 'row'}} key = { i }>
                <Icon style={{flex: 1, justifyContent:"center", alignItems: "flex-end"}} name={item.icon}></Icon>
                <ListItem
                  key = { i }
                  titleContainerStyle = {{justifyContent:"center", alignItems: "flex-start" }}
                  containerStyle = {{flex: 2, marginRight: 5 }}
                 // wrapperStyle = { wrapperStyle }
                  underlayColor = { '#f8f8f8' }
                  title = { item.title }
                  badge = { false }
                  onPress = { store.handleOnPress(item.key) }
                  //onLongPress = { store.handleOnPress(item.key) }
                />
              </View>
          ))
        }
        </List>
    </ScrollView>
  )
 }
)

export { SideBar }
