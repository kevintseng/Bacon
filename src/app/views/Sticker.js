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
        <TouchableOpacity style={{padding: 5}} onPress={onPress}>
          <Image style={{width: 74, height: 64}} source={{uri: 'https://firebasestorage.googleapis.com/v0/b/bacon-fake.appspot.com/o/BaconSticker%2Fboy09.png?alt=media&token=46961f8c-6dde-42fd-9f16-af732fdf90ce'}} />
        </TouchableOpacity>
        <TouchableOpacity style={{padding: 5}} onPress={onPress}>
          <Image style={{width: 74, height: 64}} source={{uri: 'https://firebasestorage.googleapis.com/v0/b/bacon-fake.appspot.com/o/BaconSticker%2Fboy10.png?alt=media&token=0d6b4860-bbfd-4c07-8d86-830a1acb4ef9'}} />
        </TouchableOpacity>
        <TouchableOpacity style={{padding: 5}} onPress={onPress}>
          <Image style={{width: 74, height: 64}} source={{uri: 'https://firebasestorage.googleapis.com/v0/b/bacon-fake.appspot.com/o/BaconSticker%2Fboy11.png?alt=media&token=56a9090b-9f60-4e1e-a7bb-89f1ddb7968a'}} />
        </TouchableOpacity>
        <TouchableOpacity style={{padding: 5}} onPress={onPress}>
          <Image style={{width: 74, height: 64}} source={{uri: 'https://firebasestorage.googleapis.com/v0/b/bacon-fake.appspot.com/o/BaconSticker%2Fboy12.png?alt=media&token=1a9fa7c5-0208-4d20-8dde-04602655e290'}} />
        </TouchableOpacity>


        <TouchableOpacity  style={{padding: 5}} onPress={onPress}>
          <Image style={{width: 74, height: 64}} source={{uri: 'https://firebasestorage.googleapis.com/v0/b/bacon-fake.appspot.com/o/BaconSticker%2Fgirl01.png?alt=media&token=8b62aa65-3c7a-4888-b4ac-7615ad290c13'}} />
        </TouchableOpacity>
        <TouchableOpacity style={{padding: 5}} onPress={onPress}>
          <Image style={{width: 74, height: 64}} source={{uri: 'https://firebasestorage.googleapis.com/v0/b/bacon-fake.appspot.com/o/BaconSticker%2Fgirl02.png?alt=media&token=815e7f25-b592-49e1-b50c-06df3484ceb8'}} />
        </TouchableOpacity>
        <TouchableOpacity style={{padding: 5}} onPress={onPress}>
          <Image style={{width: 74, height: 64}} source={{uri: 'https://firebasestorage.googleapis.com/v0/b/bacon-fake.appspot.com/o/BaconSticker%2Fgirl03.png?alt=media&token=7c23a617-9ecf-457b-8661-9c64ec758745'}} />
        </TouchableOpacity>
        <TouchableOpacity style={{padding: 5}} onPress={onPress}>
          <Image style={{width: 74, height: 64}} source={{uri: 'https://firebasestorage.googleapis.com/v0/b/bacon-fake.appspot.com/o/BaconSticker%2Fgirl03.png?alt=media&token=7c23a617-9ecf-457b-8661-9c64ec758745'}} />
        </TouchableOpacity>
        <TouchableOpacity style={{padding: 5}} onPress={onPress}>
          <Image style={{width: 74, height: 64}} source={{uri: 'https://firebasestorage.googleapis.com/v0/b/bacon-fake.appspot.com/o/BaconSticker%2Fgirl03.png?alt=media&token=7c23a617-9ecf-457b-8661-9c64ec758745'}} />
        </TouchableOpacity>
        <TouchableOpacity style={{padding: 5}} onPress={onPress}>
          <Image style={{width: 74, height: 64}} source={{uri: 'https://firebasestorage.googleapis.com/v0/b/bacon-fake.appspot.com/o/BaconSticker%2Fgirl06.png?alt=media&token=03cf1bb8-d3b9-4c23-b72c-dfe251620014'}} />
        </TouchableOpacity>
        <TouchableOpacity style={{padding: 5}} onPress={onPress}>
          <Image style={{width: 74, height: 64}} source={{uri: 'https://firebasestorage.googleapis.com/v0/b/bacon-fake.appspot.com/o/BaconSticker%2Fgirl07.png?alt=media&token=a27c6f6b-6879-467f-8cdd-bf986ec0b5be'}} />
        </TouchableOpacity>
        <TouchableOpacity style={{padding: 5}} onPress={onPress}>
          <Image style={{width: 74, height: 64}} source={{uri: 'https://firebasestorage.googleapis.com/v0/b/bacon-fake.appspot.com/o/BaconSticker%2Fgirl07.png?alt=media&token=a27c6f6b-6879-467f-8cdd-bf986ec0b5be'}} />
        </TouchableOpacity>
        <TouchableOpacity style={{padding: 5}} onPress={onPress}>
          <Image style={{width: 74, height: 64}} source={{uri: 'https://firebasestorage.googleapis.com/v0/b/bacon-fake.appspot.com/o/BaconSticker%2Fgirl09.png?alt=media&token=14d2f672-09b3-4033-8465-e6658e0f7e48'}} />
        </TouchableOpacity>
        <TouchableOpacity style={{padding: 5}} onPress={onPress}>
          <Image style={{width: 74, height: 64}} source={{uri: 'https://firebasestorage.googleapis.com/v0/b/bacon-fake.appspot.com/o/BaconSticker%2Fgirl10.png?alt=media&token=e435d204-fc7d-4bf6-9c7e-eec4a3e4bb64'}} />
        </TouchableOpacity>
        <TouchableOpacity style={{padding: 5}} onPress={onPress}>
          <Image style={{width: 74, height: 64}} source={{uri: 'https://firebasestorage.googleapis.com/v0/b/bacon-fake.appspot.com/o/BaconSticker%2Fgirl11.png?alt=media&token=a3ea35bc-9cd7-4568-8642-4baead084bf3'}} />
        </TouchableOpacity>
        <TouchableOpacity style={{padding: 5}} onPress={onPress}>
          <Image style={{width: 74, height: 64}} source={{uri: 'https://firebasestorage.googleapis.com/v0/b/bacon-fake.appspot.com/o/BaconSticker%2Fgirl12.png?alt=media&token=fa62ef65-f542-4fb5-9ba2-ecfce57ef82f'}} />
        </TouchableOpacity>
      </View>
    </ScrollView>
  )
}

export default Sticker
