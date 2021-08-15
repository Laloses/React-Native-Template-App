import React, {Component} from 'react';
import {Dimensions, ScrollView, StyleSheet} from 'react-native';
import {
  createDrawerNavigator,
  DrawerItemList,
  DrawerItem,
  DrawerContentScrollView,
} from '@react-navigation/drawer';
import OtherStack from './other.stack';
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
        drawerStyle={isLargeScreen ? styles.drawerStyle : null}
        drawerContent={props =>
          CustomDrawerContent(props, this.props.handleLogedStatus)
        }>
        <Drawer.Screen name="Screen_1" options={{title: 'Dashboard'}}>
          {() => (
            <DashboardTabs
              handleErrorMessage={this.props.handleErrorMessage}
              handleLoading={this.props.handleLoading}
            />
          )}
        </Drawer.Screen>

        <Drawer.Screen name="Screen_2" options={{title: 'Submenu 2'}}>
          {() => (
            <OtherStack
              handleErrorMessage={this.props.handleErrorMessage}
              handleLoading={this.props.handleLoading}
            />
          )}
        </Drawer.Screen>
      </Drawer.Navigator>
    );
  }
}

function CustomDrawerContent(props, handleLogedStatus) {
  return (
    <DrawerContentScrollView
      {...props}
      contentContainerStyle={styles.containerDrawerScrollView}>
      <PressableProfile {...props} />
      <ScrollView style={styles.containerListItemsDrawer}>
        <DrawerItemList {...props} />
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
