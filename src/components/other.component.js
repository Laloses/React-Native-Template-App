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
      this.props.handleLoading(true);
      this.setInitialState({...this.props.route.params.retriveData});
      this.props.handleLoading(false);
    }
  }
  render() {
    console.log('props otherComp', this.props);
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
            keyExtractor={item => 'retriveData' + item[0]}
            renderItem={({item}) => <Text>{item[0] + ' : ' + item[1]}</Text>}
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
