import React from 'react';
import {Dimensions, Image, ScrollView, StyleSheet} from 'react-native';
import {
  createDrawerNavigator,
  DrawerItemList,
  DrawerItem,
  DrawerContentScrollView,
} from '@react-navigation/drawer';
import SettingsComponent from '../settings.component';
import PressableProfile from '../pressableProfile.component';
import DashboardTabs from '../tabs/dashboard.tabs.js';

const Drawer = createDrawerNavigator();
const widthScreen = Dimensions.get('screen').width;

const LogedDrawer = ({
  handleErrorMessage,
  handleLogedStatus,
  handleLoading,
  handleSettingsChange,
  colorMode,
  autoColorIsDark,
}) => {
  const isLargeScreen = widthScreen >= 768;
  return (
    <Drawer.Navigator
      initialRouteName="Screen_1"
      drawerType={isLargeScreen ? 'permanent' : 'slide'}
      drawerStyle={[colorMode, isLargeScreen ? styles.drawerStyle : null]}
      drawerContent={props =>
        CustomDrawerContent(props, handleLogedStatus, colorMode)
      }>
      <Drawer.Screen
        name="Screen_1"
        options={{
          title: 'Dashboard',
          headerShown: true,
          headerStyle: [
            {
              backgroundColor: colorMode.backgroundColor,
              ...styles.headerStack,
            },
          ],
          headerTintColor: colorMode.color,
          headerTitleAlign: 'center',
        }}>
        {() => (
          <DashboardTabs
            handleErrorMessage={handleErrorMessage}
            handleLoading={handleLoading}
            colorMode={colorMode}
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
              backgroundColor: colorMode.backgroundColor,
              ...styles.headerStack,
            },
          ],
          headerTintColor: colorMode.color,
          headerTitleAlign: 'center',
          drawerIcon: ({focused, color, size}) => (
            <Image
              style={{tintColor: color, width: size, height: size}}
              source={
                colorMode.backgroundColor === 'black'
                  ? require('../../assets/img/settingWhite.png')
                  : require('../../assets/img/setting.png')
              }
            />
          ),
        }}>
        {() => (
          <SettingsComponent
            handleErrorMessage={handleErrorMessage}
            handleLoading={handleLoading}
            handleSettingsChange={handleSettingsChange}
            colorMode={colorMode}
            autoColorIsDark={autoColorIsDark}
          />
        )}
      </Drawer.Screen>
    </Drawer.Navigator>
  );
};
export default LogedDrawer;

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
