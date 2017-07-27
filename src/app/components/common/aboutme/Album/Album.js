import React from 'react'
import { Image, FlatList, Dimensions, TouchableOpacity, Button, View } from 'react-native'

 const { width } = Dimensions.get('window')

 const picWidth = width/3

const photos = [
{key: 1, uri: 'https://pic.pimg.tw/wuntinglin/4b84e20809d8f.jpg'},
{key: 2, uri: 'https://i.imgur.com/FHxVpN4.jpg'},
{key: 3, uri: 'https://i.imgur.com/FHxVpN4.jpg'},
{key: 4, uri: 'https://i.imgur.com/FHxVpN4.jpg'},
{key: 5, uri: 'https://i.imgur.com/FHxVpN4.jpg'}
]


const Album = ({photoOnPress, photoOnLongPress, footerOnPress}) => {
  return(
    <View style={{flex: 1}}>
      <FlatList
        data={ photos } 
        numColumns={3}
        renderItem={({item}) => (
        <TouchableOpacity onPress={ photoOnPress } onLongPress={ photoOnLongPress } >
          <Image style={{width: picWidth, height: picWidth}} source={{uri: item.uri}} />
        </TouchableOpacity>
        )} 
      />
      <Button color="#d63768" title='新增照片' onPress={ footerOnPress } />
    </View>
  )
}

export default Album