import React, {useEffect, useState} from 'react';
import {StyleSheet} from 'react-native';
import {WebView} from 'react-native-webview';
import API from '../libs/API';
import TreeChart from '../assets/html/tree.chart';

const MapaGrafico = ({handleErrorMessage, handleLoading, colorMode}) => {
  const [mapData, setMapData] = useState(null);
  //Mount
  useEffect(() => {
    const getmapData = async () => {
      try {
        handleLoading(true);
        let data = await API.instance.getMapUserData();
        console.log('state Mapa:', data);
        setMapData(data);
        handleLoading(false);
      } catch (error) {
        typeof error === 'string'
          ? handleErrorMessage(error, 'warning')
          : handleErrorMessage(error, 'red');

        handleLoading(false);
        console.log('Error mapaGrafico:getmapData', error);
      }
    };
    getmapData();
  }, []); //DidMount
  return (
    <>
      {mapData != null && (
        <WebView
          originWhitelist={['*']}
          source={{
            html: TreeChart(mapData, colorMode.backgroundColor),
          }}
          style={styles.container}
        />
      )}
    </>
  );
};
export default MapaGrafico;

const styles = StyleSheet.create({
  container: {
    height: '100%',
  },
});
