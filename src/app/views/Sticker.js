import React from 'react'
import { View, Text, Image, TouchableOpacity, Dimensions, ScrollView } from 'react-native'

const { width, height } = Dimensions.get("window")

const Sticker = ({onPress}) => {
  return (
    <ScrollView style={{flex: 1}} >
      <View style={{flexDirection: 'row', flexWrap: 'wrap', flex: 1,padding: 5}}>
        <TouchableOpacity  style={{padding: 5}} onPress={onPress}>
          <Image style={{width: 74, height: 64}} source={{uri: 'https://firebasestorage.googleapis.com/v0/b/bacon-fake.appspot.com/o/BaconSticker%2Fboy01.png?alt=media&token=bfb6acba-7115-429a-9c2e-0453c17876ed'}} />
        </TouchableOpacity>
        <TouchableOpacity style={{padding: 5}} onPress={onPress}>
          <Image style={{width: 74, height: 64}} source={{uri: 'https://firebasestorage.googleapis.com/v0/b/bacon-fake.appspot.com/o/BaconSticker%2Fboy02.png?alt=media&token=cdb1b6bc-9eaf-4e02-90a7-440fdeeba503'}} />
        </TouchableOpacity>
        <TouchableOpacity style={{padding: 5}} onPress={onPress}>
          <Image style={{width: 74, height: 64}} source={{uri: 'https://firebasestorage.googleapis.com/v0/b/bacon-fake.appspot.com/o/BaconSticker%2Fboy03.png?alt=media&token=1f9b3f01-6bbf-4d20-975d-0547da7c9c4e'}} />
        </TouchableOpacity>
        <TouchableOpacity style={{padding: 5}} onPress={onPress}>
          <Image style={{width: 74, height: 64}} source={{uri: 'https://firebasestorage.googleapis.com/v0/b/bacon-fake.appspot.com/o/BaconSticker%2Fboy04.png?alt=media&token=387a2f42-53ff-46e9-b778-71602cd2afe4'}} />
        </TouchableOpacity>
        <TouchableOpacity style={{padding: 5}} onPress={onPress}>
          <Image style={{width: 74, height: 64}} source={{uri: 'https://firebasestorage.googleapis.com/v0/b/bacon-fake.appspot.com/o/BaconSticker%2Fboy05.png?alt=media&token=313810de-a228-4f48-a274-0ca3ed2a7447'}} />
        </TouchableOpacity>
        <TouchableOpacity style={{padding: 5}} onPress={onPress}>
          <Image style={{width: 74, height: 64}} source={{uri: 'https://firebasestorage.googleapis.com/v0/b/bacon-fake.appspot.com/o/BaconSticker%2Fboy06.png?alt=media&token=b0f958d9-3ce6-4ef0-b001-38491c4ef8c1'}} />
        </TouchableOpacity>
        <TouchableOpacity style={{padding: 5}} onPress={onPress}>
          <Image style={{width: 74, height: 64}} source={{uri: 'https://firebasestorage.googleapis.com/v0/b/bacon-fake.appspot.com/o/BaconSticker%2Fboy07.png?alt=media&token=d1b9698f-4006-46a5-82bb-dd858fbf821b'}} />
        </TouchableOpacity>
        <TouchableOpacity style={{padding: 5}} onPress={onPress}>
          <Image style={{width: 74, height: 64}} source={{uri: 'https://firebasestorage.googleapis.com/v0/b/bacon-fake.appspot.com/o/BaconSticker%2Fboy08.png?alt=media&token=79c1c610-4de6-4402-89f3-a348f9f8a501'}} />
        </TouchableOpacity>
      </View>
    </ScrollView>
  )
}

export default Sticker
