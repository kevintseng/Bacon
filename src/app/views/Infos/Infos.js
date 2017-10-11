import React from 'react'
import { View, Text, Image, TouchableOpacity, Dimensions } from 'react-native'
import { Icon } from 'react-native-elements'
import { Modal } from 'react-native-modal'

const { width } = Dimensions.get('window')

const styles = {
  top: {
    flexDirection: 'row', 
    alignSelf: 'center', 
    alignItems: 'center'
  },
  bioView: {
    marginTop: 10, 
    alignSelf: 'center', 
    alignItems: 'center', 
    paddingRight: 20, 
    paddingLeft: 20
  },
  distanceView: {
    marginTop: 10, 
    flexDirection: 'row', 
    alignSelf: 'center', 
    alignItems: 'center'
  },
  addressView: { 
    marginTop: 10, 
    flexDirection: 'row', 
    alignSelf: 'center', 
    alignItems: 'center'
  },
  langsView: {
    marginTop: 10, 
    flexDirection: 'row', 
    alignSelf: 'center', 
    alignItems: 'center'
  },
  blockadeView: {
    marginTop: 10, 
    flexDirection: 'row', 
    alignSelf: 'center', 
    alignItems: 'center'
  },
  reportView: {
    marginTop: 10, 
    flexDirection: 'row', 
    alignSelf: 'center', 
    alignItems: 'center'
  },
  text: {
    fontSize: 13,
    color: '#606060',
    fontFamily: 'NotoSans'
  },
  icon: {
    marginRight: 5
  }
}

const Infos = ({verityEmail, verityPhoto, displayName, bio, age, address, langs, distance, showDistance, showBlockade, showReportUser, onReportUserPressed}) => (
  <View style={{width: width*0.8}}>
    <View style={styles.top}>
      <Image style={{marginRight: 5}} source={verityEmail ? require('./img/ico_meet_email_1.png') : require('./img/ico_aboutme_mail_0.png')}/>
      <Text style={{fontSize: 20,color: '#606060',fontFamily: 'NotoSans'}}>{ displayName }</Text>
      <Text style={{fontSize: 20,color: '#606060',fontFamily: 'NotoSans'}}>, </Text>
      <Text style={{fontSize: 20,color: '#606060',fontFamily: 'NotoSans'}}>{ age }</Text>
    </View>

    <View style={styles.bioView}><Text style={styles.text}>{ bio || '?' }</Text></View>

    { showDistance &&
      <View style={styles.distanceView}>
        <Image style={styles.icon} source={require('./img/ico_meet_locate.png')}/>
        <Text style={styles.text}>你們距離大約 { distance } 公里</Text>
      </View>
    }

    <View style={styles.addressView}>
      <Image style={styles.icon} source={require('./img/ico_meet_globe.png')}/>
      <Text style={styles.text}>{ address || '漂無定所' }</Text>
    </View>

    <View style={styles.langsView}>
      <Image style={styles.icon} source={require('./img/ico_meet_globe.png')}/>
      <Text style={styles.text}>{ langs || '?' }</Text>
    </View>

    { showReportUser &&
      <TouchableOpacity style={styles.reportView} onPress={onReportUserPressed}>
        <Icon name='report' color='#D63768'/>
        <Text style={styles.text}> 檢舉</Text>
      </TouchableOpacity>
    }


    { showBlockade &&
      <TouchableOpacity style={styles.blockadeView}>
        <Image style={styles.icon} source={require('./img/btn_meet_block.png')}/>
        <Text style={styles.text}>封鎖此人</Text>
      </TouchableOpacity>
    }

  </View>
)

export default Infos

/*
      <Image style={{marginRight: 5}} source={verityPhoto ? require('./img/ico_meet_picture_1.png') : require('./img/ico_aboutme_picture_0.png')}/>
*/
