import Moment from "moment"

export function getAge(birthday) {
  if(!birthday) {
    return -1;
  }
  const age = Moment().diff(birthday, 'years');
  return age;
}

export function calculateAge(birthday) {
  const ageDifMs = Date.now() - new Date(birthday).getTime()
  const ageDate = new Date(ageDifMs)
  return Math.abs(ageDate.getUTCFullYear() - 1970)
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

