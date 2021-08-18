import React, {Component} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import LoginComponent from './login.component';
import { MainStyles } from '../assets/mainstyles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StyleSheet } from 'react-native';

const Stack = createStackNavigator();

export default class NoLogedStack extends Component {
  render() {
    return (
      <Stack.Navigator initialRouteName="Screen_1" options={{
            headerStyle: [{backgroundColor : this.props.colorMode.backgroundColor}],
            headerTintColor: this.props.colorMode.color,
            headerTitleAlign: styles.headerStyle.textAlign
        }}>
        <Stack.Screen name="Screen_1" 
          options={{
            title: 'Iniciar sesión', 
            }}>
          {navigation => (
            <LoginComponent
              navigation={navigation.navigation}
              route={navigation.route}
              handleErrorMessage={this.props.handleErrorMessage}
              handleLogedStatus={this.props.handleLogedStatus}
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
  headerStyle: {
    textAlign: 'center'
  }
})
