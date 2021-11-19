import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import LoginComponent from '../login.component';
import {StyleSheet} from 'react-native';

const Stack = createStackNavigator();

const NoLogedStack = ({
  handleErrorMessage,
  handleLogedStatus,
  handleLoading,
  colorMode,
}) => {
  return (
    <Stack.Navigator
      initialRouteName="Screen_1"
      screenOptions={{
        headerStyle: [
          styles.headerStyle,
          {backgroundColor: colorMode.backgroundColor},
        ],
        headerTintColor: colorMode.color,
        headerTitleAlign: 'center',
      }}>
      <Stack.Screen
        name="Screen_1"
        options={{
          title: 'Iniciar sesión',
        }}>
        {navigation => (
          <LoginComponent
            navigation={navigation.navigation}
            route={navigation.route}
            handleErrorMessage={handleErrorMessage}
            handleLogedStatus={handleLogedStatus}
            handleLoading={handleLoading}
            colorMode={colorMode}
          />
        )}
      </Stack.Screen>
    </Stack.Navigator>
  );
};
export default NoLogedStack;

const styles = StyleSheet.create({
  headerStyle: {
    borderBottomWidth: 0.5,
  },
});
