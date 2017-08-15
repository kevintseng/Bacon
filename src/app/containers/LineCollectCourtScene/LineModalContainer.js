import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { View, Modal, Text, TouchableOpacity, ScrollView, Dimensions } from 'react-native'
import { Actions } from 'react-native-router-flux'

const { width, height } = Dimensions.get('window')

const styles = {
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
    padding: 10,
    textAlign: 'center',
    backgroundColor: 'transparent',
    letterSpacing: 3,
    fontFamily: 'NotoSans', 
    color: '#606060',   
  }
}
@inject('ControlStore') @observer
export default class LineModalContainer extends Component {

  constructor(props) {
    super(props)
    this.ControlStore = this.props.ControlStore
  }

  goToLine = () => { 
    Actions.Line({uid: this.Store.uid, name: this.Store.nickname})
  }

  goToBonusFilter = async () => {
    await this.ControlStore.setLineModal()
    Actions.UseBonus()
  }

  render() {
    return(
        <Modal animationType={"fade"} transparent={true} visible={this.ControlStore.lineModal} onRequestClose={ this.ControlStore.setLineModal } >
          <TouchableOpacity
            activeOpacity={1}
            onPress={ this.ControlStore.setLineModal }
            style={{
              backgroundColor: 'rgba(52, 52, 52, 0.8)',
              flex: 1,
              justifyContent: 'center'
            }}
          >
            <TouchableOpacity
              activeOpacity={1}
              style={{
                backgroundColor: 'white',
                alignSelf: 'center',
                alignItems: 'center',
                aspectRatio: 1.5,
                width: width*0.8,
                height: height*0.2,
                position: 'absolute',
                borderRadius: 15
              }}
            >
              <View style={{justifyContent: 'space-between'}}>
                <View>
                  <Text style={ styles.text }>您今天的來訪留言次數已經用完或是使用Q點來增加留言次數</Text>
                </View>
                <View>
                  <Text style={ styles.title } onPress={ this.goToBonusFilter }>使用Q點</Text>
                </View>
                <View>
                  <Text style={ styles.title } onPress={ this.ControlStore.setLineModal }>取消</Text>
                </View>
              </View>
            </TouchableOpacity>
          </TouchableOpacity>
        </Modal>
    )
  }
}