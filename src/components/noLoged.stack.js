import React, {Component} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import LoginComponent from './login.component';

const Stack = createStackNavigator();

export default class NoLogedStack extends Component {
  render() {
    return (
      <Stack.Navigator initialRouteName="Screen_1">
        <Stack.Screen name="Screen_1" options={{title: 'Iniciar sesión'}}>
          {navigation => (
            <LoginComponent
              navigation={navigation.navigation}
              route={navigation.route}
              handleErrorMessage={this.props.handleErrorMessage}
              handleLogedStatus={this.props.handleLogedStatus}
              handleLoading={this.props.handleLoading}
            />
          )}
        </Stack.Screen>
      </Stack.Navigator>
    );
  }
}
