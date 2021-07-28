import React, {Component} from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import {MainStyles} from '../assets/mainstyles';
//import API from '../libs/API';

export default class Dashboard extends Component {
  state = {
    userData: null,
  };
  handleUserInput = input => {
    this.state.user = input;
  };
  hanldePassInput = input => {
    this.state.pass = input;
    //Para moverse entre screens
    this.props.navigation?.replace('Screen_2', {
      userData: {...this.userData},
      nameScreen: `Screen de ${this.userData.FirstName}`,
    });
    //ejemplo î
  };
  setInitialState = data => {
    this.setState({
      ...this.state,
      userData: data,
    });
  };
  componentDidMount() {
    if (
      this.props.params &&
      this.state.userData !== this.props.route.params.userData
    ) {
      this.setInitialState({...this.props.route.params.userData});
    }
  }
  render() {
    console.log(this.props);
    if (this.state.userData === null) {
      return null;
    } else {
      const userData = this.state.userData;
      const userDataArray = Object.entries(userData).map(item => {
        if (item[1] == null) {
          item[1] = 'null';
        }
        return item;
      });
      return (
        <View style={styles.container}>
          <FlatList
            data={userDataArray}
            renderItem={({item}) => (
              <Text key={'userData' + item[0]}>
                {item[0] + ' : ' + item[1]}
              </Text>
            )}
          />
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    ...MainStyles.container,
  },
});
