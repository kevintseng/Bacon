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
          onPress={() => handleStickerPressed("https://firebasestorage.googleapis.com/v0/b/bacon-tsao.appspot.com/o/stickers%2Fboy01.png?alt=media&token=39014656-b33c-411f-816c-cb8486c030da")}
        >
          <Image
            style={{ width: 80, height: 66}}
            source={require('../stickers/boy01.png')}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={{ width: 80, height: 66, marginHorizontal: 5, marginVertical: 5 }}
          onPress={() => handleStickerPressed("https://firebasestorage.googleapis.com/v0/b/bacon-tsao.appspot.com/o/stickers%2Fboy02.png?alt=media&token=637bbaf8-436a-498c-b098-e8a083e10aa4")}
        >
          <Image
            style={{ width: 80, height: 66}}
            source={require('../stickers/boy02.png')}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={{ width: 80, height: 66, marginHorizontal: 5, marginVertical: 5 }}
          onPress={() => handleStickerPressed("https://firebasestorage.googleapis.com/v0/b/bacon-tsao.appspot.com/o/stickers%2Fboy03.png?alt=media&token=cfcb828f-0e86-4718-8959-b9992722cea2")}
        >
          <Image
            style={{ width: 80, height: 66}}
            source={require('../stickers/boy03.png')}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={{ width: 80, height: 66, marginHorizontal: 5, marginVertical: 5 }}
          onPress={() => handleStickerPressed("https://firebasestorage.googleapis.com/v0/b/bacon-tsao.appspot.com/o/stickers%2Fboy04.png?alt=media&token=df3f0275-bf34-42cd-8f50-c06bf7ff1578")}
        >
          <Image
            style={{ width: 80, height: 66}}
            source={require('../stickers/boy04.png')}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={{ width: 80, height: 66, marginHorizontal: 5, marginVertical: 5 }}
          onPress={() => handleStickerPressed("https://firebasestorage.googleapis.com/v0/b/bacon-tsao.appspot.com/o/stickers%2Fboy05.png?alt=media&token=eff23e88-1f9d-4877-bcf0-9eda670941ef")}
        >
          <Image
            style={{ width: 80, height: 66}}
            source={require('../stickers/boy05.png')}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={{ width: 80, height: 66, marginHorizontal: 5, marginVertical: 5 }}
          onPress={() => handleStickerPressed("https://firebasestorage.googleapis.com/v0/b/bacon-tsao.appspot.com/o/stickers%2Fboy06.png?alt=media&token=f2368a87-1082-4bbe-a452-c9b6aba8b53f")}
        >
          <Image
            style={{ width: 80, height: 66}}
            source={require('../stickers/boy06.png')}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={{ width: 80, height: 66, marginHorizontal: 5, marginVertical: 5 }}
          onPress={() => handleStickerPressed("https://firebasestorage.googleapis.com/v0/b/bacon-tsao.appspot.com/o/stickers%2Fboy07.png?alt=media&token=7f568fa8-43f9-4210-813c-4d392ae17ece")}
        >
          <Image
            style={{ width: 80, height: 66}}
            source={require('../stickers/boy07.png')}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={{ width: 80, height: 66, marginHorizontal: 5, marginVertical: 5 }}
          onPress={() => handleStickerPressed("https://firebasestorage.googleapis.com/v0/b/bacon-tsao.appspot.com/o/stickers%2Fboy08.png?alt=media&token=95323de9-b422-424b-9832-71927968880e")}
        >
          <Image
            style={{ width: 80, height: 66}}
            source={require('../stickers/boy08.png')}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={{ width: 80, height: 66, marginHorizontal: 5, marginVertical: 5 }}
          onPress={() => handleStickerPressed("https://firebasestorage.googleapis.com/v0/b/bacon-tsao.appspot.com/o/stickers%2Fboy09.png?alt=media&token=7aca8d77-5155-456c-85f2-ea23892b09c4")}
        >
          <Image
            style={{ width: 80, height: 66}}
            source={require('../stickers/boy09.png')}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={{ width: 80, height: 66, marginHorizontal: 5, marginVertical: 5 }}
          onPress={() => handleStickerPressed("https://firebasestorage.googleapis.com/v0/b/bacon-tsao.appspot.com/o/stickers%2Fboy10.png?alt=media&token=60215367-4460-4797-89f3-44fe4ae51fe2")}
        >
          <Image
            style={{ width: 80, height: 66}}
            source={require('../stickers/boy10.png')}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={{ width: 80, height: 66, marginHorizontal: 5, marginVertical: 5 }}
          onPress={() => handleStickerPressed("https://firebasestorage.googleapis.com/v0/b/bacon-tsao.appspot.com/o/stickers%2Fboy11.png?alt=media&token=4e68226b-b20b-4623-8748-06b9bbce2507")}
        >
          <Image
            style={{ width: 80, height: 66}}
            source={require('../stickers/boy11.png')}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={{ width: 80, height: 66, marginHorizontal: 5, marginVertical: 5 }}
          onPress={() => handleStickerPressed("https://firebasestorage.googleapis.com/v0/b/bacon-tsao.appspot.com/o/stickers%2Fboy12.png?alt=media&token=1cd05860-fd1f-4a75-bf5c-3411203b381e")}
        >
          <Image
            style={{ width: 80, height: 66}}
            source={require('../stickers/boy12.png')}
          />
        </TouchableOpacity>
      </View>
    </ScrollView>
  )
}

export default Stickers
