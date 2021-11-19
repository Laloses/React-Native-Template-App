import React, {Component, useEffect, useState} from 'react';
import {Image, StyleSheet, Switch, Text, View} from 'react-native';
import {MainStyles} from '../assets/mainstyles';
import {
  getLocalSettings,
  setLocalSettings,
} from '../services/app.local.storage';

const SettingsComponent = ({
  handleErrorMessage,
  handleLoading,
  handleSettingsChange,
  colorMode,
  autoColorIsDark,
}) => {
  const [darkMode, setDarkMode] = useState({value: false});
  //DidMount
  useEffect(() => {
    const getSettingsData = async () => {
      handleLoading(true);
      let localSettings = getLocalSettings();
      if (localSettings.darkMode) {
        setDarkMode(localSettings.darkMode);
      }
      handleLoading(false);
    };
    getSettingsData();
  }, []);
  const setSettingsData = async data => {
    handleLoading(true);
    setLocalSettings(data);
    handleLoading(false);
  };
  const handleSwitchDarkMode = async value => {
    setDarkMode({value: value});
    await setSettingsData({darkMode});
    await handleSettingsChange();
  };
  return (
    <View style={[styles.container, colorMode]}>
      <ItemSetting
        nameSetting={'Modo oscuro'}
        colorMode={colorMode}
        switchValue={darkMode.value}
        disableSetting={autoColorIsDark}
        handleSwitch={handleSwitchDarkMode}
        extraMessage={'Modo automático activado'}>
        <Image
          style={styles.icon}
          source={
            colorMode.backgroundColor === 'black'
              ? require('../assets/img/settingWhite.png')
              : require('../assets/img/setting.png')
          }
        />
      </ItemSetting>

      <ItemSetting
        nameSetting={'Otro Ajuste'}
        colorMode={colorMode}
        switchValue={false}
        disableSetting={true}
        handleSwitch={() => {}}
        extraMessage={'Mensaje explicativo'}>
        <Image
          style={styles.icon}
          source={
            colorMode.backgroundColor === 'black'
              ? require('../assets/img/settingWhite.png')
              : require('../assets/img/setting.png')
          }
        />
      </ItemSetting>
    </View>
  );
};
export default SettingsComponent;

const ItemSetting = ({
  children,
  nameSetting,
  colorMode,
  switchValue,
  disableSetting,
  handleSwitch,
  extraMessage,
}) => {
  return (
    <View>
      <View
        style={
          disableSetting
            ? [styles.item, styles.itemGrey]
            : [styles.item, colorMode]
        }>
        <View style={styles.leftItem}>
          {children}
          <Text
            style={
              disableSetting
                ? [colorMode, styles.textItem, styles.itemGrey]
                : [colorMode, styles.textItem]
            }>
            {nameSetting}
          </Text>
        </View>
        <Switch
          trackColor={{false: '#767577', true: '#81b0ff'}}
          ios_backgroundColor="#3e3e3e"
          onValueChange={handleSwitch}
          value={switchValue}
          disabled={disableSetting}
        />
      </View>
      <Text
        style={
          disableSetting ? [colorMode, styles.msgItem] : MainStyles.hidden
        }>
        {extraMessage}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...MainStyles.container,
    borderWidth: 0,
    borderRadius: 0,
    margin: 0,
  },
  item: {
    ...MainStyles.container,
    flex: 0,
    flexDirection: 'row',
    padding: 8,
    borderWidth: 1,
    justifyContent: 'space-between',
  },
  itemGrey: {
    borderColor: '#990000',
    color: 'grey',
    marginBottom: 0,
    borderBottomWidth: 0,
  },
  leftItem: {
    flex: 0,
    flexDirection: 'row',
    flexShrink: 1,
    flexGrow: 0,
  },
  textItem: {
    marginLeft: 5,
  },
  icon: {
    maxWidth: 20,
    maxHeight: 20,
  },
  msgItem: {
    marginTop: 0,
    width: '80%',
    backgroundColor: '#404040',
    color: 'white',
    textAlign: 'center',
    marginRight: 'auto',
    marginLeft: 'auto',
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
  },
});
