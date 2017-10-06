import React, { Component } from 'react'
import { View, Text, FlatList, Alert } from 'react-native'
import { inject, observer } from 'mobx-react'
import { Actions } from 'react-native-router-flux'
import Moment from 'moment'

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
    //const time_now = new Date()
    //this.today = time_now.getFullYear() + '-' + (time_now.getMonth() + 1) + '-' + time_now.getDate()
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
      return 0 // 可領取
    } else {
      return 2 // 未達成
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
      return 0 // 可領取
    } else {
      return 2 // 未達成
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
      return 0 // 可領取
    } else {
      return 2 // 未達成
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
      return 0 // 可領取
    } else {
      return 2 // 未達成
    }     
  }

  takeEverydayBonus = async taken => {
    await this.firebase.database().ref('users/' + this.SubjectStore.uid + '/lastEverydayBonusDate').once('value', snap => {
      const time_now = new Date()
      const today = time_now.getFullYear() + '-' + (time_now.getMonth() + 1) + '-' + time_now.getDate()
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
      const today = time_now.getFullYear() + '-' + (time_now.getMonth() + 1) + '-' + time_now.getDate()
      if (snap.val() === today) {
        //console.warn('已領取當日獎勵')
        this.firebase.database().ref('users/' + this.SubjectStore.uid + '/task5').set(true)
        this.SubjectStore.setTask5(true)
        return 2 // 未達成
      } else {
        this.firebase.database().ref('users/' + this.SubjectStore.uid + '/task5').set(false)
        this.SubjectStore.setTask5(false)
        return 0 // 可領取
      }
    })
  }

  checkEverydayMonthBonus = taken => {
    const time_now = new Date()
    const today = Moment().format().substr(0,10)
    const days = this.getDaysInMonth(time_now.getMonth(),time_now.getFullYear())
    const days_length = time_now.getDate()
    const lsat_day = days[days.length - 1].toISOString().substr(0,10)
    if (SubjectStore.onlineDaysMonthLength === days_length && !taken) {
      if (today === lsat_day) {
        return 0 // 可領取
      } else {
        return 1 // 持續中
      }
    } else {
      return 2 // 未達成
    }      
  }

  checkEverydayWeekBonus = () => {
    return 2 // 未達成
  }
/*
  takeEverydayMonthBonus = () => {
    const time_now = new Date()
    const today = Moment().format().substr(0,10)
    const days = this.getDaysInMonth(time_now.getMonth(),time_now.getFullYear())
    const days_length = days.length
    const lsat_day = days[days_length - 1].toISOString().substr(0,10)
    if (SubjectStore.onlineDaysMonthLength === days_length && !taken) {
      if (today === lsat_day) {
        this.firebase.database().ref(`users/${this.SubjectStore.uid}/bonus`).set(this.SubjectStore.bonus + 200)
        this.firebase.database().ref('users/' + this.SubjectStore.uid + '/task6').set(true)
        this.SubjectStore.addBonus(200)
        this.SubjectStore.setTask6(true)
        Alert.alert( 
          '管理員提示', '領取成功', [ 
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
*/
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
    //case '6':
      //this.takeEverydayWeekBonus(taken)
    //case '7':
      //this.takeEverydayMonthBonus(taken)
      //break
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
    case '6':
      return this.checkEverydayWeekBonus(taken)
    case '7':
      return this.checkEverydayMonthBonus(taken)
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

  getDaysInMonth = (month, year) => {
    let date = new Date(year, month, 1);
    let days = []
    while (date.getMonth() === month) {
      days.push(date)
      date.setDate(date.getDate() + 1)
      date = new Date(date)
    }
    return days
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