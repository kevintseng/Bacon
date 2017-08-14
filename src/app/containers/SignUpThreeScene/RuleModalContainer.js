import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { View, Modal, Text, TouchableOpacity, ScrollView, Dimensions } from 'react-native'
//import Modal from 'react-native-modal'

const { width, height } = Dimensions.get('window')

const styles = {
  title: {
    backgroundColor: 'transparent',
    letterSpacing: 3,
    fontFamily: 'NotoSans',
    fontSize: 15,
    fontWeight: '500',
    color: '#606060',
    textAlign: 'center',
    padding: 10
  },
  text: {
    padding: 10    
  }
}
@inject('SignUpStore') @observer
export default class RuleModalContainer extends Component {

  constructor(props) {
    super(props)
    this.SignUpStore = this.props.SignUpStore
  }

  render() {
    return(
        <Modal animationType={"fade"} transparent={true} visible={this.SignUpStore.ruleModal} onRequestClose={ this.SignUpStore.setRuleModal } >
          <TouchableOpacity
            activeOpacity={1}
            onPress={ this.SignUpStore.setRuleModal }
            style={{
              backgroundColor: 'rgba(52, 52, 52, 0.4)',
              flex: 1,
              justifyContent: 'center'
            }}
          >
            <TouchableOpacity
              activeOpacity={1}
              style={{
                backgroundColor: 'white',
                alignSelf: 'center',
                alignItems: 'center',
                aspectRatio: 1.5,
                width: width*0.8,
                height: height*0.7,
                position: 'absolute',
                borderRadius: 15
              }}
            >
              <View style={{justifyContent: 'space-between'}}>
                <View>
                  <Text style={ styles.title }>個資保護政策</Text>
                </View>
                <ScrollView>
                  <Text style={ styles.text }>滷味、滷肉飯是國民美食，傳統多認為陳年老滷最入味，不過有國內研究發現，滷肉加熱時間愈長，內含「膽固醇氧化產物」濃度越高，恐增加致癌風險。其實這有化解的方法！長庚毒物實驗室團隊資深護理師譚敦慈表示，在滷汁裡面加入新鮮的蔥、薑、蒜，有助於減少膽固醇氧化物的產生。

譚敦慈表示，她自己也常常滷肉、幫小孩帶便當，滷肉是職業婦女備菜的好朋友，重點在於不要一直重複煮，也避免久煮。滷肉之前先川燙去油脂，避免油脂過多造成膽固醇過高，另根據香港、大陸的研究，在滷汁裡加入新鮮的蔥、薑、蒜或洋蔥可以減少氧化膽固醇的產生。

至於烹煮時間，她說，每次一鍋約煮30~40分鐘就熄火，再用小盒子分裝，要吃的時候拿出所需的量加熱。此時可以把湯汁上的浮油撈除，把第一次滷時摻入的蔥、薑、蒜拿出，再加入新鮮蔥、薑、蒜，也可以加入根莖類蔬菜如竹筍、蘿蔔等，用這樣的方式可減低氧化膽固醇，也避免重複燉煮導致過鹹。

林口長庚臨床毒物科主任顏宗海表示，萬年滷汁或者滷肉含高鈉、高油脂，經過反覆加熱會增加膽固醇氧化產物，若經常食用，最令人擔心的還是會增加高血壓、心血管疾病風險，但其實不只滷汁，任何的油脂經過反覆加熱都會有同樣的結果。</Text>
                </ScrollView>
                <View>
                  <Text style={ styles.title } onPress={ this.SignUpStore.setRuleModal }>我知道了!</Text>
                </View>
              </View>
            </TouchableOpacity>
          </TouchableOpacity>
        </Modal>
    )
  }
}