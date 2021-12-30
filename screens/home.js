import React, { useEffect, useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';

export const Home = ({navigation}) => {
  const closeAccount = () => {
    fetch('https://ic56xdo6p-test-api-rn.herokuapp.com/logout', {
        method: 'GET',
        headers: { 'Accept': 'application/json','Content-Type': 'application/json',},
      })
      .then((resp) => {
        console.log(resp.body);
        navigation.navigate('Login');
      })
      .catch((err) => console.log(err))
  };

  return (
    <View style={styles.container}>
      <View>
        <Text style={{marginBottom: 20}}>Вы успешно прошли авторизацию</Text>
        <TouchableOpacity
          onPress={closeAccount}
          style={styles.btn}>
          <Text
            style={styles.btnText}>Выйти из профиля</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center'
  },
  btn: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
    backgroundColor: '#403866',
  },
  btnText: {
    color: 'white',
    textTransform: 'uppercase',
  },
});