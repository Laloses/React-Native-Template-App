import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Dashboard from '../dashboard.component';

const Stack = createStackNavigator();

const DashboardStack = ({handleErrorMessage, handleLoading, colorMode}) => {
  return (
    <Stack.Navigator
      initialRouteName="Screen_1"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Screen_1">
        {navigation => (
          <Dashboard
            navigation={navigation.navigation}
            route={navigation.route}
            handleErrorMessage={handleErrorMessage}
            handleLoading={handleLoading}
            colorMode={colorMode}
          />
        )}
      </Stack.Screen>
    </Stack.Navigator>
  );
};
export default DashboardStack;
