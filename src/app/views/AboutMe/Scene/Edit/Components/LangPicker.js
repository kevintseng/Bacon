import React, { Component } from 'react'
//import { View, TextInput } from 'react-native';
//import { FormLabel, FormValidationMessage, Icon} from 'react-native-elements';
import MultiSelect from 'react-native-multiple-select'


const styles = {
  textAreaStyle: {
    marginHorizontal: 10,
    fontSize: 14,
  },
  labelStyle: {
    flex: 0,
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingBottom: 3 ,
  },
  editViewStyle: {
    borderBottomWidth: 1.3,
    borderBottomColor: '#B0BEC5',
    marginBottom: 8,
    marginHorizontal: 10,
  },
  normalViewStyle: {
    marginBottom: 8,
    marginHorizontal: 10,
  },
};

export default class LangPicker extends Component {
  constructor() {
    super();
    this.state = {
      value: '',
      editMode: false,
    };
  }

  selectedItem = item => {
    console.log(item);
  }

  render() {
    let index = 0;
    const data = [
        { id: index++, section: true, name: '中文', langName: 'Chinese' },
        { id: index++, name: '英文', langName: 'English' },
        { id: index++, name: '日文', langName: '日本語' },
        { id: index++, name: '法文', langName: 'Français' },
        { id: index++, name: '朝鮮語', langName: '한국어' },
        { id: index++, name: '西班牙文', langName: 'Español' },
        { id: index++, name: '俄文', langName: 'Русский' },
        { id: index++, name: '泰語', langName: 'ไทย' },
        { id: index++, name: '越南語', langName: 'Tiếng Việt' },
        { id: index++, name: '印尼文', langName: 'Bahasa Indonesia' },
        { id: index++, name: '義大利文', langName: 'Italiano' },
        { id: index++, name: '葡萄牙文', langName: 'Português' },
        { id: index++, name: '丹麥語', langName: 'Dansk' },
        { id: index++, name: '荷蘭語', langName: 'Nederlands' },
        { id: index++, name: '瑞典語', langName: 'Svenska' },
        { id: index++, name: '德語', langName: 'Deutsch' },
        { id: index++, name: '馬來語', langName: 'Bahasa Melayu' },
        { id: index++, name: '瓦瑞瓦瑞語', langName: 'Winaray' },
        { id: index++, name: '宿霧語', langName: 'Sinugboanong Binisaya' },
        { id: index++, name: '波蘭語', langName: 'Polski' },
        { id: index++, name: '烏克蘭語', langName: 'Українська' },
        { id: index++, name: '阿拉伯語', langName: 'العربية' },
        { id: index++, name: '土耳其語', langName: 'Türkçe' },
        { id: index++, name: '波斯語	', langName: 'فارسی' },
        { id: index++, name: '希伯來語', langName: 'עברית' },
        { id: index++, name: '匈牙利語', langName: 'Magyar' },
        { id: index++, name: '芬蘭語', langName: 'Suomi' },
        { id: index++, name: '捷克語', langName: 'Čeština' },
      ];

    // const viewStyle = this.state.editMode ? styles.editViewStyle : styles.normalViewStyle;
    // const editModeIcon = <Icon name='mode-edit' size={16} color='#2962FF'/>;

    return (
      <MultiSelect
        items={data}
        uniqueKey="_id"
        selectedItemsChange={this.selectedItem}
        selectedItems={[]}
        selectText="Pick Items (Selected)"
        searchInputPlaceholderText="Search Items..."
        tagRemoveIconColor="#000FFF"
        tagBorderColor="#CCC"
        tagTextColor="#CCC"
        selectedItemTextColor="#CCC"
        selectedItemIconColor="#CCC"
        itemTextColor="#000"
        searchInputStyle={{ color: '#CCC'}}
      />
    );
  }
}
