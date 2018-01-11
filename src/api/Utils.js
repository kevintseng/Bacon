import Moment from "moment"
import geolib from "geolib"

export function getAge(birthday) {
  if (!birthday) {
    return -1;
  }
  const age = Moment().diff(birthday, 'years');
  return age;
}

export function translateChatStatus(status) {
  switch (status) {
    case 0:
      return ""
    case 1:
      return "放空中"
    case 2:
      return "忙碌中"
    case 3:
      return "低潮中"
    default:
      return status
  }
}

export function calculateAge(birthday) {
  const ageDifMs = Date.now() - new Date(birthday).getTime()
  const ageDate = new Date(ageDifMs)
  const age = Math.abs(ageDate.getUTCFullYear() - 1970)
  if (isNaN(age)){
    return 99
  } else {
    return age
  }
}

export function emailFormatChecker(email) {
  if(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)){
    return true;
  }
  return false;
}

export function presenceMonitor(user, fb) {
  const timestamp = Math.floor(Date.now() / 1000);

  fb.presence.on(user.uid)
    .setOnline()
    .onConnect(ref => {
      ref.set({
        online: true,
        lastOnline: timestamp,
        location: 'taipei'
      });
      console.log('Connected');
      ref.onDisconnect(ref=>{
        ref.set({
          online: false,
          location: null,
          lastOnline: timestamp,
        })
      });
    });
}

export function getDistance(latitude_A,longitude_A,latitude_B,longitude_B) {
  if (latitude_B && longitude_B && latitude_A && longitude_A) {
      const distance = (geolib.getDistance(
        {latitude: latitude_B, longitude: longitude_B},
        {latitude: latitude_A, longitude: longitude_A}
    )/1000).toFixed(1)
    if (distance === '0.0') {
      return '0.1'
    } else {
      return distance
    }
  } else {
    return '?'
  }  
}

export function intersection(nums1, nums2) {
    let result = [];
    let store;  // 長array
    let ary;    // 短array

    // 判斷nums1,nums2長度
    if(nums1.length > nums2.length){
        store = nums1;
        ary = nums2;
    } else {
        store = nums2;
        ary = nums1;
    }

    // 只需需要跑較短的array就行
    for(let i = 0 ; i < ary.length ; i++){
        let value = ary[i];
        // 如果可以在長array中找到目前的值，而且在結果array中找不到，代表這個值是新的交集
        if(store.indexOf(value) >= 0 && result.indexOf(value) == -1){
            result.push(value);
        }
    }
    return result;
};

export function minTime(time_a,time_b) {
  if (time_a > time_b) {
    return time_a
  } else {
    return time_b
  }
}

export function sortedAlbum(album,avatar) {
    const key = getKeyByValue(album, avatar)
    delete album[key]
    album[0] = avatar
    return album || new Object
  }

export function getKeyByValue(object, value) {
  return Object.keys(object).find(key => object[key] === value)
}

export function showError(err) {
  console.log(err)
}
