import React, {Component} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Dashboard from './dashboard.component';

const Stack = createStackNavigator();

export default class DashboardStack extends Component {
  render() {
    return (
      <Stack.Navigator initialRouteName="Screen_1">
        <Stack.Screen
          name="Screen_1"
          options={({route, navigation}) => ({
            title: this.props.userData
              ? `Dashboard de ${this.props.userData.FirstName}`
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
