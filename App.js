import 'react-native-gesture-handler';
import React, {Component} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import LogedDrawer from './src/components/logedDrawer.component';
import ErrorNotify from './src/components/errorNotify.component';
import NoLogedStack from './src/components/noLoged.stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import API from './src/libs/API';
import LoadingComponent from './src/components/loading.component';

export default class App extends Component {
  state = {
    loged: false,
    errorMessage: null,
    loading: false,
  };
  componentDidMount = async () => {
    this.isLoged();
  };
  isLoged = async () => {
    let localLoged = await AsyncStorage.getItem('loged');
    localLoged === 'true' ? (localLoged = true) : (localLoged = false);
    this.setState({...this.state, loged: localLoged});
  };
  handleErrorMessage = msg => {
    this.setState({...this.state, errorMessage: msg});
  };
  handleLoading = value => {
    this.setState({...this.state, loading: value});
  };
  handleLogedStatus = (statusBool, data) => {
    this.handleLoading(true);
    this.setState(
      {
        ...this.state,
        loged: statusBool,
      },
      async () => {
        //Si fue login guardar data
        if (statusBool) {
          await AsyncStorage.setItem(
            'userData',
            data ? JSON.stringify(data) : null,
          );
        }
        //Si fue logout cerrar sesion en el servidor
        else if (!statusBool) {
          try {
            await API.instance.logout();
            await AsyncStorage.multiRemove(['userData', 'loged', 'stayLoged']);
          } catch (error) {
            console.log('Error deslogear', error);
            alert('Error deslogear', error);
          }
        }
        this.handleLoading(false);
      },
    );
  };
  render() {
    const {loged} = this.state;
    return (
      <NavigationContainer>
        {!loged ? (
          <NoLogedStack
            handleErrorMessage={this.handleErrorMessage}
            handleLogedStatus={this.handleLogedStatus}
            handleLoading={this.handleLoading}
          />
        ) : (
          <LogedDrawer
            handleErrorMessage={this.handleErrorMessage}
            handleLogedStatus={this.handleLogedStatus}
            handleLoading={this.handleLoading}
          />
        )}
        <ErrorNotify message={this.state.errorMessage} />
        <LoadingComponent loading={this.state.loading} />
      </NavigationContainer>
    );
  }
}
