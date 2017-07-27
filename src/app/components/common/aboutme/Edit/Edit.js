import React from 'react'
import { View, Text, TouchableOpacity, Image, Dimensions } from 'react-native'
import { Avatar, ListItem } from 'react-native-elements'

import VerityEmail from '../VerityEmail/VerityEmail'
import VerityPhoto from '../VerityPhoto/VerityPhoto'

const { width } = Dimensions.get('window')

const styles = {
  subtitleStyle: {
    position: 'relative',
    right: 10
  },
  subtitleTextStyle: {
    position: 'relative',
    right: 10,
    color: '#606060',
    letterSpacing: 3,
    fontFamily: 'NotoSans',
    fontWeight: '500'   
  }
}

const Edit = ({onPressDisplayName, onPressCity}) => {
  return(
    <View style={{flexDirection: 'row',padding: 5}}>
      <View style={{justifyContent: 'center',alignItems: 'center'}}>
        <Avatar
          width={width*0.3}
          heigh={width*0.3}
          rounded
          source={{uri: "https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg"}}
          onPress={() => console.log("Works!")}
          activeOpacity={0.7}
        />
      </View>

      <View style={{flex:1,paddingTop: 10, paddingLeft: 10, paddingRight: 10}}>
        <View style={{flexDirection: 'row',justifyContent: 'space-between'}}>
          <VerityEmail
            VerityEmailText='尚未認證'
          />
          <VerityPhoto
            VerityPhotoText='尚未認證'
          />
        </View>
        <TouchableOpacity onPress={ onPressDisplayName }>
          <ListItem subtitle='Vice President, 38' subtitleStyle={styles.subtitleTextStyle} subtitleContainerStyle={styles.subtitleStyle} hideChevron />
        </TouchableOpacity>
        <TouchableOpacity onPress={ onPressCity }>
          <ListItem subtitle='新北市板橋區自強里' subtitleStyle={styles.subtitleTextStyle} subtitleContainerStyle={styles.subtitleStyle} hideChevron />
        </TouchableOpacity>
      </View>

    </View>
  )
}

export default Edit
