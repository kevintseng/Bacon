import React, { Component } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Card, Icon, Text } from 'react-native-elements';


const styles = {
  barStyle: {
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

    return (
      <View style={styles.barStyle}>
        <View style={styles.containerStyle}>
          <Text style={styles.statusName}>
            { this.props.vip ? this.props.vip.toUpperCase() : '一般會員' }
          </Text>
          {
            !this.props.vip && <View style={styles.buttonWrapper}>
              <TouchableOpacity
                style={styles.buttonStyle}
                onPress={this.handleUpgrade}>
                <Icon name='star' color='#EEEEEE'/>
                <Text style={styles.buttonTitle}>升級</Text>
              </TouchableOpacity>
            </View>
          }
        </View>
        <View style={styles.containerStyle}>
          <Text style={styles.statusName}>點數 3,237</Text>
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
