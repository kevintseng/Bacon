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
  }

  componentWillMount() {
    this.ControlStore.initMaster()
  }

  onPressA = () => {
    this.ControlStore.setMaster()
    this.onPrsss()
  }

  onPressB = () => {
    this.ControlStore.setCommon()
    this.onPrsss()
  }

  onPressC = () => {
    this.ControlStore.setGeneral()
    this.onPrsss()
  }

  onPrsss = () => {
    this.ControlStore.setlangAdvanced()
    if (this.ControlStore.general == true) {
      this.SubjectEditStore.oneLevelLanguages(this.ControlStore.lang)
    } else if (this.ControlStore.common == true) {
      this.SubjectEditStore.twoLevelLanguages(this.ControlStore.lang)
    } else if (this.ControlStore.master == true) {
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
              checked={this.ControlStore.master}
              onPress={ this.onPressA }
            />
            <CheckBox
              fontFamily='NotoSans'
              containerStyle={{backgroundColor: 'transparent',borderWidth: 0}}
              textStyle={styles.option}
              center
              title='普通'
              checked={this.ControlStore.common}
              onPress={ this.onPressB }
            />
            <CheckBox
              fontFamily='NotoSans'
              containerStyle={{backgroundColor: 'transparent',borderWidth: 0}}
              textStyle={styles.option}
              center
              title='一般'
              checked={this.ControlStore.general}
              onPress={ this.onPressC }
            />
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