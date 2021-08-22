import 'react-native-gesture-handler';
import React, {Component} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import LogedDrawer from './src/components/logedDrawer.component';
import ErrorNotify from './src/components/errorNotify.component';
import NoLogedStack from './src/components/noLoged.stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import API from './src/libs/API';
import LoadingComponent from './src/components/loading.component';
import {MainStyles} from './src/assets/mainstyles';

export default class App extends Component {
  currentHours = new Date().getHours();
  state = {
    loged: false,
    errorMessage: null,
    errorProblem: null,
    loading: false,
    autoColorMode:
      this.currentHours > 7 && this.currentHours < 20
        ? MainStyles.clearMode
        : MainStyles.darkMode,
    colorMode:
      this.currentHours > 7 && this.currentHours < 20
        ? MainStyles.clearMode
        : MainStyles.darkMode,
  };
  componentDidMount = async () => {
    await this.isLoged();
    await this.checkUserSettings();
  };
  isLoged = async () => {
    let localLoged = await AsyncStorage.getItem('loged');
    localLoged === 'true' ? (localLoged = true) : (localLoged = false);
    this.setState({...this.state, loged: localLoged});
  };
  checkUserSettings = async () => {
    try {
      this.handleLoading(true);
      let userSettings = JSON.parse(await AsyncStorage.getItem('settings'));

      if (userSettings && Object.keys(userSettings).length > 0) {
        Object.keys(userSettings).forEach(key => {
          switch (key) {
            case 'darkMode':
              //Activarlo solo si el usuario lo tiene diferente al automatico
              let autoColorIsDark =
                this.state.autoColorMode.backgroundColor === 'black';
              console.log('autoColorIsDark', autoColorIsDark);
              console.log(
                'userSettings.darkMode.value',
                userSettings.darkMode.value,
              );
              //Si es de noche siempre activarlo
              if (autoColorIsDark) {
                this.setState({colorMode: MainStyles.darkMode});
              } else {
                if (userSettings.darkMode.value !== autoColorIsDark) {
                  let colors =
                    userSettings.darkMode.value === false
                      ? MainStyles.clearMode
                      : MainStyles.darkMode;
                  this.setState({colorMode: colors});
                } else {
                  this.setState({colorMode: MainStyles.clearMode});
                }
              }
              break;
            default:
              break;
          }
        });
      }
      this.handleLoading(false);
    } catch (error) {
      typeof error === 'string'
        ? this.handleErrorMessage(error, 'warning')
        : this.handleErrorMessage(error, 'red');
      this.handleLoading(false);
      console.log('error en App::checkUserSettings', error);
    }
  };
  handleErrorMessage = (msg, problem) => {
    this.setState({errorMessage: msg, errorProblem: problem}, () => {
      setTimeout(() => {
        this.setState({errorMessage: null});
      }, 3000);
    });
  };
  handleLoading = value => {
    this.setState({...this.state, loading: value});
  };
  handleLogedStatus = async (statusBool, data) => {
    this.handleLoading(true);
    //Si fue login guardar data
    if (statusBool === true) {
      await AsyncStorage.setItem(
        'userData',
        data ? JSON.stringify(data) : null,
      );
    }
    //Si fue logout cerrar sesion en el servidor
    else if (statusBool === false) {
      try {
        await API.instance.logout();
        await AsyncStorage.multiRemove(['userData', 'loged', 'stayLoged']);
      } catch (error) {
        if (typeof error === 'string') {
          this.handleErrorMessage(error);
          this.handleLoading(false);
        }
        console.log('Error deslogear', error);
      }
    }
    this.setState(
      {
        loged: statusBool,
      },
      function () {
        this.handleLoading(false);
      },
    );
  };
  render() {
    this.currentHours = new Date().getHours();
    const {loged} = this.state;
    return (
      <NavigationContainer>
        {!loged ? (
          <NoLogedStack
            handleErrorMessage={this.handleErrorMessage}
            handleLogedStatus={this.handleLogedStatus}
            handleLoading={this.handleLoading}
            colorMode={this.state.colorMode}
          />
        ) : (
          <LogedDrawer
            handleErrorMessage={this.handleErrorMessage}
            handleLogedStatus={this.handleLogedStatus}
            handleLoading={this.handleLoading}
            handleSettingsChange={this.checkUserSettings}
            colorMode={this.state.colorMode}
            autoColorIsDark={
              this.state.autoColorMode.backgroundColor === 'black'
            }
          />
        )}
        <ErrorNotify
          message={this.state.errorMessage}
          problem={this.state.errorProblem}
        />
        <LoadingComponent loading={this.state.loading} />
      </NavigationContainer>
    );
  }
}
