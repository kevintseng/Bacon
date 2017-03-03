import Reactotron from 'reactotron-react-native';

export function getAge(birthday) {
  if(!birthday) {
    return -1;
  } else {
    const now = new Date();
    let bday = birthday.split('-');

    let dobY = bday[0];
    let dobM = bday[1];
    let dobD = bday[2];

    let nowD = now.getDate();
    let nowM = now.getMonth() + 1; //jan = 0, so month+1
    let nowY = now.getFullYear();

    let age = nowY - dobY;
    let agemonth = nowM - dobM;

    if(agemonth < 0) {
      --age;
    } else if(agemonth == 0) {
      let ddif = nowD - dobD;
      if(ddif < 0) {
        --age;
      }
    }
    return age;
  }
}

export function checkEmail(email) {
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
      Reactotron.log('connected');
      ref.onDisconnect(ref=>{
        ref.set({
          online: false,
          location: null,
          lastOnline: timestamp,
        })
      });
    });
}
