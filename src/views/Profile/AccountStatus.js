import React, { Component } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Card, Icon, Text } from 'react-native-elements';
import Reactotron from 'reactotron-react-native';

const styles = {
  barStyle: {
    height: 60,
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
    marginHorizontal: 2,
  },
  statusName: {
    fontSize: 14,
    color: 'white',
    marginRight: 3,
  },
  buttonWrapper: {
    width: 50,
    margin: 2,
  },
  buttonStyle: {
    padding: 2,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderRadius: 30,
    borderColor: 'white',
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
          <Text style={styles.statusName}>一般會員</Text>
          <View style={styles.buttonWrapper}>
            <TouchableOpacity
              style={styles.buttonStyle}
              onPress={this.handleUpgrade}>
              <Icon name='star' color='#EEEEEE'/>
              <Text style={styles.buttonTitle}>升級</Text>
            </TouchableOpacity>
          </View>
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
