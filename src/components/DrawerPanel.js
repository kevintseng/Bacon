import React, { Component, PropTypes } from 'react';
import Drawer from 'react-native-drawer';
import { Actions, DefaultRenderer } from 'react-native-router-flux';
import { observer } from 'mobx-react/native';
import Reactotron from 'reactotron-react-native';
import { autorun } from 'mobx';
import SideBar from './SideBar';

@observer
export default class DrawerPanel extends Component {
  static propTypes = {
    fire: PropTypes.object,
    store: PropTypes.object,
    navigationState: PropTypes.object,
    onNavigate: PropTypes.func,
  }

  constructor(props) {
    super(props);
    this.store = this.props.store;
    this.fs = this.props.fire;
  }

  render() {
    const state = this.props.navigationState;
    const children = state.children;
    return (
      <Drawer
        ref='navigation'
        onOpen={() => Actions.refresh({ key: state.key, open: true })}
        onClose={() => Actions.refresh({ key: state.key, open: false })}
        open={state.open}
        type="displace"
        content={<SideBar fire={this.fs} store={this.store} />}
        tapToClose
        openDrawerOffset={0.2}
        panCloseMask={0.2}
        negotiatePan
        side={'left'}
        tweenHandler={(ratio) => ({
         main: { opacity: Math.max(0.54, 1 - ratio) }
        })}
      >
        <DefaultRenderer navigationState={children[0]} onNavigate={this.props.onNavigate} />
      </Drawer>
    );
  }
}
