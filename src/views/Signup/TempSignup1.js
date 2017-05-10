import React, {Component} from 'react';
import {
    View,
    Dimensions,
} from 'react-native';
import {ButtonGroup, FormLabel, FormInput, Button} from 'react-native-elements'; // eslint-disable-line
import { Actions } from 'react-native-router-flux';
import { observer } from 'mobx-react/native';
// import { autorun } from 'mobx';
 // eslint-disable-line
import { Header, FormErrorMsg } from '../../components';
import SignupStore from '../../store/SignupStore'

const {width, height} = Dimensions.get('window'); //eslint-disable-line

@observer
class TempSignup1 extends Component {
  constructor(props) {
    super(props);
    //this.sustore = this.props.sustore;
    this.sustore = new SignupStore();
    this.store = this.props.store;
    this.state = {
      size: {
          width,
          height: 600
      },
      selectedGender: -1,
      selectedSexOrientation: -1,
      genderErr: false,
      soErr: false,
      loading: false,
    };
  }

  componentWillMount() {
    console.log('Will mount Signup3');
  }

  componentDidMount() {
    this.store.setInSignupProcess(true);
    console.log('Signup 3 mounted');
  }

  updateGender = (selected) => {
    if(selected >= 0) {
      this.setState({
        genderErr: false,
        selectedGender: selected,
      });
    }
  }

  updateSexOrientation = (selected) => {
    if(selected >= 0) {
      this.setState({
        soErr: false,
        selectedSexOrientation: selected,
      });
    }
  }

  handleSubmit = () => {
    if(this.state.selectedGender < 0) {
      this.setState({
        genderErr: '請選擇其中一項'
      });
      return
    }
    if(this.state.selectedSexOrientation < 0) {
      this.setState({
        soErr: '請選擇其中一項'
      });
      return
    }

    this.sustore.setGender(this.state.selectedGender);
    console.log('gender: ' + this.state.selectedGender + ', selected: ' + this.state.selectedSexOrientation);
    this.sustore.setSexOrientation(this.state.selectedGender, this.state.selectedSexOrientation);
    // autorun(() => {
    //   console.log(this.sustore);
    // });
    Actions.tempsignup2({
      type: "reset",
      sustore: this.sustore
    });
  }

  render() {
    const genders = ['男', '女'];
    const { selectedGender, selectedSexOrientation } = this.state;
    const sexOrientations = ['同性', '異性'];

    return (
      <View style={this.state.size}>
        <Header
          headerText='性別及對象'
          //rightButtonText='下一步'
          onRight={this.handleSubmit}
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
          {
            this.state.genderErr &&   <FormErrorMsg>{this.state.genderErr}</FormErrorMsg>
          }
          <FormLabel>我想要找尋的對象性別</FormLabel>
          <ButtonGroup
            containerStyle={{ height: 30 }}
            selectedBackgroundColor='#03A9F4'
            selectedTextStyle={{ color: 'white' }}
            onPress={this.updateSexOrientation}
            selectedIndex={selectedSexOrientation}
            buttons={sexOrientations}
          />
          {
            this.state.soErr &&   <FormErrorMsg>{this.state.soErr}</FormErrorMsg>
          }
        </View>
        <Button
          style={{ marginTop: 10 }}
          backgroundColor='transparent'
          color='#007AFF'
          title={'下一步'}
          onPress={this.handleSubmit}
        />
      </View>
    );
  }
}

export { TempSignup1 };
