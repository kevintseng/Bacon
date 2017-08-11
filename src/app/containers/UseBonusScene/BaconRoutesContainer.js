import React, { Component } from 'react'
import { View, Image, Text, Dimensions, TouchableOpacity } from 'react-native'
import { Actions } from 'react-native-router-flux'
import Modal from 'react-native-modal'

import BaconRoutesNoWave from '../../views/BaconRoutesNoWave/BaconRoutesNoWave'

const styles = {
  view: {
    alignItems: 'center',
    marginTop: 40,
  },
  routesImage: {
    justifyContent: 'center',
  },
  balanceText: {
    backgroundColor: 'transparent',
    letterSpacing: 3,
    fontFamily: 'NotoSans',
    textAlign: 'center',
    fontWeight: '500',
    color: '#606060',
    fontSize: 20,
  },
  routesText: {
    backgroundColor: 'transparent',
    letterSpacing: 3,
    fontFamily: 'NotoSans',
    textAlign: 'center',
    fontWeight: '500',
    color: 'white',
    fontSize: 20,
  },
}

export default class BaconRoutesContainer extends Component {

  constructor(props) {
    super(props)
    this.state = {
      showBalanceModal: false,
      showInsufficientModal: false,
    }
  }

  handleUseConfirmed = () => {
    console.log("handleUseConfirmed")
    // this.setState({showBalanceModal: false})
    this.props.onUseConfirm()
  }

  handleMakeDespoit = () => {
    this.setState({showInsufficientModal: false})
    this.goToQUpgrade()
  }

  goToQUpgrade = () => {
    Actions.bonus()
  }

  handleRoutesOnPress = () => {
    const afterBalance = this.props.balance - this.props.cost
    if (afterBalance >= 0) {
      this.setState({ showBalanceModal: true })
    } else {
      this.setState({ showInsufficientModal: true })
    }
  }

  render() {
    return (
      <View>
        <BaconRoutesNoWave
          routesText="繼續"
          routesOnPress={this.handleRoutesOnPress}
        />
        <Modal
          isVisible={this.state.showBalanceModal}
          backdropColor="black"
          backdropOpacity={0.7}
        >
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              padding: 10,
              backgroundColor: "white",
              borderRadius: 26,
              paddingVertical: 40,
            }}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
              <Text style={styles.balanceText}>目前 </Text>
              <Text style={styles.balanceText}>{this.props.balance || 0}</Text>
              <Text style={styles.balanceText}> 點</Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
              <Text style={styles.balanceText}>使用 </Text>
              <Text style={styles.balanceText}>{this.props.cost || 0}</Text>
              <Text style={styles.balanceText}> 點</Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginVertical: 10 }}>
              <Text style={styles.balanceText}>----------------------</Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
              <Text style={styles.balanceText}>剩餘 </Text>
              <Text style={styles.balanceText}>{this.props.balance - this.props.cost || 0}</Text>
              <Text style={styles.balanceText}> 點</Text>
            </View>
            <View style={styles.view}>
              <TouchableOpacity onPress={() => this.handleUseConfirmed()}>
                <Image style={styles.routesImage} source={require('./img/btn_qy_confirm.png')}>
                  <Text style={styles.routesText}>確定</Text>
                </Image>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
        <Modal
          isVisible={this.state.showInsufficientModal}
          backdropColor="black"
          backdropOpacity={0.7}
        >
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              padding: 10,
              backgroundColor: "white",
              borderRadius: 26,
              paddingVertical: 40,
            }}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
              <Text style={styles.balanceText}>抱歉，你目前的Q點不足喔！</Text>
            </View>

            <View style={styles.view}>
              <TouchableOpacity onPress={() => this.handleMakeDespoit()}>
                <Image style={styles.routesImage} source={require('./img/btn_qy_confirm.png')}>
                  <Text style={styles.routesText}>Q點儲值</Text>
                </Image>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    )
  }
}
