import React from 'react'
import { View, TouchableOpacity, Dimensions } from 'react-native'
import { Avatar, ListItem } from 'react-native-elements'
import LinearGradient from 'react-native-linear-gradient'

import VerityEmail from './VerityEmail/VerityEmail'
import VerityPhoto from './VerityPhoto/VerityPhoto'
import MemberUpgrade from './MemberUpgrade/MemberUpgrade'
import QUpgrade from './QUpgrade/QUpgrade'

const { width } = Dimensions.get('window')

const styles = {
  subtitleStyle: {
    position: 'relative',
    right: 10
  },
  subtitleTextStyle: {
    position: 'relative',
    right: 9,
    color: '#606060',
    letterSpacing: 3,
    fontFamily: 'NotoSans',
    fontWeight: 'normal'   
  },
  titleStyle: {
    position: 'relative', 
    right: 20, 
    marginBottom: 10,
    color: '#606060',
    letterSpacing: 3,
    fontFamily: 'NotoSans', 
    fontWeight: '500',
    fontSize: 15
  }
}

const colors = ['#f4a764', '#d63768']

const Profile = ({source, verityEmail, verityPhoto, displayName, age, city, bio, langs, interests, onPressDisplayName, onPressCity, onPressBio, onPressLangs, onPressInterests}) => {
  return(
    <View>
      <View style={{flexDirection: 'row',padding: 5}}>
        <View style={{justifyContent: 'center',alignItems: 'center'}}>
          <Avatar
            width={width*0.3}
            heigh={width*0.3}
            rounded
            source={{uri: source}}
            activeOpacity={0.7}
          />
        </View>

        <View style={{flex:1,paddingTop: 10, paddingLeft: 10, paddingRight: 10}}>
          <View style={{flexDirection: 'row',justifyContent: 'space-between'}}>
            <VerityEmail
              verity={ verityEmail }
              verityText={ verityEmail ? '已認證' : '尚未認證'}
            />
            <VerityPhoto
              verity={ verityPhoto }
              verityText={ verityPhoto ? '已認證' : '尚未認證'}
            />
          </View>
          <TouchableOpacity onPress={ onPressDisplayName }>
            <ListItem subtitle={ displayName + ', ' + age } subtitleStyle={styles.subtitleTextStyle} subtitleContainerStyle={styles.subtitleStyle} hideChevron />
          </TouchableOpacity>
          <TouchableOpacity onPress={ onPressCity }>
            <ListItem subtitle={ city } subtitleStyle={styles.subtitleTextStyle} subtitleContainerStyle={styles.subtitleStyle} hideChevron />
          </TouchableOpacity>
        </View>     

      </View>
      <LinearGradient start={{x: 0.0, y: 0.0}} end={{x: 1.5, y: 0.0}} colors={colors}>
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
          <ListItem title='自我介紹' titleStyle={styles.titleStyle} subtitle={ bio || '您尚未輸入自我介紹，點此輸入自我介紹' } subtitleStyle={styles.subtitleTextStyle} subtitleContainerStyle={styles.subtitleStyle} hideChevron />
        </TouchableOpacity>
        <TouchableOpacity onPress={ onPressLangs }>
          <ListItem title='語言能力' titleStyle={styles.titleStyle} subtitle={ langs || '您尚未選擇語言能力，點此輸入語言能力' } subtitleStyle={styles.subtitleTextStyle} subtitleContainerStyle={styles.subtitleStyle} hideChevron />
        </TouchableOpacity>
      </View>

    </View>
  )
}

export default Profile
