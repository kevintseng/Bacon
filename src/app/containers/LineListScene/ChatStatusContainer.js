import React, {Component} from 'react'
import { View, Text, TouchableOpacity, TextInput } from 'react-native'
import { observer, inject } from "mobx-react"
import { Actions } from "react-native-router-flux"
import { Button } from "react-native-elements"
import Modal from "react-native-modal"
import ChatStatus from "../../views/ChatStatus"
import CustomStatusInputModalContainer from "./CustomStatusInputModalContainer"
import UpgradeModalContainer from "./UpgradeModalContainer"

const styles = {
  touch: {
    padding: 10, // 加大點擊範圍
  },
  chatStatusStyles: {
    containerStyle: {
      width: 260,
      alignItems: "center",
    },
    buttonStyle: {
      backgroundColor: "white",
    },
    textStyle: {
      backgroundColor: "white",
    },
    saveButtonStyle: {
      marginTop: 10,
      backgroundColor: "white",
      borderColor: "black",
      borderWidth: 1,
      borderRadius: 5,
      padding: 5,
    },
    upgradeButtonStyle: {
      marginTop: 15,
      backgroundColor: "white",
      borderColor: "#B3B3B3",
      borderWidth: 1,
      borderRadius: 5,
      padding: 5,
    },
    inputContainerStyle: {
      borderBottomWidth: 1,
      paddingLeft: 10,
      width: 70,
      borderBottomColor: "#BDBDBD",
      alignItems: "center",
    },
  },
}

@inject("firebase", "SubjectStore")
@observer
export default class ChatStatusContainer extends Component {
  constructor(props) {
    super(props)
    this.SubjectStore = this.props.SubjectStore
    this.firebase = this.props.firebase

    this.state = {
      showStatusMenuModal: false,
      showUpgradeModal: false,
      showCustomInputModal: false,
    }
  }

  handleOnPress = pressed => {
    this.setState({showStatusMenuModal: true})
  }

  handleUpdateStatus = statusCode => {
    this.setState({ showCustomInputModal: false, showStatusMenuModal: false })
    this.SubjectStore.setChatStatus(statusCode)
    this.firebase.database().ref(`users/${this.uid}/chatStatus`).set(statusCode)
  }

  handleSelfInputPressed = () => {
    // console.log(this.SubjectStore.vip)
    this.setState({ showStatusMenuModal: false })
    if (!this.SubjectStore.vip) {
      setTimeout(() => {
        // console.log('showUpgradeModal')
        this.setState({
          showUpgradeModal: true,
        })
      }, 500)
      return 0
    }
    setTimeout(() => {
      this.setState({
        showCustomInputModal: true,
      })
    }, 500)
  }

  render() {
    const modalContent = {
      backgroundColor: "white",
      padding: 20,
      width: 300,
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 10,
      borderColor: "rgba(0, 0, 0, 0.1)",
      marginBottom: 100,
    }

    console.log("showCustomInputModal ", this.state.showCustomInputModal)
    return (
      <View>
        <ChatStatus onPress={this.handleOnPress} code={this.SubjectStore.chatStatus || 0} />
        <Modal
          style={{ alignItems: "center" }}
          isVisible={this.state.showStatusMenuModal}
        >
          <View style={modalContent}>
            <Button
              title="放空中"
              onPress={() => this.handleUpdateStatus(1)}
              color="black"
              textStyle={styles.chatStatusStyles.textStyle}
              buttonStyle={styles.chatStatusStyles.buttonStyle}
              style={styles.chatStatusStyles.containerStyle}
            />
            <Button
              title="忙碌中"
              onPress={() => this.handleUpdateStatus(2)}
              color="black"
              textStyle={styles.chatStatusStyles.textStyle}
              buttonStyle={styles.chatStatusStyles.buttonStyle}
              style={styles.chatStatusStyles.containerStyle}
            />
            <Button
              title="低潮中"
              onPress={() => this.handleUpdateStatus(3)}
              color="black"
              textStyle={styles.chatStatusStyles.textStyle}
              buttonStyle={styles.chatStatusStyles.buttonStyle}
              style={styles.chatStatusStyles.containerStyle}
            />
            <Button
              title="自定義"
              onPress={() => this.handleSelfInputPressed()}
              color="black"
              textStyle={styles.chatStatusStyles.textStyle}
              buttonStyle={styles.chatStatusStyles.buttonStyle}
              style={styles.chatStatusStyles.containerStyle}
              iconRight
              icon={{ name: "edit", color: "#D63768" }}
            />
            <Button
              title="取消狀態"
              onPress={() => this.handleUpdateStatus(0)}
              color="black"
              textStyle={styles.chatStatusStyles.textStyle}
              buttonStyle={styles.chatStatusStyles.buttonStyle}
              style={styles.chatStatusStyles.containerStyle}
            />
          </View>
        </Modal>
        {this.state.showUpgradeModal &&
          <UpgradeModalContainer
            showModal
          />
        }
        {this.state.showCustomInputModal &&
          <CustomStatusInputModalContainer
            onSubmit={this.handleUpdateStatus}
            showModal
          />
        }
      </View>
    )
  }
}
