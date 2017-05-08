'use strict'
import React from 'react';
import { View } from 'react-native';
import NewInfoArea from './NewInfoArea';     
import Introduce from '../../Edit/Introduce';
import Language from '../../Edit/Language';
import Interests from '../../Edit/Interests';

const InfoArea = (props) => {

  return(
    <View>
      { props.emailVerificationItem }
      { props.photoVerificationItem }
      <NewInfoArea content= {<Introduce/>} label={'introduce'} title={'自我介紹'} defaultValue={props.introduce} minHeight={60} maxLength={300} />
      <NewInfoArea content= {<Language/>} label={'langauge'} title={'語言能力'} defaultValue={props.langauge} minHeight={60} maxLength={300} />  
      <NewInfoArea content= {<Interests/>} label={'interests'} title={'興趣愛好'} defaultValue={props.interests} minHeight={60} maxLength={300} /> 
    </View>                           
    )
}

export { InfoArea }