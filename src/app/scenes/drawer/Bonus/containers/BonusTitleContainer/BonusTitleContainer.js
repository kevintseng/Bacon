import React, { Component } from 'react'
import { View, Animated } from 'react-native'

import UpgradeTitle from '../../../../../views/UpgradeTitle'

export default class BonusTitleContainer extends Component {

  constructor(props) {
    super(props)
    this.state = {
      fadeA: new Animated.Value(1),
      fadeB: new Animated.Value(0),
      fadeC: new Animated.Value(0)
    }
  }

  componentDidMount() {
    this.cycleAnimation()         
  }

  cycleAnimation = () => {
    Animated.sequence([
      Animated.timing(          
        this.state.fadeA,  
        { 
          toValue: 0,
          duration: 2000
        }      
      ), 
      Animated.timing(          
        this.state.fadeB,  
        {
          toValue: 1,
          duration: 2000
        }      
      ),
      Animated.timing(          
        this.state.fadeB,  
        {
          toValue: 0,
          duration: 2000
        }      
      ),
      Animated.timing(          
        this.state.fadeC,  
        {
          toValue: 1,
          duration: 2000
        }      
      ),
      Animated.timing(          
        this.state.fadeC,  
        {
          toValue: 0,
          duration: 2000
        }      
      ),
      Animated.timing(          
        this.state.fadeA,  
        {
          toValue: 1,
          duration: 2000
        }      
      )    
      ]
    ).start(() => {
      this.cycleAnimation()
    }) 
  }

  render() {
    return(
      <View style={{alignItems: 'center'}}>
        <Animated.View style={{opacity: this.state.fadeA, position: 'absolute'}}>
          <UpgradeTitle
            source={require('./img/ico_deposit_1.png')}
            topText='可用Q點來增加每天巧遇留言的次數'
            upperText='來跟更多新朋友打招呼吧'
          />
        </Animated.View>
        <Animated.View style={{opacity: this.state.fadeB, position: 'absolute'}}>
          <UpgradeTitle
            source={require('./img/ico_deposit_2.png')}
            topText='可用Q點來進行更多的來訪留言'
            upperText='讓對方的印象深刻'
          />
        </Animated.View>
        <Animated.View style={{opacity: this.state.fadeC, position: 'absolute'}}>
          <UpgradeTitle
            source={require('./img/ico_deposit_3.png')}
            topText='可用Q點讓你的來訪留言排在最前面'
            upperText='搶先吸引對方的目光'
          />
        </Animated.View>
      </View>
    )
  }
}

/*
ico_deposit_3
      <UpgradeTitle
        source={require('./img/ico_deposit_1.png')}
        topText='可用Q點來增加每天巧遇留言的次數'
        upperText='來跟更多新朋友打招呼吧'
      />
      <UpgradeTitle
        source={require('./img/ico_deposit_2.png')}
        topText='可用Q點來進行更多的來訪留言'
        upperText='讓對方的印象深刻'
      />
*/