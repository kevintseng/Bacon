import React from 'react'
import { View, Image, Text, TouchableOpacity, Dimensions } from 'react-native'
import { Badge } from 'react-native-elements'

const styles = {
  listItems: {
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    paddingTop: 7, 
    paddingBottom: 7 
  },
  badge: {
    width: 40,
    opacity: 0, 
    justifyContent: 'center' 
  },
  container: {
    backgroundColor: 'red'    
  },
  middle: {
    justifyContent: 'center', 
    alignItems: 'center'
  },
  _middle: {
    flexDirection: 'row'    
  },
  image: {
    alignSelf: 'center',
    marginRight: 5    
  },
  bottom: {
    alignSelf: 'center',
    marginLeft: 5
  },
  title: {
    textAlign: 'center',
    color: '#606060',
    fontWeight: 'normal', 
    fontSize: 16
  },
  _container: {
    backgroundColor: 'red'    
  },
  showBadge: {
    width: 40,
    justifyContent: 'center'     
  },
  _showBadge: {
    width: 40, 
    opacity: 0,
    justifyContent: 'center'    
  }
}

const ListItem = ({listPicSource, listTitle, showBadge, badgeCount, listOnPress}) => {

  const _badgeCount = badgeCount > 99 ? 99 : badgeCount

  return(
    <TouchableOpacity style={ styles.listItems } onPress={ listOnPress }>
      <View style={ styles.badge } >
        <Badge value={0} containerStyle={ styles.container }/>
      </View>   
      <View style={ styles.middle }>      
        <View style={ styles._middle}>
          <View style={ styles.image }>
            <Image source={ listPicSource } />
          </View>
          <View style={ styles.bottom }>
            <Text style={ styles.title }>{ listTitle }</Text>
          </View>
        </View>
      </View>
      <View style={ showBadge ? styles.showBadge : styles._showBadge } >
        <Badge value={ _badgeCount } containerStyle={ styles._container }/>
      </View>
    </TouchableOpacity>
  )
}

export default ListItem