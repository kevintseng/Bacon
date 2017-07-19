import React, { Component } from 'react';
import Drawer from 'react-native-drawer';
import { Actions, DefaultRenderer } from 'react-native-router-flux';
import { inject, observer } from 'mobx-react/native'
import { Dimensions } from 'react-native'
import Sider from '../../components/Sider'

const { width } = Dimensions.get('window')

const drawerStyles = {
  drawer: { 
    borderRightWidth: 1.8, 
    borderRightColor: '#dcdcdc', 
    width
  }
}

@inject("firebase","SignUpInStore") @observer
export default class DrawerScene extends Component {

  constructor(props) {
    super(props)
    this.firebase = this.props.firebase
    this.SignUpInStore = this.props.SignUpInStore
    this.state = {
      uploadState: null
    }
  }
  componentWillMount() {
    if (this.SignUpInStore.UpInStatus === '註冊') {
      this.setState({
        uploadState: '上傳中'
      })
      this.uploadSignUpData()
    }
  }

  componentDidMount() {
  }

  uploadSignUpData() {
    const SignUpData = {
      uid: this.SignUpInStore.uid,
      displayName: this.SignUpInStore.displayName,
      vip: false
    }
    this.firebase.database().ref("users/" + this.SignUpInStore.uid).set(SignUpData)
      .then(() => {
        this.setState({
          uploadState: '上傳完成'
        })
      }).catch((error) => {
        this.setState({
          uploadState: '上傳失敗'
        })
        console.log(error)
      })
  }

  render() {

    const state = this.props.navigationState
    const children = state.children

    return (
      <Drawer
        ref='navigation'
        type='overlay'
        styles={ drawerStyles }
        onOpen={() => Actions.refresh({ key: state.key, open: true })}
        onClose={() => Actions.refresh({ key: state.key, open: false })}
        open={ state.open }
        content={<Sider displayTitle={ this.state.uploadState }/>}
        tapToClose
        openDrawerOffset={0.2}
        panCloseMask={0.2}
        negotiatePan
        tweenHandler={(ratio) => ({
         main: { opacity: Math.max(0.54, 1 - ratio) }
        })}
      >
        <DefaultRenderer navigationState={children[0]} onNavigate={this.props.onNavigate} />
      </Drawer>
    );
  }
}
