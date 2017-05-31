import React, { Component } from 'react'
import { View, Text, TextInput } from 'react-native'
import DatePicker from 'react-native-datepicker'
import { Actions } from 'react-native-router-flux'
import { observer, inject } from 'mobx-react/native'

const styles = {
  NickBirthday: {
    flex: 1
  },
  Birthday: {
    paddingTop: 5
  },
  DataPicker: {
    flexDirection: "row",
    paddingTop: 10
  },  
  dataPicker: {
    flex: 1
  }
}

const NickBirthday = inject("SubjectStore")(observer(({ SubjectStore }) => {
  
  //constructor(props) {
    //super(props)
    //this.state = { text : this.props.initcontent }
    //this.save = this.props._save
  //}

  //_save = () => {
  //  this.props.save(this.state.text)
  //  Actions.AboutMeShow({type: 'reset'})
  //}

  //componentWillMount = () => {
  //  Actions.refresh({title: "暱稱生日", rightTitle: "完成", onRight: this._save });
  //}  


    return(
      <View style = { styles.NickBirthday }>

        <View>
          <View>
            <Text>暱稱</Text> 
          </View>
          <View>
            <TextInput
              autoFocus
              placeholder = "輸入暱稱"
              onChangeText = { (text) => SubjectStore.setDisplayName(text) }
              value = { SubjectStore.displayName }
              //onEndEditing={(text) => {this.refs.body.focus()}}
            />
          </View>
        </View>

      </View>
    )
}))

export default NickBirthday