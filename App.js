import 'react-native-gesture-handler';
import React, {Component} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import LogedDrawer from './src/components/logedDrawer.component';
import ErrorNotify from './src/components/errorNotify.component';
import NoLogedStack from './src/components/noLoged.stack';

export default class App extends Component {
  state = {
    loged: false,
    userData: null,
    errorMessage: null,
  };
  handleErrorMessage = msg => {
    this.setState({...this.state, errorMessage: msg});
  };
  handleLogedStatus = (statusBool, data) => {
    this.setState({
      ...this.state,
      loged: statusBool,
      userData: data ? data : null,
    });
  };
  render() {
    const {loged} = this.state;
    return (
      <NavigationContainer>
        {loged ? (
          <NoLogedStack
            handleErrorMessage={this.handleErrorMessage}
            handleLogedStatus={this.handleLogedStatus}
          />
        ) : (
          <LogedDrawer
            handleErrorMessage={this.handleErrorMessage}
            handleLogedStatus={this.handleLogedStatus}
            userData={this.state.userData}
          />
        )}
        <ErrorNotify message={this.state.errorMessage} />
      </NavigationContainer>
    );
  }
}
