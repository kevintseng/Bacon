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
    padding: 10    
  }
}
@inject('ControlStore') @observer
export default class CollectionModalContainer extends Component {

  constructor(props) {
    super(props)
    this.ControlStore = this.props.ControlStore
  }

  goToFate = async () => {
    await this.ControlStore.setGetCollectionMax()
    Actions.Fate({initialPage: 3})
  }

  render() {
    return(
        <Modal animationType={"fade"} transparent={true} visible={this.ControlStore.getCollectionMax} onRequestClose={ this.ControlStore.setGetCollectionMax } >
          <TouchableOpacity
            activeOpacity={1}
            onPress={ this.ControlStore.setGetCollectionMax }
            style={{
              backgroundColor: 'rgba(52, 52, 52, 0.4)',
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
                  <Text style={ styles.text }>你的收藏數量已達上限</Text>
                </View>
                <View>
                  <Text style={ styles.title } onPress={ this.goToFate }>管理收藏</Text>
                </View>
                <View>
                  <Text style={ styles.title } onPress={ this.ControlStore.setGetCollectionMax }>取消</Text>
                </View>
              </View>
            </TouchableOpacity>
          </TouchableOpacity>
        </Modal>
    )
  }
}