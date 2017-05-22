import React from 'react';
import { View, Image, Text } from 'react-native'

const styles = {
    contentViewStyle: {
        // 主轴方向
        //flexDirection:'row',
        // 换行
        //flexWrap:'wrap'
        justifyContent: 'center',
        flexDirection: 'row',
        flexWrap: 'wrap'
    },

    itemStyle: {
        // 对齐方式
        alignItems:'center',
        justifyContent:'center',
        // 尺寸
        width:80,
        height:80,
        // 左边距
        //marginLeft:20,
        marginTop:20,
        margin: 10,
    },

    itemImageStyle: {
        // 尺寸
        width:80,
        height:80,
        // 间距
        marginBottom:5,
        borderRadius: 80/2,
    },

    online:{
      position: 'absolute',
      bottom: 15,
      right: 1,
      height: 15,
      width: 15,
      backgroundColor: '#46ec2c',
      //backgroundColor: '#e5e5e5',
      borderRadius: 15/2,
      borderStyle: 'solid',
      borderColor: '#ffffff',
      borderWidth: 2
    },

    offline:{
      position: 'absolute',
      bottom: 15,
      right: 1,
      height: 15,
      width: 15,
      //backgroundColor: '#46ec2c',
      backgroundColor: '#e5e5e5',
      borderRadius: 15/2,
      borderStyle: 'solid',
      borderColor: '#ffffff',
      borderWidth: 2
    }
}

const Cookie = () => {
  return(
    <View style={{alignItems: 'center', margin: 10}}>
      <View >
        <Image source={{uri:"https://scontent-tpe1-1.xx.fbcdn.net/v/t1.0-9/14523254_10205912479689697_9039309889239665813_n.jpg?oh=d5c8c264afd125e35eafd4627cac6cca&oe=597CD498"}} style={styles.itemImageStyle}/>
      </View>
      <View >
        <Text>test</Text>
      </View>
    </View>
  )
}

export { Cookie }