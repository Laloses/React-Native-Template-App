import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {Component} from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import {MainStyles} from '../assets/mainstyles';
import API from '../libs/API';

export default class MapaGrafico extends Component {
  state = {
    mapData: null,
  };
  userData = null;
  componentDidMount = async () => {
    await this.getUserData();
    await this.getmapData();
  };
  getUserData = async () => {
    this.props.handleLoading(true);
    this.userData = JSON.parse(await AsyncStorage.getItem('userData'));
    this.props.handleLoading(false);
  };
  getmapData = async () => {
    try {
      this.props.handleLoading(true);
      this.setState(
        {
          ...this.state,
          mapData: await API.instance.dashboard(),
        },
        () => this.props.handleLoading(false),
      );
    } catch (error) {
      typeof error === 'string'
        ? this.props.handleErrorMessage(error, 'warning')
        : this.props.handleErrorMessage(error, 'red');

      this.props.handleLoading(false);
      console.log('Error dashboard data', error);
    }
  };
  hanldePassInput = input => {
    this.state.pass = input;
    //Para moverse entre screens
    this.props.navigation?.replace('Screen_2', {
      userData: {...this.userData},
      nameScreen: `Screen de ${this.userData.FirstName}`,
    });
  };
  render() {
    if (this.state.mapData === null) {
      return null;
    } else {
      const mapData = this.state.mapData;
      const mapDataArray = Object.entries(mapData).map(item => {
        if (item[1] === null) {
          item[1] = 'null';
        }
        return item;
      });
      return (
        <View style={styles.container}>
          <FlatList
            data={mapDataArray}
            keyExtractor={item => 'mapData' + item[0]}
            renderItem={({item}) => (
              <Text>{`${item[0]} : ${JSON.stringify(item[1])} \n`}</Text>
            )}
          />
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    ...MainStyles.container,
  },
});
