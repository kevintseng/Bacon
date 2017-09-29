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
      {key: 4, task: '完成興趣愛好獎勵', bonus: '20點', taken: this.SubjectStore.task4},
      {key: 5, task: '每日上線獎勵', bonus: '5點', taken: this.SubjectStore.task5}
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

  takeEmailBonus = taken => {
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

  checkEmailBonus = taken => {
    if (SubjectStore.emailVerified && !taken) {
      // 完成任務 並且沒領過 符合條件可領
      return true
    } else {
      return false
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

  checkPhotoBonus = taken => {
    if (SubjectStore.albumToFlatList.length >= 3 && !taken) {
      // 完成任務 並且沒領過 符合條件可領
      return true
    } else {
      return false
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

  checkIntroduceBonus = taken => {
    if (SubjectStore.bio && !taken) {
      // 完成任務 並且沒領過 符合條件可領
      return true
    } else {
      return false
    }     
  }

  takeHobitBonus = taken => {
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

  checkHobitBonus = taken => {
    if (SubjectStore.hobbiesToFlatList.length > 0 && !taken) {
      // 完成任務 並且沒領過 符合條件可領
      return true
    } else {
      return false
    }     
  }

  takeEverydayBonus = async taken => {
    await this.firebase.database().ref('users/' + this.SubjectStore.uid + '/lastEverydayBonusDate').once('value', snap => {
      const time_now = new Date()
      const today = time_now.getFullYear() + '-' + time_now.getMonth() + '-' + time_now.getDate()
      if (snap.val() === today) {
        Alert.alert( 
          '管理員提示', '已領取過，無法重新領取', [ 
            {text: '確認', onPress: () => { this.goToAboutMeTab() } }, 
          ], { cancelable: false } 
        )
      } else {
        this.firebase.database().ref(`users/${this.SubjectStore.uid}/bonus`).set(this.SubjectStore.bonus + 5)
        this.firebase.database().ref('users/' + this.SubjectStore.uid + '/task5').set(true)
        this.firebase.database().ref('users/' + this.SubjectStore.uid + '/lastEverydayBonusDate').set(today)
        this.SubjectStore.addBonus(5)
        this.SubjectStore.setTask5(true)
        Alert.alert( 
          '管理員提示', '領取成功', [ 
            {text: '確認', onPress: () => { this.goToAboutMeTab() } }, 
          ], { cancelable: false } 
        )
      }
    })   
  }

  checkEverydayBonus = async taken => {
    await this.firebase.database().ref('users/' + this.SubjectStore.uid + '/lastEverydayBonusDate').once('value', snap => {
      const time_now = new Date()
      const today = time_now.getFullYear() + '-' + time_now.getMonth() + '-' + time_now.getDate()
      if (snap.val() === today) {
        //console.warn('已領取當日獎勵')
        this.firebase.database().ref('users/' + this.SubjectStore.uid + '/task5').set(true)
        this.SubjectStore.setTask5(true)
        return false
      } else {
        this.firebase.database().ref('users/' + this.SubjectStore.uid + '/task5').set(false)
        this.SubjectStore.setTask5(false)
        return true
        //console.warn('未領取當日獎勵')
      }
    })
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
    case '5':
      this.takeEverydayBonus(taken)
      break
    default:
      alert('領取錯誤')
      console.log(key)
      break
    }
  }

  conform = (key,taken) => {
    switch (key)
    {
    case '1':
      return this.checkEmailBonus(taken)
      //break
    case '2':
      return this.checkPhotoBonus(taken)
      //break
    case '3':
      return this.checkIntroduceBonus(taken)
      //break
    case '4':
      return this.checkHobitBonus(taken)
    case '5':
      return this.checkEverydayBonus(taken)
      //break
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
              conform={ this.conform(item.key,item.taken) }
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