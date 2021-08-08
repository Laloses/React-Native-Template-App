import React, {Component} from 'react';
import {Dimensions, Image, Pressable, StyleSheet} from 'react-native';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import DashboardStack from './dashboard.stack';
import {getPixelSizeForLayoutSize} from 'react-native/Libraries/Utilities/PixelRatio';
import OtherStack from './other.stack';

const Drawer = createDrawerNavigator();
const widthScreen = Dimensions.get('screen').width;

export default class LogedDrawer extends Component {
  pressableDrawer = navigation => (
    <Pressable onPress={() => navigation.openDrawer()}>
      <Image
        style={styles.imgIcon}
        source={require('../assets/img/sideMenuIcon.png')}
      />
    </Pressable>
  );
  render() {
    const isLargeScreen = widthScreen >= 768;
    return (
      <Drawer.Navigator
        drawerContent={props =>
          CustomDrawerContent(props, this.props.handleLogedStatus)
        }
        initialRouteName="Screen_1"
        drawerType={isLargeScreen ? 'permanent' : 'slide'}
        drawerStyle={isLargeScreen ? styles.drawerStyle : null}>
        <Drawer.Screen name="Screen_1" options={{title: 'Dashboard'}}>
          {() => (
            <DashboardStack
              handleErrorMessage={this.props.handleErrorMessage}
              getPressableDrawer={this.pressableDrawer}
              handleLoading={this.props.handleLoading}
            />
          )}
        </Drawer.Screen>

        <Drawer.Screen name="Screen_2" options={{title: 'Submenu 2'}}>
          {() => (
            <OtherStack
              handleErrorMessage={this.props.handleErrorMessage}
              getPressableDrawer={this.pressableDrawer}
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
      <DrawerItemList {...props} />
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
  imgIcon: {
    width: getPixelSizeForLayoutSize(12),
    height: getPixelSizeForLayoutSize(12),
    marginLeft: 10,
  },
  drawerStyle: {
    width: 'auto',
  },
  logOutScreenDrawer: {
    position: 'absolute',
    bottom: 0,
    width: '92%',
  },
  containerDrawerScrollView: {
    height: '100%',
  },
});
