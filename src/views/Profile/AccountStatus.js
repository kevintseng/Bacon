import React, { Component } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Card, Icon, Text } from 'react-native-elements';


const styles = {
  advancedMemberBarStyle: {
    height: 80,
    flex:1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
    paddingVertical: 2,
    marginBottom: 3,
    backgroundColor: '#4169e1',
  },   
  commonMemberBarStyle: {
    height: 80,
    flex:1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
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
  noneCircleStyle: {
    flex: 1,
    width: 60,
    height: 40,
    borderWidth: 0,
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

export default class AccountStatus extends Component {

  handleUpgrade = () => {
    this.props.upgrade();
  }

  handleAddCredit = () => {
    this.props.addCredit();
  }

  render() {
    this.props.vip = true;
    return (
      <View style={this.props.vip ? styles.advancedMemberBarStyle : styles.commonMemberBarStyle}>
        <View style={styles.containerStyle}>
          <View>
            <Text style={styles.statusName}>
              { this.props.vip ? '高級會員' : '一般會員' }
            </Text>
          </View>
          <View style={styles.buttonWrapper}>
          {
            this.props.vip ? 
            <TouchableOpacity style={styles.noneCircleStyle}>
              <Icon name='star' color='#EEEEEE'/>
              <Text style={styles.buttonTitle}></Text>
            </TouchableOpacity> :
            <TouchableOpacity
              style={styles.buttonStyle}
              onPress={this.handleUpgrade}>
              <Icon name='star' color='#EEEEEE'/>
              <Text style={styles.buttonTitle}>升級</Text>
            </TouchableOpacity>              
          }             
          </View>          
        </View>
        <View style={styles.containerStyle}>
          <View>
            <Text style={styles.statusName}>Q點</Text>
            <Text style={styles.statusName}>點數 3,237</Text>
          </View>
          <View style={styles.buttonWrapper}>
            <TouchableOpacity
              style={styles.buttonStyle}
              onPress={this.handleAddCredit}>
              <Icon name='redeem' color='#EEEEEE'/>
              <Text style={styles.buttonTitle}>儲值</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}
