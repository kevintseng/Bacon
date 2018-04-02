import React, { Component } from 'react'
import { View, Text, FlatList, Alert } from 'react-native'
import { inject, observer } from 'mobx-react'
import { Actions } from 'react-native-router-flux'
import Moment from 'moment'
import BaconActivityIndicator from '../../../../../views/BaconActivityIndicator'
import TaskList from '../../../../../views/TaskList'

const styles = {
  view: {
    flex: 1
  }
}

@inject('firebase','SubjectStore') @observer 
export default class TaskTab extends Component {

  constructor(props) {
    super(props)
    this.firebase = this.props.firebase
    this.SubjectStore = this.props.SubjectStore
    this.state = {
      loading: true
    }
    //this.tasks = [  
    //  {key: 1, task: 'Email認證獎勵', bonus: '20點', taken: this.SubjectStore.task1},
    //  {key: 2, task: '上傳三張照片獎勵', bonus: '20點', taken: this.SubjectStore.task2},
    //  {key: 3, task: '完成自我介紹獎勵', bonus: '20點', taken: this.SubjectStore.task3},
    //  {key: 4, task: '完成興趣愛好獎勵', bonus: '20點', taken: this.SubjectStore.task4},
    //  {key: 5, task: '每日上線獎勵', bonus: '5點', taken: this.SubjectStore.task5}
    //]
  }

  componentWillMount() {
    //const time_now = new Date()
    //this.today = time_now.getFullYear() + '-' + (time_now.getMonth() + 1) + '-' + time_now.getDate()
  }

  componentDidMount() {
    this.firebase.database().ref('tasks/' + this.SubjectStore.uid).once('value',snap => {
      if (snap.val()) {
        this.SubjectStore.setTask1(snap.val().task1)
        this.SubjectStore.setTask2(snap.val().task2)
        this.SubjectStore.setTask3(snap.val().task3)
        this.SubjectStore.setTask4(snap.val().task4)
      }
        this.setState({
          loading: false
        })
    })
  }

  goToAboutMeTab = () => {
    //Actions.AboutMeTab({type: 'reset'})
  }

  checkEmailBonus = taken => {
    if (SubjectStore.emailVerified && !taken) {
      // 完成任務 並且沒領過 符合條件可領
      return 0 // 待領取
    } else {
      return 2 // 未達成
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

  checkIntroduceBonus = taken => {
    if (SubjectStore.bio && !taken) {
      // 完成任務 並且沒領過 符合條件可領
      return 0 // 可領取
    } else {
      return 2 // 未達成
    }     
  }

  checkHobitBonus = taken => {
    if (SubjectStore.hobbiesToFlatList.length > 0 && !taken) {
      // 完成任務 並且沒領過 符合條件可領
      return 0 // 待領取
    } else {
      return 2 // 未達成
    }     
  }

  checkEverydayBonus = taken => {
    /*
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
        return 0 // 待領取
      }
    })
    */
    return 1 // 未完成
  }

  checkEveryMonthBonus = taken => {
    /*
    const time_now = new Date()
    const today = Moment().format().substr(0,10)
    const days = this.getDaysInMonth(time_now.getMonth(),time_now.getFullYear())
    const days_length = time_now.getDate()
    const lsat_day = days[days.length - 1].toISOString().substr(0,10)
    if (SubjectStore.onlineDaysMonthLength === days_length && !taken) {
      if (today === lsat_day) {
        return 0 // 待領取
      } else {
        return 1 // 持續中
      }
    } else {
      return 2 // 未達成
    }  
    */
    return 1 // 未完成 
  }

  checkEveryWeekBonus = () => {
    return 1 // 未完成
  }

  takeEmailBonus = taken => {
    if (SubjectStore.emailVerified && !taken) {
      // 完成任務 並且沒領過
      this.firebase.database().ref(`users/${this.SubjectStore.uid}/bonus`).set(this.SubjectStore.bonus + 20)
      this.firebase.database().ref('tasks/' + this.SubjectStore.uid + '/task1').set(true)
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
      this.firebase.database().ref('tasks/' + this.SubjectStore.uid + '/task2').set(true)
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
      this.firebase.database().ref('tasks/' + this.SubjectStore.uid + '/task3').set(true)
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

  takeHobitBonus = taken => {
    if (SubjectStore.hobbiesToFlatList.length > 0 && !taken) {
      // 完成任務 並且沒領過
      this.firebase.database().ref(`users/${this.SubjectStore.uid}/bonus`).set(this.SubjectStore.bonus + 20)
      this.firebase.database().ref('tasks/' + this.SubjectStore.uid + '/task4').set(true)
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

  takeEverydayBonus = taken => {
    /*
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
    */
    // 
        Alert.alert( 
          '管理員提示', '領取失敗', [ 
            {text: '確認', onPress: () => { this.goToAboutMeTab() } }, 
          ], { cancelable: false } 
        )  
  }

  takeEveryWeekBonus = () => {
    //
        Alert.alert( 
          '管理員提示', '領取失敗', [ 
            {text: '確認', onPress: () => { this.goToAboutMeTab() } }, 
          ], { cancelable: false } 
        )
  }

  takeEveryMonthBonus = () => {
    //
        Alert.alert( 
          '管理員提示', '領取失敗', [ 
            {text: '確認', onPress: () => { this.goToAboutMeTab() } }, 
          ], { cancelable: false } 
        )
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
      return this.checkEveryWeekBonus(taken)
    case '7':
      return this.checkEveryMonthBonus(taken)
      //break
    default:
      alert('領取錯誤')
      console.log(key)
      break
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
    case '5':
      this.takeEverydayBonus(taken)
      break
    case '6':
      this.takeEveryWeekBonus(taken)
      break
    case '7':
      this.takeEveryMonthBonus(taken)
      break
    default:
      alert('領取錯誤')
      console.log(key)
      break
    }
  }

  bonusWarning = (key,task,bonus,taken) => {
    this.takeBonus(key,taken)
    //Alert.alert( 
    //  task, '確認領取Q點' + bonus + '點？', [ 
    //    {text: '確認', onPress: () => { this.takeBonus(key,taken) } }, 
    //    {text: '取消', onPress: () => console.log('Cancel Pressed'), style: 'cancel'}
    //  ], { cancelable: true } 
    //)
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

  filterTask = () => (this.SubjectStore.tasksToFlatList.filter(ele =>(this.conform(ele.key,ele.taken) !== 2)))
  
  render() {
    return(
      <View style={styles.view}>
        { this.state.loading ? <BaconActivityIndicator/> :
          <FlatList
            removeClippedSubviews
            data={ this.filterTask() }
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
        }
      </View>
    )
  }
}