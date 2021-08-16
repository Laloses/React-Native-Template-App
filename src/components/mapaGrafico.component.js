import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {WebView} from 'react-native-webview';
import API from '../libs/API';
import TreeChart from '../assets/html/tree.chart'

export default class MapaGrafico extends Component {
  state = {
    mapData: null,
    rootNode: null,
    mapConfig: null
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
      let mapData = await API.instance.getMapUserData();
      this.setState(
        {
          mapData: mapData,
        },
        () => {
          this.props.handleLoading(false);
          console.log('state Mapa:', this.state);
        },
      );
    } catch (error) {
      typeof error === 'string'
        ? this.props.handleErrorMessage(error, 'warning')
        : this.props.handleErrorMessage(error, 'red');

      this.props.handleLoading(false);
      console.log('Error mapaGrafico:getmapData', error);
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
      return (
        <WebView
          originWhitelist={["*"]}
          source={{html: TreeChart(this.state.mapData)}}
          style={styles.container}
        />
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    height: '100%'
  },
});
