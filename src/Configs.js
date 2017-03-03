// Firebase production configs
const FirebaseConfig = { //eslint-disable-line
  debug: true,
  apiKey: "AIzaSyBYTZDmeWcR9MEdiUTdgZGb80nDWYLnCSk",
  authDomain: "kjyl-150415.firebaseapp.com",
  databaseURL: "https://kjyl-150415.firebaseio.com",
  storageBucket: "kjyl-150415.appspot.com",
  messagingSenderId: "725652377518",
  googleAppId: '1:725652377518:ios:bbdec425ca56934d',
  APIKey: 'AIzaSyBm9fcnGrmdAZo26_PJH5ieA0paXpLpYHY',
  GCMSenderID: '725652377518',
};

  // Firebase development configs
const dev_FirebaseConfig = { //eslint-disable-line
  debug: true,
  apiKey: "AIzaSyBPCpEc-v-mSf_riAUFd79xDzVgXXg7gN0",
  authDomain: "rainyday-7fa26.firebaseapp.com",
  databaseURL: "https://rainyday-7fa26.firebaseio.com",
  storageBucket: "rainyday-7fa26.appspot.com",
  messagingSenderId: "309937705062"
};

const SIDEBAR_LINKS = [
  {
    title: '邂逅',
    icon: 'face',
    key: 'meetcute',
  },
  {
    title: '巧遇',
    icon: 'explore',
    key: 'nearby',
  },
  {
    title: '訊息',
    icon: 'message',
    key: 'messages',
    new: 1,
  },
  {
    title: '喜歡您',
    icon: 'star',
    key: 'likesyou',
    new: 2,
  },
  {
    title: '訪客',
    icon: 'visibility',
    key: 'visitors',
    new: 5,
  },
  {
    title: '收藏',
    icon: 'favorite',
    key: 'favorites'
  },
  {
    title: '設定',
    icon: 'settings',
    key: 'settings',
  }
];

export { FirebaseConfig, dev_FirebaseConfig, SIDEBAR_LINKS };
