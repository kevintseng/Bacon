import React, { Component } from 'react'
import { View, Modal, Text, TouchableOpacity, Dimensions } from 'react-native'
import { CheckBox } from 'react-native-elements'
import { inject, observer } from 'mobx-react'

const { width, height } = Dimensions.get('window')

const styles = {
  title: {
    letterSpacing: 3,
    fontFamily: 'NotoSans',
    color: '#606060',
    backgroundColor: 'transparent',
    fontWeight: '500',
    fontSize: 16        
  },
  option: {
    letterSpacing: 3,
    fontFamily: 'NotoSans',
    color: '#606060',
    backgroundColor: 'transparent',
    fontWeight: '400'    
  }
}

@inject('ControlStore','SubjectEditStore') @observer
export default class MasterModalContainer extends Component {

  constructor(props) {
    super(props)
    this.ControlStore = this.props.ControlStore
    this.SubjectEditStore = this.props.SubjectEditStore
    this.state = {
      a: true,
      b: false,
      c: false,
      d: false
    }
  }

  onPressA = () => {
    this.setState({
      a: true,
      b: false,
      c: false,
      d: false
    })
  }

  onPressB = () => {
    this.setState({
      a: false,
      b: true,
      c: false,
      d: false
    })
  }

  onPressC = () => {
    this.setState({
      a: false,
      b: false,
      c: true,
      d: false
    })
  }

  onPressD = () => {
    this.setState({
      a: false,
      b: false,
      c: false,
      d: true
    })
  }

  onPrsss = () => {
    this.ControlStore.setlangAdvanced()
    if (this.state.c == true) {
      this.SubjectEditStore.oneLevelLanguages(this.ControlStore.lang)
    } else if (this.state.b == true) {
      this.SubjectEditStore.twoLevelLanguages(this.ControlStore.lang)
    } else if (this.state.a == true) {
      this.SubjectEditStore.threeLevelLanguages(this.ControlStore.lang)
    }
  }

  render() {
    return(
      <Modal animationType={"fade"} transparent={true} visible={this.ControlStore.langAdvanced} onRequestClose={ this.ControlStore.setlangAdvanced } >
          <TouchableOpacity
            activeOpacity={1}
            onPress={ this.ControlStore.setlangAdvanced }
            style={{
              backgroundColor: 'rgba(52, 52, 52, 0.8)',
              flex: 1,
              justifyContent: 'center'
            }}
          >
            <TouchableOpacity
              activeOpacity={1}
              style={{
                justifyContent: 'center',
                backgroundColor: 'white',
                alignSelf: 'center',
                alignItems: 'center',
                aspectRatio: 1.5,
                width: width*0.6,
                height: height*0.45,
                position: 'absolute',
                borderRadius: 15
              }}
            >
            <Text style={styles.title}>{this.ControlStore.lang}</Text>
            <CheckBox
              fontFamily='NotoSans'
              containerStyle={{backgroundColor: 'transparent',borderWidth: 0}}
              textStyle={styles.option}
              center
              title='精通'
              checked={this.state.a}
              onPress={ this.onPressA }
            />
            <CheckBox
              fontFamily='NotoSans'
              containerStyle={{backgroundColor: 'transparent',borderWidth: 0}}
              textStyle={styles.option}
              center
              title='普通'
              checked={this.state.b}
              onPress={ this.onPressB }
            />
            <CheckBox
              fontFamily='NotoSans'
              containerStyle={{backgroundColor: 'transparent',borderWidth: 0}}
              textStyle={styles.option}
              center
              title='一般'
              checked={this.state.c}
              onPress={ this.onPressC }
            />
            <TouchableOpacity onPress={ this.onPrsss }>
              <Text style={[styles.title,{color: '#d63768',fontWeight: '400'}]}>確認</Text>
            </TouchableOpacity>
          </TouchableOpacity>
        </TouchableOpacity>

      </Modal>
    )
  }
}

/*

            <CheckBox
              fontFamily='NotoSans'
              containerStyle={{backgroundColor: 'transparent',borderWidth: 0}}
              textStyle={styles.option}
              center
              title='不會'
              checked={this.state.d}
              onPress={ this.onPressD }
            />
*/