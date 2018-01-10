import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { Actions } from 'react-native-router-flux'

import BaconRadar from '../../../../views/BaconRadar'
 
@inject('SubjectStore','firebase') @observer
export default class RadarContainer extends Component {

  constructor(props) {
    super(props)
    this.SubjectStore = this.props.SubjectStore
    this.firebase = this.props.firebase
  }

  componentWillMount() {
    // 把所有的直拉出來做PR Rank
    /*
    this.fetchRadar = this.firebase.database().ref('users/' + this.SubjectStore.uid)
    this.fetchRadar.once('value').then(snap => {
      if (snap.val()) {
        const popularity = parseInt(snap.val().popularityNum) / parseInt(snap.val().popularityDen)
        const favorability = parseInt(snap.val().favorabilityNum) / parseInt(snap.val().favorabilityDen)
        const friendliness = 0
        const activityness = 0
        if (isNaN(popularity)) {
          popularity = 0
        }
        if (isNaN(favorability)) {
          favorability = 0
        }
        this.SubjectStore.setRadar([{
          "熱門度":  popularity,
          "好感度":  favorability,
          "友好度":  friendliness,
          "活耀度":  activityness,
          "魅力值":  popularity * 2 + favorability * 3 + friendliness * 6
        }])
      } else {
        alert('錯誤')
      }
    })
    */
  }

  render() {
    return(
      <BaconRadar
        activitynessPR={0.53}
        friendlinessPR={0.67}
        favorabilityPR={0.77}
        popularityPR={0.91}
        attractivePR={0.82}
        //data={this.SubjectStore.radar}
      />
    )
  }
}

/*


//const activityness = 0.53
//const friendliness = 0.67
//const favorability = 0.77
//const popularity = 0.91
//const attractive = 0.82

    */