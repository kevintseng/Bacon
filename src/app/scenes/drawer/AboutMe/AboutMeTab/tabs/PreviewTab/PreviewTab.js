import React, { Component } from 'react'
import { View } from 'react-native'
import { observer, inject } from 'mobx-react'
import BaconCard from 'react-native-bacon-card'

const styles = {
  view: {
    flex: 1
  }
}

@inject('SubjectStore') @observer
export default class PreviewTab extends Component {

  constructor(props) {
    super(props)
    this.SubjectStore = this.props.SubjectStore
  }

  render() {
    return(
      <View style={styles.view}>  
        <BaconCard
          album={this.SubjectStore.getAlbum}
          displayName={ this.SubjectStore.nickname }
          bio={ this.SubjectStore.bio }
          age={ this.SubjectStore.age }
          address={ this.SubjectStore.address }
          langs={ this.SubjectStore.languagesToString }
          hobbies={ this.SubjectStore.hobbiesToFlatList }
          additionHeight={50}
        />
      </View>
    )
  }
}
