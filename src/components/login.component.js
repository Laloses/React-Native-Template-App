import CheckBox from '@react-native-community/checkbox';
import React, {useEffect, useState} from 'react';
import {
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
} from 'react-native';
import {MainStyles} from '../assets/mainstyles';
import API from '../libs/API';
import {
  getLocalStayLoged,
  setLocalStayLoged,
} from '../services/app.local.storage';

const LoginComponent = ({
  navigation,
  route,
  handleErrorMessage,
  handleLogedStatus,
  handleLoading,
  colorMode,
}) => {
  const [userInput, setUserInput] = useState('');
  const [passInput, setPassInput] = useState('');
  const [stayLoged, setStayLoged] = useState(false);
  //mount
  useEffect(() => {
    const isStayLoged = async () => {
      try {
        handleLoading(true);
        let stayLogedJSON = await getLocalStayLoged();
        if (stayLogedJSON && stayLogedJSON.value === true) {
          await handleLogIn(stayLogedJSON.user, stayLogedJSON.pass);
        }
        handleLoading(false);
      } catch (error) {
        typeof error === 'string'
          ? handleErrorMessage(error, 'warning')
          : handleErrorMessage(error, 'red');

        handleLoading(false);
        console.log('error en LoginComponent::isStayLoged', error);
      }
    };
    isStayLoged();
  }, []); //mount
  const handleLogIn = async (user, pass) => {
    try {
      handleLoading(true);
      let res = {}; //await API.instance.login(user, pass);
      console.log('return login', res);
      //Correcto
      if (typeof res === 'object') {
        //Quitar la contraseña de los datos guardados en la app
        if (res.hasOwnProperty('password')) {
          delete res.Password;
        }
        //Verficar si mantiene sesion
        if (stayLoged) {
          //Guardar datos de sesión
          await setLocalStayLoged(user, pass);
        }
        //Termina la carga
        handleLoading(false);
        //Cambiamos el status de logeo de la app, y guardamos la info
        handleLogedStatus(true, res);
      }
    } catch (error) {
      //Malas credenciales
      typeof error === 'string'
        ? handleErrorMessage(error, 'warning')
        : handleErrorMessage(error, 'red');

      handleLoading(false);
      console.log('Error al logear', error);
    }
  };
  return (
    <SafeAreaView style={[colorMode, styles.container]}>
      <Text style={colorMode}>Usuario</Text>
      <TextInput
        style={[colorMode, MainStyles.input]}
        onChangeText={value => setUserInput(value)}
        placeholder="Mi usuario"
        placeholderTextColor={MainStyles.placeholderColor.color}
        value={userInput || ''}
      />
      <Text>Contraseña</Text>
      <TextInput
        textContentType="password"
        style={[colorMode, MainStyles.input]}
        onChangeText={value => setPassInput(value)}
        placeholder="Mi contraseña"
        placeholderTextColor={MainStyles.placeholderColor.color}
        value={passInput || ''}
      />
      <Text style={colorMode}>Mantener sesión.</Text>
      <CheckBox
        tintColors={{
          true: colorMode.color,
          false: colorMode.color,
        }} //Android
        tintColor={colorMode.color} //IOS
        onTintColor={colorMode.color} //IOS
        disabled={false}
        value={stayLoged}
        onValueChange={newValue => setStayLoged(newValue)}
      />
      <Pressable
        style={[colorMode, MainStyles.btn]}
        onPress={() => handleLogIn(userInput, passInput)}>
        <Text style={colorMode}>Iniciar sesión</Text>
      </Pressable>
    </SafeAreaView>
  );
};
export default LoginComponent;

const styles = StyleSheet.create({
  container: {
    ...MainStyles.container,
    ...MainStyles.justifyCenter,
    borderRadius: 0,
    margin: 0,
    borderWidth: 0,
  },
});
