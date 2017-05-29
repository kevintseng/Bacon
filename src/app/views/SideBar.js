import React from 'react'
import { ScrollView, Dimensions } from 'react-native'

import { List, ListItem } from 'react-native-elements'
//import { Actions } from 'react-native-router-flux'
import { observer } from 'mobx-react/native'
import SIDEBAR_LINKS from '../../configs/SidebarLinks'

const loading = require('hookup/src/images/loading.gif')
const { height } = Dimensions.get('window') //eslint-disable-line
const list = SIDEBAR_LINKS
const styles = {
  scrollView: {
    height,
    backgroundColor: '#ffffff'
  },
  listContainerStyle:{
    marginTop: 0,
    borderBottomWidth: 0,
    backgroundColor: '#ffffff'
  },
  listItemContainerStyle: {
    borderBottomWidth: 0,
    //backgroundColor: '#f0f0f0'
  },
  wrapperStyle: {
    paddingLeft: 43
  }
}

const SideBar = observer(({ store }) => {

  const { scrollView, listContainerStyle, listItemContainerStyle, wrapperStyle } = styles

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
            onPress = { store.handleOnPress('aboutMeRoutes') }
        />
        {
          list.map((item, i) => (
              <ListItem
                key = { i }
                containerStyle = { listItemContainerStyle }
                wrapperStyle = { wrapperStyle }
                underlayColor = { '#f8f8f8' }
                title = { item.title }
                leftIcon = {{name: item.icon}}
                badge = { false }
                onPress = { store.handleOnPress(item.key) }
              />
          ))
        }
      </List>
    </ScrollView>
  )
 }
)

export { SideBar }
