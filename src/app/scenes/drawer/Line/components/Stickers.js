/*
  Stickers component for Stickers accessory
  Props: width, handleStickerPressed function
*/
import React from 'react'
import {
  ScrollView,
  View,
  Image,
  TouchableOpacity,
} from "react-native"

const Stickers = ({width, handleStickerPressed}) => {
  return (
    <ScrollView directionalLockEnabled contentContainerStyle={{width: width - 10, alignItems: "center"}}>
      <View style={{ flexDirection: "row", flexWrap: "wrap", width, marginBottom: 30}}>
        <TouchableOpacity
          style={{ width: 80, height: 66, marginHorizontal: 5, marginVertical: 5 }}
          onPress={() => handleStickerPressed("boy01")}
        >
          <Image
            style={{ width: 80, height: 66}}
            source={require('../../../../../stickers/boy01.png')}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={{ width: 80, height: 66, marginHorizontal: 5, marginVertical: 5 }}
          onPress={() => handleStickerPressed("boy02")}
        >
          <Image
            style={{ width: 80, height: 66}}
            source={require('../../../../../stickers/boy02.png')}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={{ width: 80, height: 66, marginHorizontal: 5, marginVertical: 5 }}
          onPress={() => handleStickerPressed("boy03")}
        >
          <Image
            style={{ width: 80, height: 66}}
            source={require('../../../../../stickers/boy03.png')}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={{ width: 80, height: 66, marginHorizontal: 5, marginVertical: 5 }}
          onPress={() => handleStickerPressed("boy04")}
        >
          <Image
            style={{ width: 80, height: 66}}
            source={require('../../../../../stickers/boy04.png')}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={{ width: 80, height: 66, marginHorizontal: 5, marginVertical: 5 }}
          onPress={() => handleStickerPressed("boy05")}
        >
          <Image
            style={{ width: 80, height: 66}}
            source={require('../../../../../stickers/boy05.png')}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={{ width: 80, height: 66, marginHorizontal: 5, marginVertical: 5 }}
          onPress={() => handleStickerPressed("boy06")}
        >
          <Image
            style={{ width: 80, height: 66}}
            source={require('../../../../../stickers/boy06.png')}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={{ width: 80, height: 66, marginHorizontal: 5, marginVertical: 5 }}
          onPress={() => handleStickerPressed("boy07")}
        >
          <Image
            style={{ width: 80, height: 66}}
            source={require('../../../../../stickers/boy07.png')}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={{ width: 80, height: 66, marginHorizontal: 5, marginVertical: 5 }}
          onPress={() => handleStickerPressed("boy08")}
        >
          <Image
            style={{ width: 80, height: 66}}
            source={require('../../../../../stickers/boy08.png')}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={{ width: 80, height: 66, marginHorizontal: 5, marginVertical: 5 }}
          onPress={() => handleStickerPressed("boy09")}
        >
          <Image
            style={{ width: 80, height: 66}}
            source={require('../../../../../stickers/boy09.png')}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={{ width: 80, height: 66, marginHorizontal: 5, marginVertical: 5 }}
          onPress={() => handleStickerPressed("boy10")}
        >
          <Image
            style={{ width: 80, height: 66}}
            source={require('../../../../../stickers/boy10.png')}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={{ width: 80, height: 66, marginHorizontal: 5, marginVertical: 5 }}
          onPress={() => handleStickerPressed("boy11")}
        >
          <Image
            style={{ width: 80, height: 66}}
            source={require('../../../../../stickers/boy11.png')}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={{ width: 80, height: 66, marginHorizontal: 5, marginVertical: 5 }}
          onPress={() => handleStickerPressed("boy12")}
        >
          <Image
            style={{ width: 80, height: 66}}
            source={require('../../../../../stickers/boy12.png')}
          />
        </TouchableOpacity>
      </View>
    </ScrollView>
  )
}

export default Stickers
