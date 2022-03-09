import React, {Component, useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import LogedDrawer from './src/components/drawer/loged.drawer';
import ErrorNotify from './src/components/errorNotify.component';
import NoLogedStack from './src/components/stack/noLoged.stack';
import API from './src/libs/API';
import LoadingComponent from './src/components/loading.component';
import {MainStyles} from './src/assets/mainstyles';
import {
  getLocalSettings,
  getLocalStayLoged,
  removeLocalData,
  setLocalUserData,
} from './src/services/app.local.storage';

const App = () => {
  const currentHours = new Date().getHours();
  const [loged, setLoged] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const [errorProblem, setErrorProblem] = useState(null);
  const [loading, setLoading] = useState(false);
  const [colorMode, setColorMode] = useState(MainStyles.clearMode);
  const autoColorMode =
    currentHours > 7 && currentHours < 20
      ? MainStyles.clearMode
      : MainStyles.darkMode;
  //mount
  useEffect(() => {
    const isLoged = async () => {
      let localLoged = await getLocalStayLoged();
      setLoged(localLoged.value);
    };
    isLoged();
    checkUserSettings();
  }, []); //[to mount]
  const checkUserSettings = async () => {
    try {
      setLoading(true);
      let userSettings = await getLocalSettings();

      //Activarlo solo si el usuario lo tiene diferente al automatico
      let autoColorIsDark = autoColorMode.backgroundColor === 'black';
      //Si es de noche siempre activarlo
      if (autoColorIsDark) {
        setColorMode(MainStyles.darkMode);
      }
      if (userSettings && Object.keys(userSettings).length > 0) {
        Object.keys(userSettings).forEach(key => {
          switch (key) {
            case 'darkMode':
              console.log('autoColorIsDark', autoColorIsDark);
              console.log(
                'userSettings.darkMode.value',
                userSettings.darkMode.value,
              );
              //Si es de noche siempre activarlo
              if (autoColorIsDark) {
                if (userSettings.darkMode.value !== autoColorIsDark) {
                  let colors =
                    userSettings.darkMode.value === false
                      ? MainStyles.clearMode
                      : MainStyles.darkMode;
                  setColorMode(colors);
                } else {
                  setColorMode(MainStyles.clearMode);
                }
              }
              break;
            default:
              break;
          }
        });
      }
      setLoading(false);
    } catch (error) {
      typeof error === 'string'
        ? handleErrorMessage(error, 'warning')
        : handleErrorMessage(error, 'red');
      setLoading(false);
      console.log('error en App::checkUserSettings', error);
    }
  };
  const handleErrorMessage = (msg, problem) => {
    setErrorMessage(msg);
    setErrorProblem(problem);
    setTimeout(() => {
      setErrorMessage(null);
    }, 3000);
  };
  const handleLogedStatus = async (statusBool, data) => {
    setLoading(true);
    //Si fue login guardar data
    if (statusBool === true) {
      setLocalUserData(data);
    }
    //Si fue logout cerrar sesion en el servidor
    else if (statusBool === false) {
      try {
        await API.instance.logout();
        await removeLocalData();
      } catch (error) {
        if (typeof error === 'string') {
          handleErrorMessage(error);
          setLoading(false);
        }
        console.log('Error deslogear', error);
      }
    }
    setLoged(statusBool);
    setTimeout(() => {
      setLoading(false);
    }, 100);
  };
  return (
    <NavigationContainer>
      {!loged ? (
        <NoLogedStack
          handleErrorMessage={handleErrorMessage}
          handleLogedStatus={handleLogedStatus}
          handleLoading={setLoading}
          colorMode={colorMode}
        />
      ) : (
        <LogedDrawer
          handleErrorMessage={handleErrorMessage}
          handleLogedStatus={handleLogedStatus}
          handleLoading={setLoading}
          handleSettingsChange={checkUserSettings}
          colorMode={colorMode}
          autoColorIsDark={autoColorMode.backgroundColor === 'black'}
        />
      )}
      <ErrorNotify message={errorMessage} problem={errorProblem} />
      <LoadingComponent loading={loading} />
    </NavigationContainer>
  );
};
export default App;
