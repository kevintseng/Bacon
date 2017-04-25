//TODO: try this https://github.com/WheelerLee/react-native-dropdown-menu

import React, { Component } from "react";
import {
  View,
  Dimensions,
  Picker,
  ScrollView,
} from "react-native";
import { Actions } from "react-native-router-flux";
import { observer } from "mobx-react/native";
import { List, ListItem, Button } from "react-native-elements";
// import Moment from "moment";
import { Header } from "../components";

const { width, height } = Dimensions.get("window"); //eslint-disable-line

const list = [
  {
    name: "Amy Farha",
    avatar_url: "https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg",
    subtitle: "Vice President"
  },
  {
    name: "Chris Jackson",
    avatar_url: "https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg",
    subtitle: "Vice Chairman"
  }
];

const styles = {
  statusWrapper: {
    flex: 1,
    marginTop: -53,
    height: 60,
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-end",
  },
  busy: { width: 90, height: 25, backgroundColor: "orange" },
  low: { width: 90, height: 25, backgroundColor: "blue" },
  spaceOut: { width: 90, height: 25, backgroundColor: "#FDD835" },
  blank: { width: 90, height: 30, justifyContent: 'space-around', backgroundColor: "transparent" }
};

@observer
export default class Messages extends Component {
  constructor(props) {
    super(props);
    this.store = this.props.store;
    this.fs = this.props.fire;
    this.state = {
      size: {
        width,
        height
      },
      chatrooms: [],
      isLoading: false,
      pickerShow: false,
      status: this.store.user.chatStatus ? this.store.user.chatStatus : "blank"
    };
    this._isMounted = false;
  }

  componentWillMount() {
    console.debug("Rendering Messages");
    this._isMounted = false;
    Actions.refresh({ key: "drawer", open: false });
  }
  componentDidMount() {
    console.debug("Messages mounted");
    this._isMounted = true;
  }

  handleStatusChange = status => {
    this.setState({
      status,
      pickerShow: false
    });
  };


  getStatusLabel = () => {
    switch (this.state.status) {
      case 'spaceOut':
        return '放空中';
      case 'low':
        return '低潮中';
      case 'busy':
        return '忙碌中';
      default:
        return '我的狀態';
    }
  }

  render() {
    return (
      <View style={this.state.size}>
        <View>

        </View>
        <ScrollView>
          <Header
            headerText=""
            leftIconName="menu"
            leftColor="black"
            onLeft={() => Actions.refresh({ key: "drawer", open: true })}
          />
          <View style={styles.statusWrapper}>
            <Button
              buttonStyle={styles.blank}
              fontSize={14}
              color='black'
              iconRight
              icon={{ name: 'keyboard-arrow-down', color: 'black' }}
              title={this.getStatusLabel()}
              onPress={() => this.setState({pickerShow: true})}
            />
          </View>
          <List containerStyle={{ marginBottom: 20, marginTop: -8 }}>
            {list.map((l, i) => (
              <ListItem
                roundAvatar
                avatar={{ uri: l.avatar_url }}
                key={i}
                title={l.name}
                onPress={() => {
                  Actions.chat();
                }}
              />
            ))}
          </List>
        </ScrollView>
        {
          this.state.pickerShow && <Picker
          selectedValue={this.state.status}
          onValueChange={(status) => this.setState({status, pickerShow: false})} prompt='狀態選項'>
            <Picker.Item label='無' value='blank' />
            <Picker.Item label='放空中' value='spaceOut' />
            <Picker.Item label='忙碌中' value='busy' />
            <Picker.Item label='低潮中' value='low' />
          </Picker>
        }
      </View>
    );
  }
}
