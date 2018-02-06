import React, { Component } from 'react'
import { ScrollView, View, TouchableOpacity, Text, Button, Platform, NativeModules } from 'react-native'
import { inject, observer } from 'mobx-react'

import Upgrade from '../../../../views/Bill/Upgrade'
//import PolicyModal from '../../../../views/PolicyModal'
//import RuleModal from '../../../../views/RuleModal'

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
        <Upgrade
          topCheck={this.ControlStore.upgrade["3_month"]}
          upperCheck={this.ControlStore.upgrade["1_year"]}
          topCheckOnPress={this.topCheckOnPress}
          upperCheckOnPress={this.upperCheckOnPress}
        />
    );
  }
}
