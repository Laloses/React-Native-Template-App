import React, {Component} from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import {MainStyles} from '../assets/mainstyles';
//import API from '../libs/API';

export default class OtherComponent extends Component {
  state = {
    retriveData: [null],
  };
  handleUserInput = input => {
    this.state.user = input;
  };
  hanldePassInput = input => {
    this.state.pass = input;
  };
  setInitialState = data => {
    this.setState({
      ...this.state,
      retriveData: data,
    });
  };
  componentDidMount() {
    if (
      this.props.params &&
      this.state.retriveData !== this.props.route.params.retriveData
    ) {
      this.setInitialState({...this.props.route.params.retriveData});
    }
  }
  render() {
    console.log(this.props);
    if (this.state.retriveData === null) {
      return null;
    } else {
      const retriveData = this.state.retriveData;
      const userDataArray = Object.entries(retriveData).map(item => {
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
              <Text key={'retriveData' + item[0]}>
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
