import React, {Component, PropTypes} from 'react';
import {
    View,
    ActivityIndicator,
    Dimensions,
    Text,
} from 'react-native';
import {ButtonGroup, FormLabel, FormInput, Button} from 'react-native-elements'; // eslint-disable-line
import { Actions } from 'react-native-router-flux';

const {width, height} = Dimensions.get('window'); //eslint-disable-line

export default class Signup3 extends Component {
  static propTypes = {
    email: PropTypes.string,
    password: PropTypes.string,
    nickname: PropTypes.string,
  };

  constructor(props) {
    super(props);
    this.state = {
      size: {
          width,
          height: 300
      },
      disabled: true,
      email: this.props.email,
      password: this.props.password,
      selectedGender: -1,
      selectedSexOrientation: -1,
      loading: false,
    };
  }

  updateGender = (selectedGender) => {
    if(this.state.selectedSexOrientation >= 0) {
      this.setState({
        disabled: false,
      });
    }
    this.setState({
      selectedGender,
    });
  }

  updateSexOrientation = (selectedSexOrientation) => {
    if(this.state.selectedGender >= 0) {
      this.setState({
        disabled: false,
      });
    }
    this.setState({
      selectedSexOrientation,
    });
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
      return Actions.pop({popNum: 3});
    }
  }

  render() {
    const genders = ['男', '女'];
    const {selectedGender} = this.state;
    const sexOrientations = ['異性', '同性', '都好'];
    const {selectedSexOrientation} = this.state;

    return (
      <View style={this.state.size}>
        <Text>{this.state.selectedGender}</Text>
        <Text>{this.state.selectedSexOrientation}</Text>
        <View style={{ marginBottom: 20 }}>
          <FormLabel>性別</FormLabel>
          <ButtonGroup
            containerStyle={{ height: 30 }}
            selectedBackgroundColor='#a022ae'
            selectedTextStyle={{ color: 'white' }}
            onPress={this.updateGender}
            selectedIndex={selectedGender}
            buttons={genders}
          />
          <FormLabel>喜歡性向</FormLabel>
          <ButtonGroup
            containerStyle={{ height: 30 }}
            selectedBackgroundColor='#a022ae'
            selectedTextStyle={{ color: 'white' }}
            onPress={this.updateSexOrientation}
            selectedIndex={selectedSexOrientation}
            buttons={sexOrientations}
          />
        </View>
        <Button
          raised
          backgroundColor='#a022ae'
          title={'完成'}
          disabled={this.state.disabled}
          onPress={this.checkInputs}
        />
        {
          this.state.loading && <View>
            <ActivityIndicator />
            <Button title={'back'} onPress={() => Actions.pop()}/>
          </View>
        }
      </View>
    );
  }
}
