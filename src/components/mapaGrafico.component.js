import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';
import API from '../libs/API';
import AwesomeHierarchyGraph from 'react-native-d3-tree-graph';

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
          ...this.state,
          mapData: mapData,
          rootNode: {
            name: '',
            id: 1,
            hidden: true,
            children: [
              {
                name: 'Q',
                id: 16,
                no_parent: true,
              },
            ],
          },
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
      return (
        <View style={styles.container}>
          <AwesomeHierarchyGraph
            root={this.state.rootNode}
            siblings={this.state.mapData}
          />
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
