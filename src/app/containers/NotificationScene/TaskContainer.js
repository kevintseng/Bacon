import React, { Component } from 'react'
import { View, Text, FlatList, Alert } from 'react-native'
import { inject, observer } from 'mobx-react'
import { Actions } from 'react-native-router-flux'

import TaskList from '../../views/TaskList'


const tasks = [
  {key: 1, task: 'Email認證獎勵', bonus: '20點'},
  {key: 2, task: '上傳三張照片獎勵', bonus: '20點'},
  {key: 3, task: '完成自我介紹獎勵', bonus: '20點'},
  {key: 4, task: '完成興趣愛好獎勵', bonus: '20點'}
]

@inject('firebase','SubjectStore') @observer 
export default class TaskContainer extends Component {

  constructor(props) {
    super(props)
    this.firebase = this.props.firebase
    this.SubjectStore = this.props.SubjectStore
  }

  componentWillMount() {
  }

  componentDidMount() {
    //this.firebase.database().ref('users/' + this.uid).once('value')
  }

  goToAboutMeTab = () => {
    Actions.AboutMeTab({type: 'reset'})
  }

  takeEmailBonus = () => {
    this.SubjectStore.addBonus(20)
    Alert.alert( 
      '管理員提示', '領取成功', [ 
        {text: '確認', onPress: () => { this.goToAboutMeTab() } }, 
      ], { cancelable: false } 
    )
  }

  takePhotoBonus = () => {
    this.SubjectStore.addBonus(20)
    Alert.alert( 
      '管理員提示', '領取成功', [ 
        {text: '確認', onPress: () => { this.goToAboutMeTab() } }, 
      ], { cancelable: false } 
    )
  }

  takeIntroduceBonus = () => {
    this.SubjectStore.addBonus(20)
    Alert.alert( 
      '管理員提示', '領取成功', [ 
        {text: '確認', onPress: () => { this.goToAboutMeTab() } }, 
      ], { cancelable: false } 
    )
  }

  takeHobitBonus = () => {
    this.SubjectStore.addBonus(20)
    Alert.alert( 
      '管理員提示', '領取成功', [ 
        {text: '確認', onPress: () => { this.goToAboutMeTab() } }, 
      ], { cancelable: false } 
    )
  }

  takeBonus = key => {
    switch (key)
    {
    case 1:
      this.takeEmailBonus()
      break
    case 2:
      this.takePhotoBonus()
      break
    case 3:
      this.takeIntroduceBonus()
      break
    case 4:
      this.takeHobitBonus()
      break
    default:
      alert('領取錯誤')
      break
    }
  }

  bonusWarning = (key,task,bonus) => {
    Alert.alert( 
      task, '確認領取Q點' + bonus + '點？', [ 
        {text: '確認', onPress: () => { this.takeBonus(key) } }, 
        {text: '取消', onPress: () => console.log('Cancel Pressed'), style: 'cancel'}
      ], { cancelable: true } 
    )
  }
  
  render() {
    return(
      <View>
        <FlatList
          removeClippedSubviews
          data={ tasks }
          numColumns={1}
          renderItem={({item}) =>
            <TaskList  
              task={item.task}
              bonus={item.bonus}
              onPress={ () => { this.bonusWarning(item.key,item.task,item.bonus) } }
              />

           }
        />
      </View>
    )
  }
}