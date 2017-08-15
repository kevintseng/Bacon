import React, {Component} from 'react'
import { View, Text, TextInput } from 'react-native'
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

export default class CustomStatusInputModalContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selfInputChatStatus: null,
      showModal: this.props.showModal,
    }
  }

  handleSelfInputCancel = () => {
    this.setState({
      showModal: false,
      selfInputChatStatus: "",
    })
  }

  handleSelfInputSubmit = () => {
    this.setState({showModal: false})
    this.props.onSubmit(this.state.selfInputChatStatus)
  }

  textInputOnChange = text => {
    this.setState({
      selfInputChatStatus: text,
    })
  }

  render() {
    return (
      <View>
        <Modal
          style={{ alignItems: "center" }}
          isVisible={this.state.showModal}
        >
          <View
            style={modalContentStyle}
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