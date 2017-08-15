import React, {Component} from 'react'
import { View, Text, TouchableOpacity, TextInput } from 'react-native'
import { observer, inject } from "mobx-react"
import { Actions } from "react-native-router-flux"
import { Button } from "react-native-elements"
import Modal from "react-native-modal"
import ChatStatus from "../../views/ChatStatus"

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
      statusModalShow: false,
      upgradeModalShow: false,
      selfInputModalShow: false,
      selfInputChatStatus: null,
    }
  }

  handleOnPress = pressed => {
    this.setState({statusModalShow: true})
  }
  showUpgradeModal = () => {
    this.setState({
      upgradeModalShow: true,
    })
  }

  selfInputModal = () => {
    this.setState({
      selfInputModalShow: true,
    })
  }

  goToMemberUpgrade = () => {
    Actions.Upgrade()
  }

  handleSelfInputSubmit = () => {
    // console.log("SelfInput submit pressed, myStatus: ", this.state.selfInputChatStatus)
    this.setState({
      selfInputModalShow: false,
      // myStatus: this.state.selfInputChatStatus,
    })
    this.SubjectStore.setChatStatus(this.state.selfInputChatStatus)
    this.firebase.database().ref(`users/${this.SubjectStore.uid}/chatStatus`).set(this.state.selfInputChatStatus)
  }

  handleSelfInputCancel = () => {
    this.setState({ selfInputModalShow: false, selfInputChatStatus: "" })
  }

  handleUpgrade = () => {
    this.setState({ upgradeModalShow: false })
    this.goToMemberUpgrade()
  }

  handleUpdateStatus = statusCode => {
    this.setState({ statusModalShow: false, myStatus: statusCode })
    this.SubjectStore.setChatStatus(statusCode)
    this.firebase.database().ref(`users/${this.uid}/chatStatus`).set(statusCode)
  }

  handleSelfInputPressed = () => {
    this.setState({ statusModalShow: false })
    if (!this.SubjectStore.vip) {
      setTimeout(() => {
        this.showUpgradeModal()
      }, 500)
      return
    }
    setTimeout(() => {
      this.selfInputModal()
    }, 500)
  }

  textInputOnChange = text => {
    this.setState({ selfInputChatStatus: text })
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
    return (
      <View>
        <ChatStatus onPress={this.handleOnPress} code={this.SubjectStore.chatStatus || 0} />
        <Modal
          style={{ alignItems: "center" }}
          isVisible={this.state.statusModalShow}
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
        <Modal
          style={{ alignItems: "center" }}
          isVisible={this.state.upgradeModalShow}
        >
          <View
            style={{
              backgroundColor: "white",
              padding: 20,
              width: 300,
              alignItems: "center",
              borderRadius: 10,
              borderColor: "rgba(0, 0, 0, 0.1)",
            }}
          >
            <Text
              style={{ marginVertical: 45, fontWeight: "600", fontSize: 16 }}
            >
              高級會員即可開啟此功能
            </Text>
            <View
              style={{
                flexDirection: "row",
                width: 300,
                justifyContent: "space-between",
                paddingHorizontal: 50,
              }}
            >
              <Button
                title="取消"
                onPress={() => this.setState({ upgradeModalShow: false })}
                color="#0076FF"
                buttonStyle={{ backgroundColor: "transparent" }}
              />
              <Button
                title="升級"
                onPress={() => this.handleUpgrade()}
                color="#0076FF"
                buttonStyle={{ backgroundColor: "transparent" }}
              />
            </View>
          </View>
        </Modal>
        <Modal
          style={{ alignItems: "center" }}
          isVisible={this.state.selfInputModalShow}
        >
          <View
            style={{
              backgroundColor: "white",
              padding: 20,
              width: 300,
              alignItems: "center",
              borderRadius: 10,
              borderColor: "rgba(0, 0, 0, 0.1)",
            }}
          >
            <Text style={{ marginTop: 25, fontWeight: "600", fontSize: 16 }}>
              請輸入自定義狀態
            </Text>
            <TextInput
              maxLength={3}
              onChangeText={text => this.textInputOnChange(text)}
              defaultValue={this.state.selfInputChatStatus}
              style={{
                marginVertical: 25,
                height: 40,
                width: 200,
                borderColor: "#B3B3B3",
                borderWidth: 1,
                borderRadius: 5,
              }}
            />
            <View
              style={{
                flexDirection: "row",
                width: 300,
                justifyContent: "space-between",
                paddingHorizontal: 50,
              }}
            >
              <Button
                title="取消"
                onPress={() => this.handleSelfInputCancel()}
                color="#0076FF"
                buttonStyle={{ backgroundColor: "transparent" }}
              />
              <Button
                title="送出"
                onPress={() => this.handleSelfInputSubmit()}
                color="#0076FF"
                buttonStyle={{ backgroundColor: "transparent" }}
              />
            </View>
          </View>
        </Modal>
      </View>
    )
  }
}
