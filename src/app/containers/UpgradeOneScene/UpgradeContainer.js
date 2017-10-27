import React, { Component } from "react";
import {
  ScrollView,
  View,
  TouchableOpacity,
  Text,
  Button,
  Platform,
  NativeModules
} from "react-native";
import { inject, observer } from "mobx-react";
import RNGooglePlaces from "react-native-google-places";

import Upgrade from "../../views/Bill/Upgrade";
import PolicyModalContainer from "../SettingAboutScene/PolicyModalContainer";
import RuleModalContainer from "../SettingAboutScene/RuleModalContainer";

const { InAppUtils } = NativeModules;

const styles = {
  view: {
    alignItems: "center",
    height: 260,
    marginTop: 10
  },
  link: {
    fontFamily: "NotoSans",
    flexWrap: "wrap",
    color: "#D63768",
    fontSize: 14
  },
  text: {
    fontFamily: "NotoSans",
    flexWrap: "wrap",
    color: "#606060",
    fontSize: 11,
    textAlign: "center"
  },
  // warning : {
  //   alignSelf: 'center',
  //   position: 'absolute',
  //   flexDirection: 'row',
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   bottom: -55
  // },
  textView: {
    width: 250,
    marginTop: 50,
    alignItems: "center"
  }
};

@inject("ControlStore")
@observer
export default class UpgradeContainer extends Component {
  constructor(props) {
    super(props);
    this.ControlStore = this.props.ControlStore;
    //this.state = {
    //  topCheck: true,
    //  upperCheck: false,
    //}
  }

  componentWillMount() {
    if (Platform.OS === "ios") {
      const products = [
        "com.kayming.bacon.premium_1y",
        "com.kayming.bacon.premium_3m"
      ];
      InAppUtils.loadProducts(products, (error, products) => {
        //update store here.
        console.log("Products: ", products);
        console.log("Error: ", error);
      });
    }
  }

  topCheckOnPress = () => {
    this.ControlStore.pickThreeMonthUpfrade();
    //this.setState({
    //  topCheck: !this.state.topCheck,
    //  upperCheck: !this.state.upperCheck,
    //})
  };

  upperCheckOnPress = () => {
    this.ControlStore.pickOneYearUpfrade();
    //this.setState({
    //  topCheck: !this.state.topCheck,
    //  upperCheck: !this.state.upperCheck,
    //})
  };

  render() {
    return (
      <View style={styles.view}>
        <PolicyModalContainer />
        <RuleModalContainer />
        <View style={{ width: 300, alignItems: "center" }}>
          {Platform.OS === "ios" && (
            <View style={{ marginVertical: 10, width: 250 }}>
              <Text style={styles.text}>
                當您按下「升級」並透過您的iTunes帳號購買會員升級服務, 我們將經由您的iTunes帳號收費。
              </Text>
              <Text />
              <Text style={styles.text}>
                您的高級會員資格將於訂閱效期滿前24小時內自動續訂並將從您的iTunes帳號扣取費用。
              </Text>
              <Text />
              <Text style={styles.text}>若需取消自動續訂您可以直接在您的iTunes帳號取消自動續訂。</Text>
            </View>
          )}

          <View
            style={{
              width: 160,
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginVertical: 10,
            }}
          >
            <TouchableOpacity
              style={{ marginRight: 5 }}
              onPress={this.ControlStore.setSettingPolicyModal}
            >
              <Text style={styles.link}>服務條款</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={this.ControlStore.setSettingRuleModal}>
              <Text style={styles.link}> 個資保護政策</Text>
            </TouchableOpacity>
          </View>
        </View>
        <Upgrade
          topCheck={this.ControlStore.upgrade["3_month"]}
          upperCheck={this.ControlStore.upgrade["1_year"]}
          topCheckOnPress={this.topCheckOnPress}
          upperCheckOnPress={this.upperCheckOnPress}
        />
      </View>
    );
  }
}
