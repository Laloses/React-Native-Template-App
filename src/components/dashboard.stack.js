import React, {Component} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Dashboard from './dashboard.component';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createStackNavigator();

export default class DashboardStack extends Component {
  userData = null;
  componentDidMount = async () => {
    await this.getUserData();
  };
  getUserData = async () => {
    this.userData = JSON.parse(await AsyncStorage.getItem('userData'));
  };
  render() {
    return (
      <Stack.Navigator initialRouteName="Screen_1">
        <Stack.Screen
          name="Screen_1"
          options={({route, navigation}) => ({
            title: this.userData
              ? `Dashboard de ${this.userData.FirstName}`
              : 'Dashboard',
            headerLeft: () =>
              this.props.getPressableDrawer
                ? this.props.getPressableDrawer(navigation)
                : null,
          })}>
          {navigation => (
            <Dashboard
              navigation={navigation.navigation}
              route={navigation.route}
              handleErrorMessage={this.props.handleErrorMessage}
            />
          )}
        </Stack.Screen>
      </Stack.Navigator>
    );
  }
}
