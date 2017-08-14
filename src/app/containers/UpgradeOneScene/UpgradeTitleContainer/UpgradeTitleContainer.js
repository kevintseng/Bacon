import React, { Component } from 'react'
import { View, Animated } from 'react-native'

import UpgradeTitle from '../../../views/UpgradeTitle'

export default class UpgradeTitleContainer extends Component {

  constructor(props) {
    super(props)
    this.state = {
      fadeA: new Animated.Value(1),
      fadeB: new Animated.Value(0),
      fadeC: new Animated.Value(0),
      fadeD: new Animated.Value(0)
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
        this.state.fadeD,  
        {
          toValue: 1,
          duration: 2000
        }      
      ),
      Animated.timing(          
        this.state.fadeD,  
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
            source={require('./img/ico_upgrade_1.png')}
            topText='開啟隱身模式，走過看過不留痕及'
            upperText='讓你擁有完全的主動權'
          />
        </Animated.View>
        <Animated.View style={{opacity: this.state.fadeB, position: 'absolute'}}>
          <UpgradeTitle
            source={require('./img/ico_upgrade_2.png')}
            topText='開啟進階選項，排除離線或照片少的會員'
            upperText='讓你的對象更準確'
          />
        </Animated.View>
        <Animated.View style={{opacity: this.state.fadeC, position: 'absolute'}}>
          <UpgradeTitle
            source={require('./img/ico_upgrade_3.png')}
            topText='提高未讀招呼，與收藏的上限'
            upperText='讓難得的緣分不漏接'
          />
        </Animated.View>
        <Animated.View style={{opacity: this.state.fadeD, position: 'absolute'}}>
          <UpgradeTitle
            source={require('./img/ico_upgrade_4.png')}
            topText='少了會員升級四'
            upperText='少了會員升級四'
          />
        </Animated.View>
      </View>
    )
  }
}