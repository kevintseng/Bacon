import React from 'react'
import { ScrollView, Dimensions } from 'react-native'

import { List, ListItem } from 'react-native-elements'
//import { Actions } from 'react-native-router-flux'
import { observer } from 'mobx-react/native'
import { SIDEBAR_LINKS } from '../Configs'
//const loading = require('../images/loading.gif')

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
    borderBottomWidth: 0
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
            //onPress         
        />
        <ListItem
            roundAvatar
            containerStyle = { listItemContainerStyle }
            avatar = { store.user.photoURL }
            title = { store.user.displayName }  
            //onPress 
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
                //onPress
              />
          ))
        }
      </List>
    </ScrollView>
  )
 }
)

export { SideBar }