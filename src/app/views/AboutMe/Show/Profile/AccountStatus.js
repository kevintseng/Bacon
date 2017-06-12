import React from 'react'
import { View, TouchableOpacity } from 'react-native'
import { Icon, Text } from 'react-native-elements'
import { observer, inject } from 'mobx-react/native'


const styles = {
  barStyle:{
    height: 80,
    //flex:1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    //paddingHorizontal: 10,
    paddingVertical: 2,
    marginBottom: 3,
    backgroundColor: '#FF6F00',    
  },
  containerStyle: {
    flex: 1,
    flexDirection: 'row',
    justifyContent : 'center',
    alignItems: 'center',
    marginHorizontal: 25,
  },
  statusName: {
    fontSize: 14,
    color: 'white',
    marginRight: 3,
  },
  buttonWrapper: {
    flex: 1,
    alignItems: 'center',
    height: 60,
    width: 40,
    marginLeft: 5
  },
  buttonStyle: {
    flex: 1,
    width: 60,
    height: 40,
    borderWidth: 2,
    borderRadius: 40,
    borderColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonTitle: {
    fontSize: 10,
    alignSelf: 'center',
    color: 'white'
  }

};

const AccountStatus = inject("SubjectStore")(observer(({ SubjectStore }) => {

  const content = () => {
    return SubjectStore.vip ? { title: '高級會員', update: '', iconSize: 52, additionBarStyle: { backgroundColor: '#4169e1' }, additionButtonStyle: { borderWidth: 0 } }:{ title: '一般會員', update: '升級', iconSize: 26}
  } 

  return (
    <View style={ [styles.barStyle, content().additionBarStyle] }>
      <View style={ styles.containerStyle }>
        <View>
          <Text style={ styles.statusName }>
            { content().title }
          </Text>
        </View>
        <View style={ styles.buttonWrapper }>
          <TouchableOpacity
            style={ [styles.buttonStyle, content().additionButtonStyle] }
            onPress={ SubjectStore.handleUpgrade.bind(SubjectStore) }>
            <Icon name='star' color='#EEEEEE' size={ content().iconSize } />
            <Text style={ styles.buttonTitle }>{ content().update }</Text>
          </TouchableOpacity>                       
          </View>          
        </View>
        <View style={ styles.containerStyle }>
          <View>
            <Text style={ styles.statusName }>Q點</Text>
            <Text style={ styles.statusName }>點數 3,237</Text>
          </View>
          <View style={ styles.buttonWrapper }>
            <TouchableOpacity
              style={ styles.buttonStyle }
              onPress={ SubjectStore.handleAddCredit.bind(SubjectStore) }>
              <Icon name='redeem' color='#EEEEEE'/>
              <Text style={ styles.buttonTitle }>儲值</Text>
           </TouchableOpacity>
        </View>
      </View>
    </View>
    )
}))
 
export default AccountStatus