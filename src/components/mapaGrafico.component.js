import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';
import API from '../libs/API';
import Tree from 'react-hierarchy-tree-graph';

const myTreeData = [
  {
    name: 'Top Level',
    attributes: {
      keyA: 'val A',
      keyB: 'val B',
      keyC: 'val C',
    },
    children: [
      {
        name: 'Level 2: A',
        attributes: {
          keyA: 'val A',
          keyB: 'val B',
          keyC: 'val C',
        },
      },
      {
        name: 'Level 2: B',
      },
    ],
  },
];
export default class MapaGrafico extends Component {
  state = {
    mapData: null,
    rootNode: null,
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
          mapData: mapData.siblings,
          rootNode: mapData.root,
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
        <View id="treeWrapper" style={styles.container}>
          <Tree data={myTreeData} />
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {width: '50em', height: '20em'},
});
