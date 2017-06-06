import React, {Component, PropTypes} from 'react';
import {
  Alert,
  View,
  Image,
  Navigator,
  TextInput,
  ScrollView,
  StyleSheet,
  Dimensions,
  TouchableHighlight,
  UIExplorerBlock,
  AsyncStorage,
  TouchableOpacity,
  TouchableWithoutFeedback
} from 'react-native';
import { observer } from 'mobx-react/native';
import { Text, Button,ListItem,SocialIcon } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';
import Modal from 'react-native-modal';
import {serviceRule, securityRule} from '../../views/data/Rules.js'

const {width, height} = Dimensions.get('window'); //eslint-disable-line

@observer
export default class AboutMeeQ extends Component {
  static propTypes = {
    store: PropTypes.object,
    fire: PropTypes.object,
  }

  constructor(props) {
    super(props);
    this.store = this.props.store;
    this.fs = this.props.fire;
    this.db = this.props.localdb;
    this.state = {
      visibleModal: null,
    };
  }



  componentDidMount() {
    console.log('Account rendered');
  }

  _renderCloseButton = (text, onPress) => (
    <TouchableOpacity onPress={onPress}>
      <View style={{justifyContent:'flex-end',alignItems:'flex-end',marginTop:10}}>
        <Text style={{fontWeight:'bold'}}>{text}</Text>
      </View>
    </TouchableOpacity>
  );

  _renderVersionContent = () => (
    <View style={styles.modalContent}>
      <View style={{flexDirection: 'column', alignSelf:'center',marginTop:60,marginBottom:30}}>
        <Image
          style={{maxWidth:180, maxHeight: 50}}
          source={require('../../../images/MeeqLogo.png')}
        />
        <Text style={{alignSelf:'center'}}>V 1.678</Text>
        <Text style={{alignSelf:'center',marginBottom:30}}>20170511</Text>
        <Text style={{alignSelf:'center'}}>Kayming Mobile co. Ltd.</Text>
        <Text style={{alignSelf:'center',marginBottom:60}}>版權所有</Text>
      </View>
      {this._renderCloseButton('我知道了', () => this.setState({ visibleModal: null }))}
    </View>
  );

  _renderServiceContent = () => (
    <View style={styles.modalContent}>
      <Text style={{fontSize:14,marginBottom:10}}>{serviceRule.title}</Text>
      <View style={{borderBottomWidth: 1,borderBottomColor: 'gray', width:width*0.8,marginBottom:5}}></View>
        <ScrollView>
          <Text style={{fontSize:10}}>{serviceRule.context}</Text>
        </ScrollView>
      <View style={{borderBottomWidth: 1,borderBottomColor: 'gray', width:width*0.8,marginTop:5}}></View>
      {this._renderCloseButton('我知道了', () => this.setState({ visibleModal: null }))}
    </View>
  );

  _renderSecurityContent = () => (
    <View style={styles.modalContent}>
      <Text style={{fontSize:14,marginBottom:10}}>{securityRule.title}</Text>
      <View style={{borderBottomWidth: 1,borderBottomColor: 'gray', width:width*0.8,marginBottom:5}}></View>
      <ScrollView>
        <Text style={{fontSize:10}}>{securityRule.context}</Text>
      </ScrollView>
      <View style={{borderBottomWidth: 1,borderBottomColor: 'gray', width:width*0.8,marginTop:5}}></View>
      {this._renderCloseButton('我知道了', () => this.setState({ visibleModal: null }))}
    </View>
  );

  render() {
    return(
      <View style={styles.container}>
        <View>
          <View style={{marginTop:20,justifyContent: 'center',alignItems: 'center',margin:10}}>
            <Text style={styles.conFont}>"我相信網路是讓我擴大交友圈最好的方式"</Text>
            <Text style={styles.conFont}>"我很重視隱私，我不要交友軟體跟FB或手機通訊錄有任何關聯"</Text>
            <Text style={styles.conFont}>"我對於要付錢才能打個招呼或是才能看對方資料非常反感"</Text>
            <Text style={styles.conFont}>"我討厭主動跟我打招呼或示好的是假帳號或是機器人帳號"</Text>
            <Text style={styles.conFontBorder}>如果你跟我們一樣，歡迎加入MeeQ !</Text>
          </View>
          <View style={{justifyContent:'flex-end',alignItems:'flex-end',margin:10}}>
            <Text>MeeQ團隊</Text>
          </View>
        </View>
        <View>
          <Button
            backgroundColor='#007AFF'
            buttonStyle={styles.buttonTop}
            onPress={() => this.setState({ visibleModal: 0 })}
            title='版本' />
          <Button
            backgroundColor='#007AFF'
            buttonStyle={styles.buttonTop}
            onPress={() => this.setState({ visibleModal: 2 })}
            title='服務條款' />
          <Button
            backgroundColor='#007AFF'
            buttonStyle={styles.buttonTop}
            onPress={() => this.setState({ visibleModal: 1 })}
            title='個資保護條款' />
        </View>

          <Modal isVisible={this.state.visibleModal === 0}>
            {this._renderVersionContent()}
          </Modal>
          <Modal isVisible={this.state.visibleModal === 1}>
            {this._renderSecurityContent()}
          </Modal>
          <Modal isVisible={this.state.visibleModal === 2}>
            {this._renderServiceContent()}
          </Modal>

      </View>
    );
  }
}

const styles = {
  buttonTop: {
      marginTop: 20
  },
  conFont:{
    fontSize:17,
    marginBottom:25,
  },
  conFontBorder: {
    fontSize:17,
    //marginBottom:15,
    fontWeight:'bold'
  },
    wrapper: {
      borderRadius: 5,
      marginBottom: 5,
  },
  button: {
      backgroundColor: '#eeeeee',
      padding: 10,
  },
  container: {
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'space-between',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 22,
    //justifyContent: 'center',
    //alignItems: 'center',
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
    maxHeight: 400
  },
}
