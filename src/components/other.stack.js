import React, {Component} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import OtherComponent from './other.component';

const Stack = createStackNavigator();

export default class OtherStack extends Component {
  render() {
    return (
      <Stack.Navigator initialRouteName="Screen_1">
        <Stack.Screen
          name="Screen_1"
          options={({route, navigation}) => ({
            title: route.params ? route.params.nameScreen : 'Submenu',
            headerLeft: () =>
              this.props.getPressableDrawer
                ? this.props.getPressableDrawer(navigation)
                : null,
          })}>
          {navigation => (
            <OtherComponent
              navigation={navigation.navigation}
              route={navigation.route}
              handleErrorMessage={this.props.handleErrorMessage}
            />
          )}
        </Stack.Screen>
      </Stack.Navigator>
    );
  }
}
