import React, {useEffect, useState} from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import {MainStyles} from '../assets/mainstyles';
import API from '../libs/API';

const Dashboard = ({
  navigation,
  route,
  handleErrorMessage,
  handleLoading,
  colorMode,
}) => {
  const [dashboardData, setDashboardData] = useState(null);
  //Efecto de didMount
  useEffect(() => {
    const getDashboardData = async () => {
      try {
        handleLoading(true);
        let data = await API.instance.dashboard();
        let arr = Object.entries(data).map(item => {
          if (item[1] === null) {
            item[1] = 'null';
          }
          return item;
        });
        console.log('data dashbord', data);
        setDashboardData(arr);
        handleLoading(false);
      } catch (error) {
        typeof error === 'string'
          ? handleErrorMessage(error, 'warning')
          : handleErrorMessage(error, 'red');
        handleLoading(false);
        console.log('Error getDashboardData::Component', error);
      }
    };
    getDashboardData();
  }, []); //Array vacio para que se ejecute como un componentDidMount
  return (
    <View style={[colorMode, styles.container]}>
      {dashboardData != null && (
        <FlatList
          data={dashboardData}
          keyExtractor={item => 'dashboardData' + item[0]}
          renderItem={({item}) => (
            <Text style={colorMode}>
              {`${item[0]} : ${JSON.stringify(item[1])} \n`}
            </Text>
          )}
        />
      )}
    </View>
  );
};
export default Dashboard;

const styles = StyleSheet.create({
  container: {
    ...MainStyles.container,
    borderRadius: 0,
    margin: 0,
    borderWidth: 0,
  },
});
