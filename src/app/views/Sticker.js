import React from 'react'
import { View, Text, Image, TouchableOpacity, Dimensions, ScrollView } from 'react-native'

const { width, height } = Dimensions.get("window")

const styles = {
  scrollView: {
    flex: 1
  },
  view: {
    flexDirection: 'row', 
    flexWrap: 'wrap', 
    flex: 1,
    padding: 5
  },
  TouchableOpacity: {
    padding: 5
  },
  image: {
    width: 74, 
    height: 64
  }
}

const Sticker = ({onPress}) => {
  return (
    <ScrollView style={styles.scrollView} >
      <View style={styles.view}>
        <TouchableOpacity style={styles.TouchableOpacity} onPress={onPress}>
          <Image style={styles.image} source={{uri: 'https://firebasestorage.googleapis.com/v0/b/bacon-fake.appspot.com/o/stickers%2Fboys%2Fboy01.png?alt=media&token=953e812d-3427-4d2b-a226-0418c2cf20d4'}} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.TouchableOpacity} onPress={onPress}>
          <Image style={styles.image} source={{uri: 'https://firebasestorage.googleapis.com/v0/b/bacon-fake.appspot.com/o/stickers%2Fboys%2Fboy02.png?alt=media&token=46a37f7a-53fc-47d0-a646-ab648f559911'}} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.TouchableOpacity} onPress={onPress}>
          <Image style={styles.image} source={{uri: 'https://firebasestorage.googleapis.com/v0/b/bacon-fake.appspot.com/o/stickers%2Fboys%2Fboy03.png?alt=media&token=a850166a-210a-4b78-bb55-41445d01582c'}} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.TouchableOpacity} onPress={onPress}>
          <Image style={styles.image} source={{uri: 'https://firebasestorage.googleapis.com/v0/b/bacon-fake.appspot.com/o/stickers%2Fboys%2Fboy04.png?alt=media&token=e135e6a1-1217-4aff-b77f-ecd38d4ae102'}} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.TouchableOpacity} onPress={onPress}>
          <Image style={styles.image} source={{uri: 'https://firebasestorage.googleapis.com/v0/b/bacon-fake.appspot.com/o/stickers%2Fboys%2Fboy05.png?alt=media&token=9397ac0f-8200-47a2-b09f-10ac753d6e02'}} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.TouchableOpacity} onPress={onPress}>
          <Image style={styles.image} source={{uri: 'https://firebasestorage.googleapis.com/v0/b/bacon-fake.appspot.com/o/stickers%2Fboys%2Fboy06.png?alt=media&token=f40dfb33-7ca6-418f-95a1-4c2de0f653ef'}} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.TouchableOpacity} onPress={onPress}>
          <Image style={styles.image} source={{uri: 'https://firebasestorage.googleapis.com/v0/b/bacon-fake.appspot.com/o/stickers%2Fboys%2Fboy07.png?alt=media&token=b76dae46-0d46-4188-bbcd-ea5f48ae0191'}} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.TouchableOpacity} onPress={onPress}>
          <Image style={styles.image} source={{uri: 'https://firebasestorage.googleapis.com/v0/b/bacon-fake.appspot.com/o/stickers%2Fboys%2Fboy08.png?alt=media&token=7f4a90d7-358e-4c50-a82a-14a8670106fe'}} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.TouchableOpacity} onPress={onPress}>
          <Image style={styles.image} source={{uri: 'https://firebasestorage.googleapis.com/v0/b/bacon-fake.appspot.com/o/stickers%2Fboys%2Fboy09.png?alt=media&token=15095c0c-8291-418e-b324-34eeb97d4a22'}} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.TouchableOpacity} onPress={onPress}>
          <Image style={styles.image} source={{uri: 'https://firebasestorage.googleapis.com/v0/b/bacon-fake.appspot.com/o/stickers%2Fboys%2Fboy10.png?alt=media&token=b075e45e-e3b3-4718-afce-7ac218fa2b5f'}} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.TouchableOpacity} onPress={onPress}>
          <Image style={styles.image} source={{uri: 'https://firebasestorage.googleapis.com/v0/b/bacon-fake.appspot.com/o/stickers%2Fboys%2Fboy11.png?alt=media&token=313e0b89-d318-4878-b5e1-a4bc5cebd6ea'}} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.TouchableOpacity} onPress={onPress}>
          <Image style={styles.image} source={{uri: 'https://firebasestorage.googleapis.com/v0/b/bacon-fake.appspot.com/o/stickers%2Fboys%2Fboy12.png?alt=media&token=3b79c0ad-5d86-4c08-bac5-ae0f3e0b607c'}} />
        </TouchableOpacity>


        <TouchableOpacity  style={styles.TouchableOpacity} onPress={onPress}>
          <Image style={styles.image} source={{uri: 'https://firebasestorage.googleapis.com/v0/b/bacon-fake.appspot.com/o/stickers%2Fgirls%2Fgirl01.png?alt=media&token=bc735425-0a06-4cc4-8587-50478eecbaf7'}} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.TouchableOpacity} onPress={onPress}>
          <Image style={styles.image} source={{uri: 'https://firebasestorage.googleapis.com/v0/b/bacon-fake.appspot.com/o/stickers%2Fgirls%2Fgirl01.png?alt=media&token=bc735425-0a06-4cc4-8587-50478eecbaf7'}} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.TouchableOpacity} onPress={onPress}>
          <Image style={styles.image} source={{uri: 'https://firebasestorage.googleapis.com/v0/b/bacon-fake.appspot.com/o/stickers%2Fgirls%2Fgirl03.png?alt=media&token=2aeeef61-c6ef-4058-abc7-0ba6a2e24c35'}} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.TouchableOpacity} onPress={onPress}>
          <Image style={styles.image} source={{uri: 'https://firebasestorage.googleapis.com/v0/b/bacon-fake.appspot.com/o/stickers%2Fgirls%2Fgirl04.png?alt=media&token=40923690-8af5-4e41-98a0-abd098f48ecf'}} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.TouchableOpacity} onPress={onPress}>
          <Image style={styles.image} source={{uri: 'https://firebasestorage.googleapis.com/v0/b/bacon-fake.appspot.com/o/stickers%2Fgirls%2Fgirl05.png?alt=media&token=4d948d61-1c52-4f6a-9651-df4826218417'}} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.TouchableOpacity} onPress={onPress}>
          <Image style={styles.image} source={{uri: 'https://firebasestorage.googleapis.com/v0/b/bacon-fake.appspot.com/o/stickers%2Fgirls%2Fgirl06.png?alt=media&token=3328a9f7-c3c6-433b-896c-fe620b9c0bdc'}} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.TouchableOpacity} onPress={onPress}>
          <Image style={styles.image} source={{uri: 'https://firebasestorage.googleapis.com/v0/b/bacon-fake.appspot.com/o/stickers%2Fgirls%2Fgirl07.png?alt=media&token=9b7c4e4f-9b92-451e-88ae-e9a367da5859'}} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.TouchableOpacity} onPress={onPress}>
          <Image style={styles.image} source={{uri: 'https://firebasestorage.googleapis.com/v0/b/bacon-fake.appspot.com/o/stickers%2Fgirls%2Fgirl08.png?alt=media&token=49abeede-deeb-4895-9f7d-17774442c744'}} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.TouchableOpacity} onPress={onPress}>
          <Image style={styles.image} source={{uri: 'https://firebasestorage.googleapis.com/v0/b/bacon-fake.appspot.com/o/stickers%2Fgirls%2Fgirl09.png?alt=media&token=917c72b0-2399-4ad3-8ae3-589e01bae7bf'}} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.TouchableOpacity} onPress={onPress}>
          <Image style={styles.image} source={{uri: 'https://firebasestorage.googleapis.com/v0/b/bacon-fake.appspot.com/o/stickers%2Fgirls%2Fgirl10.png?alt=media&token=1e501a25-1928-40f2-aa9f-b817d40764fe'}} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.TouchableOpacity} onPress={onPress}>
          <Image style={styles.image} source={{uri: 'https://firebasestorage.googleapis.com/v0/b/bacon-fake.appspot.com/o/stickers%2Fgirls%2Fgirl11.png?alt=media&token=d80eb01f-0dc3-4ab3-b4c2-125b8199056a'}} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.TouchableOpacity} onPress={onPress}>
          <Image style={styles.image} source={{uri: 'https://firebasestorage.googleapis.com/v0/b/bacon-fake.appspot.com/o/stickers%2Fgirls%2Fgirl12.png?alt=media&token=d5d76876-65d4-4411-8cc9-e2d5fb9dfca3'}} />
        </TouchableOpacity>
      </View>
    </ScrollView>
  )
}

export default Sticker
