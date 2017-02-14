import { observable, action, autorun } from 'mobx'; // eslint-disable-line
// import autobind from 'autobind-decorator';
import Reactotron from 'reactotron-react-native';

// @autobind
class AppStore {

}

autorun(() => {
  Reactotron.log({AppStore});
})

export default AppStore;
