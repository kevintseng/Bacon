import React, {Component} from 'react'
import { View, Text, TextInput } from 'react-native'
import { Actions } from "react-native-router-flux"
import { Button } from "react-native-elements"
import Modal from "react-native-modal"

const modalContentStyle = {
  backgroundColor: "white",
  padding: 20,
  width: 300,
  justifyContent: "center",
  alignItems: "center",
  borderRadius: 10,
  borderColor: "rgba(0, 0, 0, 0.1)",
  marginBottom: 100,
}

export default class UpgradeModalContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showModal: this.props.showModal,
    }
  }

  handleCancel = () => {
    this.setState({showModal: false})
  }

  handleUpgrade = () => {
    this.setState({ showModal: false })
    Actions.Upgrade()
  }

  render() {
    return (
      <Modal
        style={{ alignItems: "center" }}
        isVisible={this.state.showModal}
      >
        <View
          style={modalContentStyle}
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
              onPress={this.handleCancel}
              color="#0076FF"
              buttonStyle={{ backgroundColor: "transparent" }}
            />
            <Button
              title="升級"
              onPress={this.handleUpgrade}
              color="#0076FF"
              buttonStyle={{ backgroundColor: "transparent" }}
            />
          </View>
        </View>
      </Modal>
    )
  }
}
