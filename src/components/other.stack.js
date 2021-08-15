import React, {Component} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import OtherComponent from './other.component';
import PressableDrawer from './pressableDrawer.component';

const Stack = createStackNavigator();

export default class OtherStack extends Component {
  render() {
    return (
      <Stack.Navigator initialRouteName="Screen_1">
        <Stack.Screen
          name="Screen_1"
          options={({route, navigation}) => ({
            title: route.params ? route.params.nameScreen : 'Submenu',
            headerLeft: () => <PressableDrawer navigation={navigation} />,
          })}>
          {navigation => (
            <OtherComponent
              navigation={navigation.navigation}
              route={navigation.route}
              handleErrorMessage={this.props.handleErrorMessage}
              handleLoading={this.props.handleLoading}
            />
          )}
        </Stack.Screen>
      </Stack.Navigator>
    );
  }
}
