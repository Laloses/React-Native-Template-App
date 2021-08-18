import React, {Component} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Dashboard from './dashboard.component';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PressableDrawer from './pressableDrawer.component';
import {StyleSheet} from 'react-native';

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
      <Stack.Navigator
        initialRouteName="Screen_1"
        screenOptions={{
          headerStyle: [{
            backgroundColor: this.props.colorMode.backgroundColor, 
            ...styles.headerStack
          }],
          headerTintColor: this.props.colorMode.color,
          headerTitleAlign: 'center',
        }}>
        <Stack.Screen
          name="Screen_1"
          options={({route, navigation}) => ({
            title: this.userData
              ? `Dashboard de ${this.userData.FirstName}`
              : 'Dashboard',
            headerLeft: () => <PressableDrawer navigation={navigation} colorMode={this.props.colorMode} />,
          })}>
          {navigation => (
            <Dashboard
              navigation={navigation.navigation}
              route={navigation.route}
              handleErrorMessage={this.props.handleErrorMessage}
              handleLoading={this.props.handleLoading}
              colorMode={this.props.colorMode}
            />
          )}
        </Stack.Screen>
      </Stack.Navigator>
    );
  }
}

const styles = StyleSheet.create({
  headerStack: {
    borderBottomWidth: 1,
  },
});
