import React from 'react'
import { observer, inject } from 'mobx-react/native'
//import { Radar } from 'react-native-pathjs-charts'
import { Text, View, Dimensions } from 'react-native'

const { width, height } = Dimensions.get('window');

const styles = {
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 20,
    width,
    height,
  }
};

const Report = inject("SubjectStore")(observer(({ SubjectStore }) => {
/*
    const defaultData = { charm:50, popularity:50, likeness:50, friendliness:50, activity:50 };
    const { charm, popularity, likeness, friendliness, activity } = SubjectStore.user.analysis ? SubjectStore.analysis : defaultData;
    const data = [{
      "魅力值": charm,
      "熱門度": popularity,
      "好感度": likeness,
      "友好度": friendliness,
      "活耀度": activity,
    }];

    const options = {
      width,
      height: 300,
      r: 130,
      max: 150,
      fill: "#2980B9",
      stroke: "#2980B9",
      animate: {
        type: 'oneByOne',
        duration: 200
      },
      label: {
        fontFamily: 'Arial',
        fontSize: 14,
        fontWeight: true,
        fill: '#34495E'
      }
    };
*/
  return(
    <View style={styles.container}>
       <Text>react-native-svg crash</Text>
    </View>
  );
}))

export default Report

//<Radar data={data} options={options} />
