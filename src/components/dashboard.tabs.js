import React, {Component} from 'react';
import {Image, StyleSheet} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import DashboardStack from './dashboard.stack';
import MapaGrafico from './mapaGrafico.component';

const Tabs = createBottomTabNavigator();
export default class DashboardTabs extends Component {
  render() {
    return (
      <Tabs.Navigator
        screenOptions={{headerShown: false, tabBarStyle: styles.tabStyle}}>
        <Tabs.Screen
          name="resumenDashboard"
          options={{
            title: 'Resumen',
            tabBarIcon: ({size, color}) => (
              <Image
                style={{tintColor: color, width: size, height: size}}
                source={require('../assets/img/tab.png')}
              />
            ),
          }}>
          {() => (
            <DashboardStack
              handleErrorMessage={this.props.handleErrorMessage}
              handleLoading={this.props.handleLoading}
            />
          )}
        </Tabs.Screen>

        <Tabs.Screen
          name="mapaGrafico"
          options={{
            title: 'Mapa',
            tabBarIcon: ({size, color}) => (
              <Image
                style={{tintColor: color, width: size, height: size}}
                source={require('../assets/img/tab.png')}
              />
            ),
          }}>
          {() => (
            <MapaGrafico
              handleErrorMessage={this.props.handleErrorMessage}
              handleLoading={this.props.handleLoading}
            />
          )}
        </Tabs.Screen>
      </Tabs.Navigator>
    );
  }
}

const styles = new StyleSheet.create({
  tabStyle: {borderTopWidth: 1},
});
