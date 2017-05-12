import React, { Component } from 'react'
import { TextInput, View } from 'react-native'
import { Icon } from 'react-native-elements'
import ChangeColorButton from './Components/ChangeColorButton'
import { Actions } from 'react-native-router-flux'

const styles = {
  Interests: {
    flex: 1,
    //backgroundColor: "#ff0000",
    justifyContent: "flex-start",
  },
  ShowTag: {
    flexWrap: 'wrap',
    flexDirection: 'row-reverse',
    justifyContent: 'flex-end',
  },  
  Edit: {
    //flex: 1,
    flexDirection: 'row', //主軸方向
    justifyContent: 'center', // 主軸佈局
    alignItems: 'center', //次軸佈局
    //backgroundColor: '#f0f0f0',
  },
  Input: {
    flex: 0.95
  },  
  EditIcon: {
    flex: 0.05,
    paddingTop: 25
  },
  PopularTag: {
    //flex: 1,
    flexWrap: 'wrap',
    flexDirection: 'row-reverse',
    justifyContent: 'flex-end',
  }
}

class Interests extends Component {

  constructor(props) {
    super(props)
    this.state = { initButtonColor: "#ffffff", showLists: [], defaultLists: ["旅遊","健身","逛街","美食","網購","遊戲","路跑","電影"] }
  }

  _save = () => {
    //this.props.save(this.state.text)
    Actions.aboutMeIndex()
  }

  componentWillMount = () => {
    Actions.refresh({rightTitle: "完成", onRight: this._save });
  }  

  onKeyPress = () => {
    this.setState({ showLists: this.state.showLists.concat(this.state.text) })
  }

  renderButton = (list) => { return <ChangeColorButton key = { list } initButtonColor = { this.state.initButtonColor } changedButtonColor = "#000000" initTextColor = "#696969" changedTextColor = "#ffffff" title = { list } /> }

  renderShowTag = () => {
    return this.state.showLists.map(this.renderButton)
  }

  renderPopularTag = () => {
    return this.state.defaultLists.map(this.renderButton)
  } 

  onPressA = () => {
    this.setState({ initButtonColor: "#fffacd" })
  }

  onPressB = () => {
    this.setState({ initButtonColor: "#4169e1" })
  }

  calcuatePaddingBottom = () => {
    return (this.state.showLists.length/4)*100
  }  

  render(){
    return(
      <View style = { styles.Interests }> 

        <View style = { [styles.ShowTag,{ paddingBottom: 70 }] }>
          { this.renderShowTag() }
        </View>       
        <View style = { styles.Edit }>

          <View style = { styles.Input }>
            <TextInput
              placeholder = "輸入興趣"
              onSubmitEditing = { this.onKeyPress }     
              onChangeText = { (text) => this.setState({ text }) }
              value = { this.state.text }
            /> 
          </View>

          <View style = { styles.EditIcon }>
            <Icon name = "border-color" color = "#000000" size = { 20 } />  
          </View>
        </View>
        <View style = { styles.PopularTag }>
          { this.renderPopularTag() }
        </View>          
      </View>  
    )
  }
}
/*
        <View>
          <View>
            <Text style = { { color: "#ff0000" } }>熱門</Text>
          </View>
          <View style = { styles.popularTag }>
            { this.renderdefaultLists() }
          </View>         
        </View>
        */
      /*
        <View><Text></Text></View>  
        <View>
          <Button color="#fffacd" title="Set InitButtonColor" onPress={this.onPressA}/>
        </View>
        <View><Text></Text></View> 
        <View>
          <Button color="#4169e1" title="Set InitButtonColor" onPress={this.onPressB}/>
        </View>
        */
export default Interests;