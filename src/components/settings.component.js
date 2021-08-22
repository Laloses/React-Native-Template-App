import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {Component} from 'react';
import {Image, StyleSheet, Switch, Text, View} from 'react-native';
import {MainStyles} from '../assets/mainstyles';

export default class SettingsComponent extends Component {
  state = {
    darkMode: {value: false},
  };
  componentDidMount = async () => {
    await this.getSettingsData();
  };
  getSettingsData = async () => {
    this.props.handleLoading(true);
    this.setState(JSON.parse(await AsyncStorage.getItem('settings')));
    this.props.handleLoading(false);
  };
  setSettingsData = async data => {
    this.props.handleLoading(true);
    await AsyncStorage.setItem('settings', JSON.stringify(data));
    this.props.handleLoading(false);
  };
  handleSwitchDarkMode = value => {
    this.setState(
      {
        darkMode: {value: value},
      },
      async () => {
        await this.setSettingsData(this.state);
        await this.props.handleSettingsChange();
      },
    );
  };
  render() {
    // console.log('props SettingsComponent', this.props);
    const darkModeValue = this.state.darkMode.value;
    return (
      <View style={[styles.container, this.props.colorMode]}>
        <ItemSetting
          nameSetting={'Modo oscuro'}
          colorMode={this.props.colorMode}
          switchValue={darkModeValue}
          disableSetting={this.props.autoColorIsDark}
          handleSwitch={this.handleSwitchDarkMode}
          extraMessage={'Modo automático activado'}>
          <Image
            style={styles.icon}
            source={
              this.props.colorMode.backgroundColor === 'black'
                ? require('../assets/img/settingWhite.png')
                : require('../assets/img/setting.png')
            }
          />
        </ItemSetting>

        <ItemSetting
          nameSetting={'Otro Ajuste'}
          colorMode={this.props.colorMode}
          switchValue={false}
          disableSetting={true}
          handleSwitch={() => {}}
          extraMessage={'Mensaje explicativo'}>
          <Image
            style={styles.icon}
            source={
              this.props.colorMode.backgroundColor === 'black'
                ? require('../assets/img/settingWhite.png')
                : require('../assets/img/setting.png')
            }
          />
        </ItemSetting>
      </View>
    );
  }
}

class ItemSetting extends Component {
  render() {
    return (
      <View>
        <View
          style={
            this.props.disableSetting
              ? [styles.item, styles.itemGrey]
              : [styles.item, this.props.colorMode]
          }>
          <View style={styles.leftItem}>
            {this.props.children}
            <Text
              style={
                this.props.disableSetting
                  ? [this.props.colorMode, styles.textItem, styles.itemGrey]
                  : [this.props.colorMode, styles.textItem]
              }>
              {this.props.nameSetting}
            </Text>
          </View>
          <Switch
            trackColor={{false: '#767577', true: '#81b0ff'}}
            ios_backgroundColor="#3e3e3e"
            onValueChange={this.props.handleSwitch}
            value={this.props.switchValue}
            disabled={this.props.disableSetting}
          />
        </View>
        <Text
          style={
            this.props.disableSetting
              ? [this.props.colorMode, styles.msgItem]
              : MainStyles.hidden
          }>
          {this.props.extraMessage}
        </Text>
      </View>
    );
  }
}

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
