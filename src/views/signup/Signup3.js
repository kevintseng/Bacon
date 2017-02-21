import React, {Component, PropTypes} from 'react';
import {
    View,
    Dimensions,
} from 'react-native';
import {ButtonGroup, FormLabel, FormInput, Button} from 'react-native-elements'; // eslint-disable-line
import { Actions } from 'react-native-router-flux';
import { autorun } from 'mobx';
import Reactotron from 'reactotron-react-native'; // eslint-disable-line
import { Header } from '../../components/common/Header';

const {width, height} = Dimensions.get('window'); //eslint-disable-line

export class Signup3 extends Component {
  static propTypes = {
    fire: PropTypes.object,
    store: PropTypes.func,
    sustore: PropTypes.object,
  };

  constructor(props) {
    super(props);
    this.sustore = this.props.sustore;
    this.state = {
      size: {
          width,
          height: 600
      },
      disabled: true,
      selectedGender: -1,
      selectedSexOrientation: -1,
      loading: false,
    };
  }

  updateGender = (selected) => {
    if(selected >= 0) {
      this.setState({
        disabled: false,
        selectedGender: selected,
      });
    }
  }

  updateSexOrientation = (selected) => {
    if(selected >= 0) {
      this.setState({
        disabled: false,
        selectedSexOrientation: selected,
      });
    }
  }

  checkInputs = () => {
    if(this.state.selectedGender < 0 && this.state.selectedSexOrientation < 0) {
      alert('請選擇您的性別及性向');
      this.setState({disabled: true});
    } else if(this.state.selectedGender < 0) {
      alert('請選擇您的性別');
      this.setState({disabled: true});
    } else if(this.state.selectedSexOrientation < 0) {
      alert('請選取您的性向');
      this.setState({disabled: true});
    } else {
      this.sustore.setGender(this.state.selectedGender);
      this.sustore.setSexOrientation(this.state.selectedSexOrientation);
      autorun(() => {
        Reactotron.log(this.sustore);
      });
      Actions.signup4({
        sustore: this.sustore
      });
    }
  }

  render() {
    const genders = ['男', '女'];
    const { selectedGender, selectedSexOrientation } = this.state;
    const sexOrientations = ['男', '女', '皆可'];

    return (
      <View style={this.state.size}>
        <Header
          headerText='性別及對象'
          rightButtonText='再一步'
          onRight={this.checkInputs}
          rightColor='#007AFF'
          onLeft={() => Actions.pop()}
          leftColor='#007AFF'
        />
        <View style={{ marginBottom: 20 }}>
          <FormLabel>我的性別</FormLabel>
          <ButtonGroup
            containerStyle={{ height: 30 }}
            selectedBackgroundColor='#03A9F4'
            selectedTextStyle={{ color: 'white' }}
            onPress={this.updateGender}
            selectedIndex={selectedGender}
            buttons={genders}
          />
          <FormLabel>找尋對象性別</FormLabel>
          <ButtonGroup
            containerStyle={{ height: 30 }}
            selectedBackgroundColor='#03A9F4'
            selectedTextStyle={{ color: 'white' }}
            onPress={this.updateSexOrientation}
            selectedIndex={selectedSexOrientation}
            buttons={sexOrientations}
          />
        </View>
      </View>
    );
  }
}
