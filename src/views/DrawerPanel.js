import React, { Component } from 'react';
import Drawer from 'react-native-drawer';
import { Actions, DefaultRenderer } from 'react-native-router-flux';
import { observer } from 'mobx-react/native';
import SideBar from './SideBar';

@observer
export default class DrawerPanel extends Component {
  constructor(props) {
    super(props);
    this.store = this.props.store;
    this.firebase = this.props.fire;
    this.db = this.props.localdb
  }
  componentWillMount() {
    console.debug('Rendering DrawerPanel.');
  }

  componentDidMount() {
    console.debug('DrawerPanel rendered.');
  }

  render() {
    const state = this.props.navigationState;
    const children = state.children;

    return (
      <Drawer
        ref='navigation'
        type='displace'
        onOpen={() => Actions.refresh({ key: state.key, open: true })}
        onClose={() => Actions.refresh({ key: state.key, open: false })}
        open={state.open}
        content={<SideBar fire={this.firebase} store={this.store} localdb={this.db}/>}
        tapToClose
        openDrawerOffset={0.2}
        panCloseMask={0.2}
        negotiatePan
        tweenHandler={(ratio) => ({
         main: { opacity: Math.max(0.54, 1 - ratio) }
        })}
      >
        <DefaultRenderer navigationState={children[0]} onNavigate={this.props.onNavigate} />
      </Drawer>
    );
  }
}
