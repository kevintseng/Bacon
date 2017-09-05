import React, { Component } from 'react'
import { View, Text, FlatList, Alert } from 'react-native'
import { inject, observer } from 'mobx-react'
import { Actions } from 'react-native-router-flux'

import TaskList from '../../views/TaskList'

@inject('firebase','SubjectStore') @observer 
export default class TaskContainer extends Component {

  constructor(props) {
    super(props)
    this.firebase = this.props.firebase
    this.SubjectStore = this.props.SubjectStore
    this.tasks = [  
      {key: 1, task: 'Email認證獎勵', bonus: '20點', taken: this.SubjectStore.task1},
      {key: 2, task: '上傳三張照片獎勵', bonus: '20點', taken: this.SubjectStore.task2},
      {key: 3, task: '完成自我介紹獎勵', bonus: '20點', taken: this.SubjectStore.task3},
      {key: 4, task: '完成興趣愛好獎勵', bonus: '20點', taken: this.SubjectStore.task4}
    ]
  }

  componentWillMount() {
  }

  componentDidMount() {
    //this.firebase.database().ref('users/' + this.uid).once('value')
  }

  goToAboutMeTab = () => {
    //Actions.AboutMeTab({type: 'reset'})
  }

  takeEmailBonus = (taken) => {
    if (SubjectStore.emailVerified && !taken) {
      // 完成任務 並且沒領過
      this.firebase.database().ref(`users/${this.SubjectStore.uid}/bonus`).set(this.SubjectStore.bonus + 20)
      this.firebase.database().ref('users/' + this.SubjectStore.uid + '/task1').set(true)
      this.SubjectStore.addBonus(20)
      this.SubjectStore.setTask1(true)
      Alert.alert( 
        '管理員提示', '領取成功', [ 
          {text: '確認', onPress: () => { this.goToAboutMeTab() } }, 
        ], { cancelable: false } 
      )
    } else {
      if (taken) {
        Alert.alert( 
          '管理員提示', '已領取過，無法重新領取', [ 
            {text: '確認', onPress: () => { this.goToAboutMeTab() } }, 
          ], { cancelable: false } 
        )
      } else {
        Alert.alert( 
          '管理員提示', '領取失敗', [ 
            {text: '確認', onPress: () => { this.goToAboutMeTab() } }, 
          ], { cancelable: false } 
        )
      }
    }
  }

  takePhotoBonus = taken => {
    if (SubjectStore.albumToFlatList.length >= 3 && !taken) {
      // 完成任務 並且沒領過
      this.firebase.database().ref(`users/${this.SubjectStore.uid}/bonus`).set(this.SubjectStore.bonus + 20)
      this.firebase.database().ref('users/' + this.SubjectStore.uid + '/task2').set(true)
      this.SubjectStore.addBonus(20)
      this.SubjectStore.setTask2(true)
      Alert.alert( 
        '管理員提示', '領取成功', [ 
          {text: '確認', onPress: () => { this.goToAboutMeTab() } }, 
        ], { cancelable: false } 
      )
    } else {
      if (taken) {
        Alert.alert( 
          '管理員提示', '已領取過，無法重新領取', [ 
            {text: '確認', onPress: () => { this.goToAboutMeTab() } }, 
          ], { cancelable: false } 
        )
      } else {
        Alert.alert( 
          '管理員提示', '領取失敗', [ 
            {text: '確認', onPress: () => { this.goToAboutMeTab() } }, 
          ], { cancelable: false } 
        )
      }
    }
  }

  takeIntroduceBonus = (taken) => {
    if (SubjectStore.bio && !taken) {
      // 完成任務 並且沒領過
      this.firebase.database().ref(`users/${this.SubjectStore.uid}/bonus`).set(this.SubjectStore.bonus + 20)
      this.firebase.database().ref('users/' + this.SubjectStore.uid + '/task3').set(true)
      this.SubjectStore.addBonus(20)
      this.SubjectStore.setTask3(true)
      Alert.alert( 
        '管理員提示', '領取成功', [ 
          {text: '確認', onPress: () => { this.goToAboutMeTab() } }, 
        ], { cancelable: false } 
      )
    } else {
      if (taken) {
        Alert.alert( 
          '管理員提示', '已領取過，無法重新領取', [ 
            {text: '確認', onPress: () => { this.goToAboutMeTab() } }, 
          ], { cancelable: false } 
        )
      } else {
        Alert.alert( 
          '管理員提示', '領取失敗', [ 
            {text: '確認', onPress: () => { this.goToAboutMeTab() } }, 
          ], { cancelable: false } 
        )
      }
    }
  }

  takeHobitBonus = (taken) => {
    if (SubjectStore.hobbiesToFlatList.length > 0 && !taken) {
      // 完成任務 並且沒領過
      this.firebase.database().ref(`users/${this.SubjectStore.uid}/bonus`).set(this.SubjectStore.bonus + 20)
      this.firebase.database().ref('users/' + this.SubjectStore.uid + '/task4').set(true)
      this.SubjectStore.addBonus(20)
      this.SubjectStore.setTask4(true)
      Alert.alert( 
        '管理員提示', '領取成功', [ 
          {text: '確認', onPress: () => { this.goToAboutMeTab() } }, 
        ], { cancelable: false } 
      )
    } else {
      if (taken) {
        Alert.alert( 
          '管理員提示', '已領取過，無法重新領取', [ 
            {text: '確認', onPress: () => { this.goToAboutMeTab() } }, 
          ], { cancelable: false } 
        )
      } else {
        Alert.alert( 
          '管理員提示', '領取失敗', [ 
            {text: '確認', onPress: () => { this.goToAboutMeTab() } }, 
          ], { cancelable: false } 
        )
      }
    }
  }

  takeBonus = (key,taken) => {
    switch (key)
    {
    case '1':
      this.takeEmailBonus(taken)
      break
    case '2':
      this.takePhotoBonus(taken)
      break
    case '3':
      this.takeIntroduceBonus(taken)
      break
    case '4':
      this.takeHobitBonus(taken)
      break
    default:
      alert('領取錯誤')
      console.log(key)
      break
    }
  }

  bonusWarning = (key,task,bonus,taken) => {
    Alert.alert( 
      task, '確認領取Q點' + bonus + '點？', [ 
        {text: '確認', onPress: () => { this.takeBonus(key,taken) } }, 
        {text: '取消', onPress: () => console.log('Cancel Pressed'), style: 'cancel'}
      ], { cancelable: true } 
    )
  }
  
  render() {
    return(
      <View>
        <FlatList
          removeClippedSubviews
          data={ this.SubjectStore.tasksToFlatList }
          numColumns={1}
          renderItem={({item}) =>
            <TaskList  
              taken={item.taken}
              task={item.task}
              bonus={item.bonus}
              onPress={ () => { this.bonusWarning(item.key,item.task,item.bonus,item.taken) } }
              />

           }
        />
      </View>
    )
  }
}