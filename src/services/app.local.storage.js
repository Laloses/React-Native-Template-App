import AsyncStorage from '@react-native-async-storage/async-storage';

//<<<<<<<<<< LocalData for app functionality <<<<<<<<<
export const setLocalUserData = async data => {
  return await AsyncStorage.setItem(
    'userData',
    data ? JSON.stringify(data) : null,
  );
};

export const getLocalUserData = async () => {
  return JSON.parse(await AsyncStorage.getItem('userData'));
};

//Stayloged
export const setLocalStayLoged = async (user, pass) => {
  return await AsyncStorage.setItem(
    'stayLoged',
    JSON.stringify({
      value: true,
      user: user,
      pass: pass,
    }),
  );
};

export const getLocalStayLoged = async () => {
  return await JSON.parse(await AsyncStorage.getItem('stayLoged'));
};

export const removeLocalData = async () => {
  return await AsyncStorage.multiRemove(['userData', 'loged', 'stayLoged']);
};
//>>>>>>>>>>> LocalData for app functionality >>>>>>>>>>>>>

//<<<<<<<<<<<<<< Local settigs defined by the user <<<<<<<<<<
export const setLocalSettings = async data => {
  return await AsyncStorage.setItem('settings', JSON.stringify(data));
};

export const getLocalSettings = async () => {
  return JSON.parse(await AsyncStorage.getItem('settings'));
};
//>>>>>>>>>>>>> Local settigs defined by the user >>>>>>>>>>>>>
