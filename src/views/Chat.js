import React, { Component } from 'react';
import { Keyboard, StyleSheet, View, Text, Dimensions, } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { observer } from 'mobx-react/native';
import { GiftedChat } from 'react-native-gifted-chat';
import Moment from 'moment';
import { Icon } from 'react-native-elements';


const {width, height} = Dimensions.get('window'); //eslint-disable-line
const styles = StyleSheet.create({
  footerContainer: {
    marginTop: 5,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10,
  },
  footerText: {
    fontSize: 14,
    color: '#aaa',
  },
});

@observer
export default class Chat extends Component {
  constructor(props) {
    super(props);
    this.store = this.props.store;
    this.name = this.props.name;
    this.firebase = this.props.fire;
    if(this.store.user.chatStatus === '我的狀態') {
      this.title = this.name;
    } else {
      this.title = this.name + ', ' + this.store.user.chatStatus;
    }
    this.state = {
      size: {
          width,
          height
      },
      messages: [],
      typingText: null,
      loadEarlier: true,
      isLoadingEarlier: false,
      actions: false,
    };
    this._isMounted = false;
  }

  componentWillMount() {
    console.debug('Rendering Messages');
    Actions.refresh({title: this.title })
    this._isMounted = true;
    this.setState(() => {
      return {
        messages: require('./data/messages.js'),
      };
    });
    // this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow);
    // this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide);
  }

  componentDidMount() {
    const t = new Date();
    this.setState({
      messages: [
        {
          _id: 1,
          text: '安安, 你好..幾歲？住哪？給約嗎???',
          createdAt: t,
          user: {
            _id: 2,
            name: 'Sex Machine',
            avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTvReCHzABatvAp0XfAMa6VyACoQuG50YDpkdL9hoUx8W5zCY1',
          },
        },
      ],
    });
  }

  // componentWillUnmount () {
  //   this.keyboardDidShowListener.remove();
  //   this.keyboardDidHideListener.remove();
  // }
  //
  // _keyboardDidShow () {
  //   alert('Keyboard Shown');
  // }
  //
  // _keyboardDidHide () {
  //   alert('Keyboard Hidden');
  // }

  onSend = (messages = []) => {
    this.setState((previousState) => {
      return {
        actions: false,
        messages: GiftedChat.append(previousState.messages, messages),
      };
    });
    Keyboard.dismiss();
    // for demo purpose
   this.answerDemo(messages);
  }

  onLoadEarlier = () => {
    this.setState((previousState) => {
      return {
        isLoadingEarlier: true,
      };
    });

    setTimeout(() => {
      if (this._isMounted === true) {
        this.setState((previousState) => {
          return {
            messages: GiftedChat.prepend(previousState.messages, require('./data/old_messages.js')),
            loadEarlier: false,
            isLoadingEarlier: false,
          };
        });
      }
    }, 1000); // simulating network
  }

  answerDemo = (messages) => {
    if (messages.length > 0) {
      if ((messages[0].image || messages[0].location) || !this._isAlright) {
        this.setState((previousState) => {
          return {
            typingText: '蠟筆小新正在輸入..'
          };
        });
      }
    }

    setTimeout(() => {
      if (this._isMounted === true) {
        if (messages.length > 0) {
          if (messages[0].image) {
            this.onReceive('拍得不錯耶');
          } else if (messages[0].location) {
            this.onReceive('我最喜歡的地方');
          } else {
            if (!this._isAlright) {
              this._isAlright = true;
              this.onReceive('哩供蝦?');
            }
          }
        }
      }

      this.setState((previousState) => {
        return {
          typingText: null,
        };
      });
    }, 1000);
  }

  onReceive = (text) => {
    this.setState((previousState) => {
      return {
        messages: GiftedChat.append(previousState.messages, {
          _id: Math.round(Math.random() * 1000000),
          text,
          createdAt: new Date(),
          user: {
            _id: 2,
            name: 'Sex Machine',
            avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTvReCHzABatvAp0XfAMa6VyACoQuG50YDpkdL9hoUx8W5zCY1',
          },
        }),
      };
    });
  }

  renderFooter = (props) => {
    if (this.state.typingText) {
      return (
        <View style={styles.footerContainer}>
          <Text style={styles.footerText}>
            {this.state.typingText}
          </Text>
        </View>
      );
    }
    return null;
  }

  //TODO: Rewrite this when have time
  actions = () => {
    if(!this.state.actions) {
      return (
        <View style={{ flex: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 2, alignSelf: 'center' }}>
          <Icon
            name='add'
            onPress={() => {
              Keyboard.dismiss();
              this.setState({actions: 'plus'});
              }
            }
            />
          <Icon
            name='tag-faces'
            onPress={() => {
              Keyboard.dismiss();
              this.setState({actions: 'smily'});
            }}
            />
        </View>
      );
    } else if(this.state.actions == 'plus') {
      return (
        <View style={{ flex: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 2, alignSelf: 'center' }}>
          <Icon
            name='keyboard'
            onPress={() => {
              this.setState({actions: false});
              }
            }
            />
          <Icon
            name='tag-faces'
            onPress={() => {
              Keyboard.dismiss();
              this.setState({actions: 'smily'});
            }}
            />
        </View>
      );
    } else if(this.state.actions == 'smily') {
      return (
        <View style={{ flex: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 2, alignSelf: 'center' }}>
          <Icon
            name='add'
            onPress={() => {
              Keyboard.dismiss();
              this.setState({actions: 'plus'});
              }
            }
            />
          <Icon
            name='keyboard'
            onPress={() => {
              this.setState({actions: false});
            }}
            />
        </View>
      );
    }
  }

  renderAccessory = () => {
    console.log('renderAccessory: ', this.state.actions);
    switch(this.state.actions) {
      case 'smily':
        return (
          <View style={{ flex: 1, width: width-8, height: 44, alignSelf: 'center', backgroundColor: 'yellow', marginLeft: 3, marginRight: 4, marginBottom: 3 }}>
          </View>
        );
      case 'plus':
        return (
          <View style={{ flex: 1, width: width-8, height: 44, alignSelf: 'center', backgroundColor: 'orange', marginLeft: 3, marginRight: 4, marginBottom: 3 }}>
          </View>
        );
      default:
        return;
    }
  }

  sendButton = () => {
    return (
      <View style={{ flex: 0, width: 30, marginLeft: 3, flexDirection: 'row', alignSelf: 'center'}}>
        <Icon name='send'/>
      </View>
    );
  }

  render() {
    console.log('this.state.actions: ', this.state.actions);
    return (
      <View style={[this.state.size, {marginTop: -60 }]}>
      {
        this.state.actions && <GiftedChat
          messages={this.state.messages}
          onSend={this.onSend}
          label='test'
          onLoadEarlier={this.onLoadEarlier}
          isLoadingEarlier={this.state.isLoadingEarlier}
          user={{
            _id: 1,
          }}
          placeholder='輸入訊息...'
          renderAccessory={this.renderAccessory}
          renderActions={this.actions}
          renderFooter={this.renderFooter}
        />
      }

      {
        !this.state.actions && <GiftedChat
          messages={this.state.messages}
          onSend={this.onSend}
          onLoadEarlier={this.onLoadEarlier}
          isLoadingEarlier={this.state.isLoadingEarlier}
          user={{
            _id: 1,
          }}
          placeholder='輸入訊息...'
          renderActions={this.actions}
          renderFooter={this.renderFooter}
        />
      }
      </View>
    );
  }
}
