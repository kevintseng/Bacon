import React from 'react'
import { View, Text, TouchableOpacity, Image, Dimensions } from 'react-native'
import { Avatar, ListItem } from 'react-native-elements'
import LinearGradient from 'react-native-linear-gradient'

import VerityEmail from '../VerityEmail/VerityEmail'
import VerityPhoto from '../VerityPhoto/VerityPhoto'
import MemberUpgrade from '../MemberUpgrade/MemberUpgrade'
import QUpgrade from '../QUpgrade/QUpgrade'

const { width } = Dimensions.get('window')

const styles = {
  subtitleStyle: {
    backgroundColor: 'transparent',
    position: 'relative',
    right: 10
  },
  subtitleTextStyle: {
    backgroundColor: 'transparent',
    position: 'relative',
    right: 10,
    color: '#606060',
    letterSpacing: 3,
    fontFamily: 'NotoSans',
    fontWeight: 'normal'   
  },
  titleStyle: {
    backgroundColor: 'transparent',
    position: 'relative', 
    right: 20, 
    marginBottom: 10,
    color: '#606060',
    letterSpacing: 3,
    fontFamily: 'NotoSans', 
    fontWeight: '500'   
  }
}

const colors = ['#f4a764', '#d63768']


const Edit = ({onPressDisplayName, onPressCity, onPressBio}) => {
  return(
    <View>
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
      <LinearGradient start={{x: 0.0, y: 0.0}} end={{x: 1.5, y: 0.0}}colors={colors} style={styles.linearGradient}>
        <View style={{flexDirection: 'row',justifyContent: 'space-around',alignItems: 'center',paddingTop: 10, paddingBottom: 10}}>
            <MemberUpgrade
              MemberUpgradeText='一般會員'
            />
            <QUpgrade
              QUpgradeText='Q點'
              QUpgradeValue='2134'
            />
        </View>
      </LinearGradient> 
      <View style={{paddingRight: 10, paddingLeft: 10}}>
        <TouchableOpacity onPress={ onPressBio }>
          <ListItem title='自我介紹' titleStyle={styles.titleStyle} subtitle='我叫王大明...' subtitleStyle={styles.subtitleTextStyle} subtitleContainerStyle={styles.subtitleStyle} hideChevron />
        </TouchableOpacity>
        <TouchableOpacity onPress={ onPressBio }>
          <ListItem title='語言能力' titleStyle={styles.titleStyle} subtitle='中文(流利),英文(普通)' subtitleStyle={styles.subtitleTextStyle} subtitleContainerStyle={styles.subtitleStyle} hideChevron />
        </TouchableOpacity>
        <TouchableOpacity onPress={ onPressBio }>
          <ListItem title='興趣愛好' titleStyle={styles.titleStyle} subtitle='你尚未編輯興趣愛好..' subtitleStyle={styles.subtitleTextStyle} subtitleContainerStyle={styles.subtitleStyle} hideChevron />
        </TouchableOpacity>
      </View>

    </View>
  )
}

export default Edit
