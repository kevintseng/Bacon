import Storage from 'react-native-storage'
import { AppState, AsyncStorage } from 'react-native'
   
   const localdb = new Storage({
      size: 1000, // maximum capacity, default 1000
      storageBackend: AsyncStorage,
      defaultExpires: 1000 * 60, // 24 小時
      enableCache: true,
      sync : {
        preyListHistory(params){
          console.log(params)
        }
      }     
    })

export default localdb