import React from 'react'
import { TextInput, View, Text } from 'react-native'
import { Icon, Badge } from 'react-native-elements'
import { observer, inject } from 'mobx-react/native'
import DefaultInterests from '../../../../configs/DefaultInterests'

const styles = {
  Interests: {
    flex: 1,
    //backgroundColor: "#ff0000",
    justifyContent: "flex-start",
  },
  ShowTag: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    //justifyContent: 'flex-end',
    alignItems: 'flex-start'
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
    paddingTop: 15
  },
  PopularTag: {
    //flex: 1,
    flexWrap: 'wrap',
    flexDirection: 'row',
    alignItems: 'flex-start'
    //marginTop: 10
  }
}

const Interests = inject("SubjectStore")(observer(({SubjectStore}) => {

  const renderDefaultInterests = DefaultInterests.map((hobby) => (<Badge key={hobby}  onPress={ () => {SubjectStore.setHobby(hobby)} } containerStyle={{ backgroundColor: '#ffffff', borderWidth: 1, marginTop: 10, marginRight: 10}} textStyle={{ color: '#000000' }} value={hobby}/>))
    
  const renderInterests = SubjectStore.hobby.map((hobby) => (<Badge key={hobby} containerStyle={{ backgroundColor: '#ffffff', borderWidth: 1, marginTop: 10, marginRight: 10}} textStyle={{ color: '#000000' }} value={hobby}/>))

  return(
    <View style = { styles.Interests }> 

      <View style = { styles.ShowTag }>
        {renderInterests}
      </View>

      <View style = { styles.Edit }>
        <View style = { styles.Input }>
          <TextInput
            placeholder = "輸入興趣"
            onSubmitEditing = { () => { SubjectStore.setHobby() } }     
            onChangeText = { (text) => SubjectStore.updateHobbyInput(text) }
            value = { SubjectStore.hobbyInput }
          /> 
        </View>
        <View style = { styles.EditIcon }>
            <Icon name = "border-color" color = "#000000" size = { 20 } />  
        </View>
      </View>

      <View><Text style={{color: "red", marginTop: 10}}>熱門</Text></View>

      <View style = { styles.PopularTag }>
          {renderDefaultInterests}
      </View>

    </View>  
  )
}))

export default Interests