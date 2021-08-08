import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {Component} from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import {MainStyles} from '../assets/mainstyles';
import API from '../libs/API';
//import API from '../libs/API';

export default class Dashboard extends Component {
  state = {
    dashboardData: null,
  };
  userData = null;
  componentDidMount = async () => {
    await this.getUserData();
    await this.getDashboardData();
  };
  getUserData = async () => {
    this.props.handleLoading(true);
    this.userData = JSON.parse(await AsyncStorage.getItem('userData'));
    this.props.handleLoading(false);
  };
  getDashboardData = async () => {
    try {
      this.props.handleLoading(true);
      this.setState(
        {
          ...this.state,
          dashboardData: await API.instance.dashboard(),
        },
        () => this.props.handleLoading(false),
      );
    } catch (error) {
      console.log('Error dashboard data', error);
      alert('Error dashboard data', error);
    }
  };
  hanldePassInput = input => {
    this.state.pass = input;
    //Para moverse entre screens
    this.props.navigation?.replace('Screen_2', {
      userData: {...this.userData},
      nameScreen: `Screen de ${this.userData.FirstName}`,
    });
    //ejemplo î
  };
  render() {
    if (this.state.dashboardData === null) {
      return null;
    } else {
      console.log('props dashboardComp: ', this.props);
      const dashboardData = this.state.dashboardData;
      const dashboardDataArray = Object.entries(dashboardData).map(item => {
        if (item[1] == null) {
          item[1] = 'null';
        }
        return item;
      });
      return (
        <View style={styles.container}>
          <FlatList
            data={dashboardDataArray}
            renderItem={({item}) => (
              <Text key={'dashboardData' + item[0]}>
                {item[0] + ' : ' + item[1]}
              </Text>
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
