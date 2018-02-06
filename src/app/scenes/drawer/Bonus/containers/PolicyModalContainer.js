import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { View, Modal, Text, TouchableOpacity, ScrollView, Dimensions } from 'react-native'

const { width, height } = Dimensions.get('window')

const styles = {
  TouchableOpacity: {
    backgroundColor: 'rgba(52, 52, 52, 0.4)',
    flex: 1,
    justifyContent: 'center'
  },
  title: {
    backgroundColor: 'transparent',
    letterSpacing: 3,
    fontFamily: 'NotoSans',
    fontSize: 15,
    fontWeight: '500',
    color: '#606060',
    textAlign: 'center',
    padding: 10
  },
  text: {
    padding: 10    
  },
  content: {
    backgroundColor: 'white',
    alignSelf: 'center',
    alignItems: 'center',
    aspectRatio: 1.5,
    width: width*0.8,
    height: height*0.7,
    position: 'absolute',
    borderRadius: 15
  },
  policy: {
    justifyContent: 'space-between'
  }
}

@inject('ControlStore') @observer
export default class PolicyModalContainer extends Component {

  constructor(props) {
    super(props)
    this.ControlStore = this.props.ControlStore
  }

  render() {
    return(
        <Modal animationType={"fade"} transparent={true} visible={this.ControlStore.bonusPolicyModal} onRequestClose={ this.ControlStore.setBonusPolicyModal } >
          <TouchableOpacity
            activeOpacity={1}
            onPress={ this.ControlStore.setBonusPolicyModal }
            style={styles.TouchableOpacity}
          >
            <TouchableOpacity
              activeOpacity={1}
              style={styles.content}
            >
              <View style={styles.policy}>
                <View>
                  <Text style={ styles.title }>BACON Q點條款</Text>
                </View>
                <ScrollView>
                  <Text style={ styles.text }>
                    1. 您購買或是領取的Q點並不屬於您所有。而是讓您取得一個有限權利透過Q點來使用
                    BACON的某些服務,例如增加留言送出次數或留言優先被看到等。
                  </Text>
                  <Text style={ styles.text }>
                    2. Q點不能換取任何數目的現金或現金等價物。
                  </Text>
                  <Text style={ styles.text }>
                    3. 已付費完成的的Q點不可退款。
                  </Text>
                  <Text style={ styles.text }>
                    4. BACON有權隨時改變Q點的購買方式與價格,以及改變Q點的使用方式,BACON同時保
                    留停止發行Q點的權力。
                  </Text>
                  <Text style={ styles.text }>
                    5. 如果您刪除BACON賬號,或者您的賬號因違反BACON使用條款而被BACON停用,您將
                    失去所有的Q點點數
                  </Text>
                </ScrollView>
                <View>
                  <Text style={ styles.title } onPress={ this.ControlStore.setBonusPolicyModal }>我知道了!</Text>
                </View>
              </View>
            </TouchableOpacity>
          </TouchableOpacity>
        </Modal>
    )
  }
}