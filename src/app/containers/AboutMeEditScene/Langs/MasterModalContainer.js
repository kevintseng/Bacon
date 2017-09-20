import React, { Component } from 'react'
import { View, Modal, Text, TouchableOpacity, Dimensions } from 'react-native'
import { CheckBox } from 'react-native-elements'
import { inject, observer } from 'mobx-react'

const { width, height } = Dimensions.get('window')

@inject('ControlStore') @observer
export default class MasterModalContainer extends Component {

  constructor(props) {
    super(props)
    this.ControlStore = this.props.ControlStore
    this.state = {
      a: true,
      b: false,
      c: false
    }
  }

  onPressA = () => {
    this.setState({
      a: true,
      b: false,
      c: false
    })
  }

  onPressB = () => {
    this.setState({
      a: false,
      b: true,
      c: false
    })
  }

  onPressC = () => {
    this.setState({
      a: false,
      b: false,
      c: true
    })
  }

  onPrsss = () => {
    this.ControlStore.setlangAdvanced()
  }

  render() {
    return(
      <Modal animationType={"fade"} transparent={true} visible={this.ControlStore.langAdvanced} onRequestClose={ this.ControlStore.setlangAdvanced } >
          <TouchableOpacity
            activeOpacity={1}
            //onPress={ this.ControlStore.setlangAdvanced }
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
                width: width*0.5,
                height: height*0.3,
                position: 'absolute',
                borderRadius: 15
              }}
            >
            <CheckBox
              fontFamily='NotoSans'
              containerStyle={{backgroundColor: 'transparent',borderWidth: 0}}
              center
              title='精通'
              checked={this.state.a}
              onPress={ this.onPressA }
            />
            <CheckBox
              fontFamily='NotoSans'
              containerStyle={{backgroundColor: 'transparent',borderWidth: 0}}
              center
              title='中等'
              checked={this.state.b}
              onPress={ this.onPressB }
            />
            <CheckBox
              fontFamily='NotoSans'
              containerStyle={{backgroundColor: 'transparent',borderWidth: 0}}
              center
              title='一般'
              checked={this.state.c}
              onPress={ this.onPressC }
            />
            <TouchableOpacity onPress={ this.onPrsss }>
              <Text style={{color: '#d63768'}}>確認</Text>
            </TouchableOpacity>
          </TouchableOpacity>
        </TouchableOpacity>

      </Modal>
    )
  }
}