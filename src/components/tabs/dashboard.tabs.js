import React from 'react';
import {Image, StyleSheet} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import DashboardStack from '../stack/dashboard.stack';
import MapaGrafico from '../mapaGrafico.component';

const Tabs = createBottomTabNavigator();
const DashboardTabs = ({handleErrorMessage, handleLoading, colorMode}) => {
  return (
    <Tabs.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: colorMode.backgroundColor,
          ...styles.tabStyle,
        },
      }}>
      <Tabs.Screen
        name="resumenDashboard"
        options={{
          title: 'Resumen',
          tabBarIcon: ({size, color}) => (
            <Image
              style={{tintColor: color, width: size, height: size}}
              source={require('../../assets/img/tab.png')}
            />
          ),
        }}>
        {() => (
          <DashboardStack
            handleErrorMessage={handleErrorMessage}
            handleLoading={handleLoading}
            colorMode={colorMode}
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
              source={require('../../assets/img/tab.png')}
            />
          ),
        }}>
        {() => (
          <MapaGrafico
            handleErrorMessage={handleErrorMessage}
            handleLoading={handleLoading}
            colorMode={colorMode}
          />
        )}
      </Tabs.Screen>
    </Tabs.Navigator>
  );
};
export default DashboardTabs;

const styles = new StyleSheet.create({
  tabStyle: {borderTopWidth: 0.5},
});
