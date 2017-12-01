import React from 'react'
import { View, TouchableOpacity, Dimensions } from 'react-native'
import { Avatar, ListItem } from 'react-native-elements'
import LinearGradient from 'react-native-linear-gradient'

import VerityEmail from './VerityEmail/VerityEmail'
import VerityPhoto from './VerityPhoto/VerityPhoto'
import MemberUpgrade from './MemberUpgrade/MemberUpgrade'
import QUpgrade from './QUpgrade/QUpgrade'
import CircleImage from 'react-native-bacon-circle-image' 

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
    fontWeight: 'normal',
    fontSize: 14   
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

const Profile = ({source, vip, bonus, verityEmail, verityPhoto, displayName, age, city, bio, langs, interests, onPressDisplayName, onPressCity, onPressBio, onPressLangs, onPressInterests, onPressMemberUpgrade, onPressQUpgrade, onPressEmail, showVerityPhoto}) => {
  return(
    <View>
      <View style={{flexDirection: 'row',padding: 5}}>
        <View style={{justifyContent: 'center',alignItems: 'center'}}>
          <CircleImage
            source={{uri: source}}
            disabled
            radius={width*0.15}
            placeholderSource={require('../../images/ico_qy_head_preload.png')}
            loadingStyle={{ size: 'small', color: '#b3b3b3' }}
          />
        </View>

        <View style={{flex:1,paddingTop: 10, paddingLeft: 10, paddingRight: 10}}>
          <View style={{flexDirection: 'row',justifyContent: 'flex-end'}}>
            <View>
              <VerityEmail
                verity={ verityEmail }
                verityText={ verityEmail ? '電子郵件已認證' : '電子郵件尚未認證'}
                onPress={ onPressEmail }
              />
            </View>
            { showVerityPhoto &&
              <View style={{paddingRight: 10}}>
                <VerityPhoto
                  verity={ verityPhoto }
                  verityText={ verityPhoto ? '已認證' : '尚未認證'}
                />
              </View>
            }
          </View>
          <TouchableOpacity onPress={ onPressDisplayName }>
            <ListItem subtitle={ (displayName || '') + '，' + (age || '') } subtitleStyle={styles.subtitleTextStyle} subtitleContainerStyle={styles.subtitleStyle} hideChevron />
          </TouchableOpacity>
          <TouchableOpacity onPress={ onPressCity }>
            <ListItem subtitle={ city || '' } subtitleStyle={styles.subtitleTextStyle} subtitleContainerStyle={styles.subtitleStyle} hideChevron />
          </TouchableOpacity>
        </View>     

      </View>
      <LinearGradient start={{x: 0.0, y: 0.0}} end={{x: 1.5, y: 0.0}} colors={colors}>
        <View style={{flexDirection: 'row',justifyContent: 'space-around',alignItems: 'center',paddingTop: 10, paddingBottom: 10}}>
            <MemberUpgrade
              vip={ vip || false }
              onPress={ onPressMemberUpgrade }
            />
            <QUpgrade
              QUpgradeText='Q點'
              QUpgradeValue={ bonus || 0 }
              onPress={ onPressQUpgrade }
            />
        </View>
      </LinearGradient> 
      <View style={{paddingRight: 15, paddingLeft: 15}}>
        <TouchableOpacity onPress={ onPressBio }>
          <ListItem title='自我介紹' titleStyle={styles.titleStyle} subtitle={ bio || '點此輸入自我介紹' } subtitleStyle={styles.subtitleTextStyle} subtitleContainerStyle={styles.subtitleStyle} hideChevron />
        </TouchableOpacity>
        <TouchableOpacity onPress={ onPressLangs }>
          <ListItem title='語言能力' titleStyle={styles.titleStyle} subtitle={ langs || '點此輸入語言能力' } subtitleStyle={styles.subtitleTextStyle} subtitleContainerStyle={styles.subtitleStyle} hideChevron />
        </TouchableOpacity>
      </View>

    </View>
  )
}

export default Profile
