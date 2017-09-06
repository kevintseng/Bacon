import React, {Component} from 'react'
import { View, Text, TextInput, ScrollView } from 'react-native'
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
    }
  }

  handleSelfInputCancel = () => {
    this.setState({
      selfInputChatStatus: "",
    })
    this.props.onCancel()
  }

  handleSelfInputSubmit = () => {
    this.props.onSubmit(this.state.selfInputChatStatus)
  }

  textInputOnChange = text => {
    this.setState({
      selfInputChatStatus: text,
    })
  }

  render() {
    return (
      <View
        style={modalContentStyle}
      >
        <Text style={{ marginTop: 25, fontWeight: "600", fontSize: 16 }}>
          請輸入自訂狀態
        </Text>
        // 這裡用 ScrollView 是因為這樣可以讓user在鍵盤出現的時候只要點擊任何一個非鍵盤區域就會收起鍵盤
        <ScrollView scrollEnabled={false}>
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
        </ScrollView>
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
    )
  }
}
