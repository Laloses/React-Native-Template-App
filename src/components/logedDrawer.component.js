import React, {Component} from 'react';
import {Dimensions, Image, ScrollView, StyleSheet} from 'react-native';
import {
  createDrawerNavigator,
  DrawerItemList,
  DrawerItem,
  DrawerContentScrollView,
} from '@react-navigation/drawer';
import SettingsComponent from './settings.component';
import PressableProfile from './pressableProfile.component';
import DashboardTabs from './dashboard.tabs.js';

const Drawer = createDrawerNavigator();
const widthScreen = Dimensions.get('screen').width;

export default class LogedDrawer extends Component {
  render() {
    const isLargeScreen = widthScreen >= 768;
    return (
      <Drawer.Navigator
        initialRouteName="Screen_1"
        drawerType={isLargeScreen ? 'permanent' : 'slide'}
        drawerStyle={[
          this.props.colorMode,
          isLargeScreen ? styles.drawerStyle : null,
        ]}
        drawerContent={props =>
          CustomDrawerContent(
            props,
            this.props.handleLogedStatus,
            this.props.colorMode,
          )
        }>
        <Drawer.Screen
          name="Screen_1"
          options={{
            title: 'Dashboard',
            headerShown: true,
            headerStyle: [
              {
                backgroundColor: this.props.colorMode.backgroundColor,
                ...styles.headerStack,
              },
            ],
            headerTintColor: this.props.colorMode.color,
            headerTitleAlign: 'center',
          }}>
          {() => (
            <DashboardTabs
              handleErrorMessage={this.props.handleErrorMessage}
              handleLoading={this.props.handleLoading}
              colorMode={this.props.colorMode}
            />
          )}
        </Drawer.Screen>

        <Drawer.Screen
          name="Settings"
          options={{
            title: 'Ajustes',
            headerTitle: 'Ajustes',
            headerShown: true,
            headerStyle: [
              {
                backgroundColor: this.props.colorMode.backgroundColor,
                ...styles.headerStack,
              },
            ],
            headerTintColor: this.props.colorMode.color,
            headerTitleAlign: 'center',
            drawerIcon: ({focused, color, size}) => (
              <Image
                style={{tintColor: color, width: size, height: size}}
                source={
                  this.props.colorMode.backgroundColor === 'black'
                    ? require('../assets/img/settingWhite.png')
                    : require('../assets/img/setting.png')
                }
              />
            ),
          }}>
          {() => (
            <SettingsComponent
              handleErrorMessage={this.props.handleErrorMessage}
              handleLoading={this.props.handleLoading}
              handleSettingsChange={this.props.handleSettingsChange}
              colorMode={this.props.colorMode}
              autoColorIsDark={this.props.autoColorIsDark}
            />
          )}
        </Drawer.Screen>
      </Drawer.Navigator>
    );
  }
}

function CustomDrawerContent(props, handleLogedStatus, colorMode) {
  return (
    <DrawerContentScrollView
      {...props}
      contentContainerStyle={styles.containerDrawerScrollView}>
      <PressableProfile {...props} colorMode={colorMode} />
      <ScrollView style={styles.containerListItemsDrawer}>
        <DrawerItemList
          {...props}
          activeBackgroundColor="#d1e6f0"
          activeTintColor="black"
          inactiveTintColor={colorMode.color}
        />
      </ScrollView>
      <DrawerItem
        label="Salir"
        onPress={() => handleLogedStatus(false, null)}
        style={styles.logOutScreenDrawer}
        inactiveBackgroundColor="#ff033e"
        inactiveTintColor="white"
      />
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  headerStack: {
    borderBottomWidth: 0.5,
  },
  drawerStyle: {
    width: 'auto',
  },
  logOutScreenDrawer: {
    width: '92%',
  },
  containerDrawerScrollView: {
    height: '100%',
    maxHeight: '100%',
  },
  containerListItemsDrawer: {},
});
