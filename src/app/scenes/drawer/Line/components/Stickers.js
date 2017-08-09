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
  return(
    <ScrollView directionalLockEnabled contentContainerStyle={{width: width-10, alignItems: "center"}}>
      <View style={{ flexDirection: "row", flexWrap: "wrap", width, marginBottom: 30}}>
        <TouchableOpacity
          style={{ width: 80, height: 66, marginHorizontal: 5, marginVertical: 5 }}
          onPress={() => handleStickerPressed("16861090")}
          >
          <Image
            style={{ width: 80, height: 66}}
            source={{uri: "https://sdl-stickershop.line.naver.jp/stickershop/v1/sticker/16861090/android/sticker.pngcompress=true"}}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={{ width: 80, height: 66, marginHorizontal: 5, marginVertical: 5 }}
          onPress={() => handleStickerPressed("16861091")}
          >
          <Image
            style={{ width: 80, height: 66}}
            source={{uri: "https://sdl-stickershop.line.naver.jp/stickershop/v1/sticker/16861091/android/sticker.pngcompress=true"}}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={{ width: 80, height: 66, marginHorizontal: 5, marginVertical: 5 }}
          onPress={() => handleStickerPressed("16861092")}
          >
          <Image
            style={{ width: 80, height: 66}}
            source={{uri: "https://sdl-stickershop.line.naver.jp/stickershop/v1/sticker/16861092/android/sticker.pngcompress=true"}}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={{ width: 80, height: 66, marginHorizontal: 5, marginVertical: 5 }}
          onPress={() => handleStickerPressed("16861093")}
          >
          <Image
            style={{ width: 80, height: 66}}
            source={{uri: "https://sdl-stickershop.line.naver.jp/stickershop/v1/sticker/16861093/android/sticker.pngcompress=true"}}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={{ width: 80, height: 66, marginHorizontal: 5, marginVertical: 5 }}
          onPress={() => handleStickerPressed("16861094")}
          >
          <Image
            style={{ width: 80, height: 66}}
            source={{uri: "https://sdl-stickershop.line.naver.jp/stickershop/v1/sticker/16861094/android/sticker.pngcompress=true"}}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={{ width: 80, height: 66, marginHorizontal: 5, marginVertical: 5 }}
          onPress={() => handleStickerPressed("16861095")}
          >
          <Image
            style={{ width: 80, height: 66}}
            source={{uri: "https://sdl-stickershop.line.naver.jp/stickershop/v1/sticker/16861095/android/sticker.pngcompress=true"}}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={{ width: 80, height: 66, marginHorizontal: 5, marginVertical: 5 }}
          onPress={() => handleStickerPressed("16861096")}
          >
          <Image
            style={{ width: 80, height: 66}}
            source={{uri: "https://sdl-stickershop.line.naver.jp/stickershop/v1/sticker/16861096/android/sticker.pngcompress=true"}}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={{ width: 80, height: 66, marginHorizontal: 5, marginVertical: 5 }}
          onPress={() => handleStickerPressed("16861097")}
          >
          <Image
            style={{ width: 80, height: 66}}
            source={{uri: "https://sdl-stickershop.line.naver.jp/stickershop/v1/sticker/16861097/android/sticker.pngcompress=true"}}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={{ width: 80, height: 66, marginHorizontal: 5, marginVertical: 5 }}
          onPress={() => handleStickerPressed("16861098")}
          >
          <Image
            style={{ width: 80, height: 66}}
            source={{uri: "https://sdl-stickershop.line.naver.jp/stickershop/v1/sticker/16861098/android/sticker.pngcompress=true"}}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={{ width: 80, height: 66, marginHorizontal: 5, marginVertical: 5 }}
          onPress={() => handleStickerPressed("16861099")}
          >
          <Image
            style={{ width: 80, height: 66}}
            source={{uri: "https://sdl-stickershop.line.naver.jp/stickershop/v1/sticker/16861099/android/sticker.pngcompress=true"}}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={{ width: 80, height: 66, marginHorizontal: 5, marginVertical: 5 }}
          onPress={() => handleStickerPressed("16861100")}
          >
          <Image
            style={{ width: 80, height: 66}}
            source={{uri: "https://sdl-stickershop.line.naver.jp/stickershop/v1/sticker/16861100/android/sticker.pngcompress=true"}}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={{ width: 80, height: 66, marginHorizontal: 5, marginVertical: 5 }}
          onPress={() => handleStickerPressed("16861101")}
          >
          <Image
            style={{ width: 80, height: 66}}
            source={{uri: "https://sdl-stickershop.line.naver.jp/stickershop/v1/sticker/16861101/android/sticker.pngcompress=true"}}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={{ width: 80, height: 66, marginHorizontal: 5, marginVertical: 5 }}
          onPress={() => handleStickerPressed("16861102")}
          >
          <Image
            style={{ width: 80, height: 66}}
            source={{uri: "https://sdl-stickershop.line.naver.jp/stickershop/v1/sticker/16861102/android/sticker.pngcompress=true"}}
          />
        </TouchableOpacity>
      </View>
    </ScrollView>
  )
}

export default Stickers
