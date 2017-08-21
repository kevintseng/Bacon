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
  const styles = {
    // ...Platform.select({
    //   ios: {
    //     width: 80,
    //   },
    //   android: {
    //     borderRadius: picWidth
    //   }
    // })
    sticker: {
      width: (width - 40) / 4,
      height: 66,
      marginHorizontal: 5,
      marginVertical: 5,
    },
  }

  const handlePressed = (uri) => {
    // console.log("handlePressed: ", uri)
    handleStickerPressed(uri)
  }

  return (
    <ScrollView directionalLockEnabled contentContainerStyle={{width: width - 10, alignItems: "center"}}>
      <View style={{ flexDirection: "row", flexWrap: "wrap", width, marginBottom: 30}}>
        <TouchableOpacity
          style={styles.sticker}
          onPress={() => handlePressed("https://firebasestorage.googleapis.com/v0/b/bacon-tsao.appspot.com/o/stickers%2Fboy01.png?alt=media&token=39014656-b33c-411f-816c-cb8486c030da")}
        >
          <Image
            style={{ width: 80, height: 66}}
            source={require('./sticker_imgs/boy01.png')}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.sticker}
          onPress={() => handlePressed("https://firebasestorage.googleapis.com/v0/b/bacon-tsao.appspot.com/o/stickers%2Fboy02.png?alt=media&token=637bbaf8-436a-498c-b098-e8a083e10aa4")}
        >
          <Image
            style={{ width: 80, height: 66}}
            source={require('./sticker_imgs/boy02.png')}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.sticker}
          onPress={() => handlePressed("https://firebasestorage.googleapis.com/v0/b/bacon-tsao.appspot.com/o/stickers%2Fgirl01.png?alt=media&token=501844c0-724e-404b-b891-882a71622531")}
        >
          <Image
            style={{ width: 80, height: 66}}
            source={require('./sticker_imgs/girl01.png')}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.sticker}
          onPress={() => handlePressed("https://firebasestorage.googleapis.com/v0/b/bacon-tsao.appspot.com/o/stickers%2Fgirl02.png?alt=media&token=8e712371-9901-4a2e-abb5-bc0c4756b091")}
        >
          <Image
            style={{ width: 80, height: 66}}
            source={require('./sticker_imgs/girl02.png')}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.sticker}
          onPress={() => handlePressed("https://firebasestorage.googleapis.com/v0/b/bacon-tsao.appspot.com/o/stickers%2Fboy03.png?alt=media&token=cfcb828f-0e86-4718-8959-b9992722cea2")}
        >
          <Image
            style={{ width: 80, height: 66}}
            source={require('./sticker_imgs/boy03.png')}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.sticker}
          onPress={() => handlePressed("https://firebasestorage.googleapis.com/v0/b/bacon-tsao.appspot.com/o/stickers%2Fboy04.png?alt=media&token=df3f0275-bf34-42cd-8f50-c06bf7ff1578")}
        >
          <Image
            style={{ width: 80, height: 66}}
            source={require('./sticker_imgs/boy04.png')}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.sticker}
          onPress={() => handlePressed("https://firebasestorage.googleapis.com/v0/b/bacon-tsao.appspot.com/o/stickers%2Fgirl03.png?alt=media&token=49d7b362-179a-40e5-8877-3d221e1ba8ed")}
        >
          <Image
            style={{ width: 80, height: 66}}
            source={require('./sticker_imgs/girl03.png')}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.sticker}
          onPress={() => handlePressed("https://firebasestorage.googleapis.com/v0/b/bacon-tsao.appspot.com/o/stickers%2Fgirl04.png?alt=media&token=2c4b9a45-f128-490b-b6ac-a66cf7f48d5b")}
        >
          <Image
            style={{ width: 80, height: 66}}
            source={require('./sticker_imgs/girl04.png')}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.sticker}
          onPress={() => handlePressed("https://firebasestorage.googleapis.com/v0/b/bacon-tsao.appspot.com/o/stickers%2Fboy05.png?alt=media&token=eff23e88-1f9d-4877-bcf0-9eda670941ef")}
        >
          <Image
            style={{ width: 80, height: 66}}
            source={require('./sticker_imgs/boy05.png')}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.sticker}
          onPress={() => handlePressed("https://firebasestorage.googleapis.com/v0/b/bacon-tsao.appspot.com/o/stickers%2Fboy06.png?alt=media&token=f2368a87-1082-4bbe-a452-c9b6aba8b53f")}
        >
          <Image
            style={{ width: 80, height: 66}}
            source={require('./sticker_imgs/boy06.png')}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.sticker}
          onPress={() => handlePressed("https://firebasestorage.googleapis.com/v0/b/bacon-tsao.appspot.com/o/stickers%2Fgirl05.png?alt=media&token=812f008e-3975-47d8-b83a-de60a469c666")}
        >
          <Image
            style={{ width: 80, height: 66}}
            source={require('./sticker_imgs/girl05.png')}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.sticker}
          onPress={() => handlePressed("https://firebasestorage.googleapis.com/v0/b/bacon-tsao.appspot.com/o/stickers%2Fgirl06.png?alt=media&token=ee952470-4bb7-4449-9d5f-5efb9d88ac9b")}
        >
          <Image
            style={{ width: 80, height: 66}}
            source={require('./sticker_imgs/girl06.png')}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.sticker}
          onPress={() => handlePressed("https://firebasestorage.googleapis.com/v0/b/bacon-tsao.appspot.com/o/stickers%2Fboy07.png?alt=media&token=7f568fa8-43f9-4210-813c-4d392ae17ece")}
        >
          <Image
            style={{ width: 80, height: 66}}
            source={require('./sticker_imgs/boy07.png')}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.sticker}
          onPress={() => handlePressed("https://firebasestorage.googleapis.com/v0/b/bacon-tsao.appspot.com/o/stickers%2Fboy08.png?alt=media&token=95323de9-b422-424b-9832-71927968880e")}
        >
          <Image
            style={{ width: 80, height: 66}}
            source={require('./sticker_imgs/boy08.png')}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.sticker}
          onPress={() => handlePressed("https://firebasestorage.googleapis.com/v0/b/bacon-tsao.appspot.com/o/stickers%2Fgirl07.png?alt=media&token=64e5426c-51cb-4311-a30c-0169b1bdf2c3")}
        >
          <Image
            style={{ width: 80, height: 66}}
            source={require('./sticker_imgs/girl07.png')}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.sticker}
          onPress={() => handlePressed("https://firebasestorage.googleapis.com/v0/b/bacon-tsao.appspot.com/o/stickers%2Fgirl08.png?alt=media&token=298a4ea4-1f92-4dee-bf30-2cb0308553fc")}
        >
          <Image
            style={{ width: 80, height: 66}}
            source={require('./sticker_imgs/girl08.png')}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.sticker}
          onPress={() => handlePressed("https://firebasestorage.googleapis.com/v0/b/bacon-tsao.appspot.com/o/stickers%2Fboy09.png?alt=media&token=7aca8d77-5155-456c-85f2-ea23892b09c4")}
        >
          <Image
            style={{ width: 80, height: 66}}
            source={require('./sticker_imgs/boy09.png')}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.sticker}
          onPress={() => handlePressed("https://firebasestorage.googleapis.com/v0/b/bacon-tsao.appspot.com/o/stickers%2Fboy10.png?alt=media&token=60215367-4460-4797-89f3-44fe4ae51fe2")}
        >
          <Image
            style={{ width: 80, height: 66}}
            source={require('./sticker_imgs/boy10.png')}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.sticker}
          onPress={() => handlePressed("https://firebasestorage.googleapis.com/v0/b/bacon-tsao.appspot.com/o/stickers%2Fgirl09.png?alt=media&token=6dbaa74a-b2d0-4fd7-b35b-d23ad00a08ea")}
        >
          <Image
            style={{ width: 80, height: 66}}
            source={require('./sticker_imgs/girl09.png')}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.sticker}
          onPress={() => handlePressed("https://firebasestorage.googleapis.com/v0/b/bacon-tsao.appspot.com/o/stickers%2Fgirl10.png?alt=media&token=1237083a-11d1-4ebd-980c-41f13fb83647")}
        >
          <Image
            style={{ width: 80, height: 66}}
            source={require('./sticker_imgs/girl10.png')}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.sticker}
          onPress={() => handlePressed("https://firebasestorage.googleapis.com/v0/b/bacon-tsao.appspot.com/o/stickers%2Fboy11.png?alt=media&token=4e68226b-b20b-4623-8748-06b9bbce2507")}
        >
          <Image
            style={{ width: 80, height: 66}}
            source={require('./sticker_imgs/boy11.png')}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.sticker}
          onPress={() => handlePressed("https://firebasestorage.googleapis.com/v0/b/bacon-tsao.appspot.com/o/stickers%2Fboy12.png?alt=media&token=1cd05860-fd1f-4a75-bf5c-3411203b381e")}
        >
          <Image
            style={{ width: 80, height: 66}}
            source={require('./sticker_imgs/boy12.png')}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.sticker}
          onPress={() => handlePressed("https://firebasestorage.googleapis.com/v0/b/bacon-tsao.appspot.com/o/stickers%2Fgirl11.png?alt=media&token=8019f951-c85b-42ea-a472-b3ff62d5bc31")}
        >
          <Image
            style={{ width: 80, height: 66}}
            source={require('./sticker_imgs/girl11.png')}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.sticker}
          onPress={() => handlePressed("https://firebasestorage.googleapis.com/v0/b/bacon-tsao.appspot.com/o/stickers%2Fgirl12.png?alt=media&token=8c2a7d20-39a6-45d5-987c-e181a77758fe")}
        >
          <Image
            style={{ width: 80, height: 66}}
            source={require('./sticker_imgs/girl12.png')}
          />
        </TouchableOpacity>
      </View>
    </ScrollView>
  )
}

export default Stickers
