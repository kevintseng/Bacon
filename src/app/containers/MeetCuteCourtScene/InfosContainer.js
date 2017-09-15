import React, { Component } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { inject, observer } from 'mobx-react'
import { Actions } from 'react-native-router-flux'
import { Button } from 'react-native-elements'
import Modal from 'react-native-modal'
import Infos from '../../views/Infos/Infos'

const styles = {
  modalWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 20,
    paddingVertical: 30,
    alignSelf: 'center',
    width: 260,
  },
  modalTitle: {
    backgroundColor: 'transparent',
    letterSpacing: 3,
    fontFamily: 'NotoSans',
    textAlign: 'center',
    fontWeight: '500',
    color: '#606060',
    fontSize: 18,
  },
  TouchStyle: {
    marginTop: 20,
    borderRadius: 20,
    borderColor: '#606060',
    borderWidth: 1,
    paddingVertical: 5,
  },
  buttonLabel: {
    fontFamily: 'NotoSans',
    color: '#606060',
  },
  routesText: {
    backgroundColor: 'transparent',
    letterSpacing: 3,
    fontFamily: 'NotoSans',
    textAlign: 'center',
    color: '#606060',
    fontWeight: '500',
    fontSize: 18,
  },
}

@inject('MeetCuteStore', 'firebase', 'SubjectStore') @observer
export default class InfosContainer extends Component {

  constructor(props) {
    super(props)
    this.firebase = this.props.firebase
    this.MeetCuteStore = this.props.MeetCuteStore
    this.Store = this.props.SubjectStore
    this.state = {
      showModal: false,
      reportSubmitted: false,
    }
  }

  reportPressed = () => {
    this.setState({ showModal: true})
  }

  handleReportUser = (code) => {
    let reason
    switch(code) {
      case 0:
        reason = '其他'
        break
      case 1:
        reason = '不雅圖像'
        break
      case 2:
        reason = '不適當文字內容'
        break
      case 3:
        reason = '版權問題/盜圖/盜文'
        break
      default:
    }
    const timestamp = Math.floor(Date.now() / 1000);
    console.log('reported: ', reason)
    this.firebase.database().ref(`reportUser/${this.MeetCuteStore.uid}/${timestamp}`).set({reporter: this.Store.uid, reason})
    this.setState({ reportSubmitted: true})
  }

  handleCancel = () => {
    this.setState({ showModal: false})
  }

  render() {
    return(
      <View>
        <Infos
          //showBlockade
          showReportUser
          showDistance
          verityEmail={ this.MeetCuteStore.emailVerified }
          verityPhoto={ this.MeetCuteStore.photoVerified }
          displayName={ this.MeetCuteStore.nickname }
          bio={ this.MeetCuteStore.bio }
          age={ this.MeetCuteStore.age }
          langs={ this.MeetCuteStore.languagesToString }
          distance={ this.MeetCuteStore.distance }
          onReportUserPressed= { this.reportPressed }
        />
        <Modal
          isVisible={this.state.showModal}
          backdropColor='black'
          backdropOpacity={0.7}
        >
          <View
            style={styles.modalWrapper}
          >
            {!this.state.reportSubmitted &&
              <View>
                <Text style={styles.modalTitle}>請選擇原因:</Text>

                <View>
                  <Button backgroundColor={'white'} textStyle={styles.buttonLabel}  title='不雅圖像' onPress={() => this.handleReportUser(1)} />
                  <Button backgroundColor={'white'} textStyle={styles.buttonLabel}  title='不適當文字內容' onPress={() => this.handleReportUser(2)} />
                  <Button backgroundColor={'white'} textStyle={styles.buttonLabel}  title='版權問題/盜圖/盜文' onPress={() => this.handleReportUser(3)} />
                  <Button backgroundColor={'white'} textStyle={styles.buttonLabel} title='其他原因' onPress={() => this.handleReportUser(0)} />
                </View>

                <TouchableOpacity style={styles.TouchStyle} onPress={this.handleCancel}>
                  <Text style={styles.routesText}>取消</Text>
                </TouchableOpacity>
              </View>
            }
            {this.state.reportSubmitted &&
              <View>
                <Text style={styles.modalTitle}>
                  成功送出
                </Text>
                <TouchableOpacity style={styles.TouchStyle} onPress={this.handleCancel}>
                  <Text style={styles.routesText}>好的</Text>
                </TouchableOpacity>
              </View>
            }
          </View>
        </Modal>
      </View>
    )
  }
}
