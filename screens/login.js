import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

export const Login = ({navigation}) => {
  const [login, setLogin] = useState('');
  const [pass, setPass] = useState('');
  const [err, setErr] = useState(false);
  const [errText, setErrText] = useState('');

  const submitForm = async () => {
    if (login === 'admin' && pass === 'admin') {
      const data = {
        'email': login,
        'password': pass,
      };

      fetch('https://ic56xdo6p-test-api-rn.herokuapp.com/login', {
        method: 'POST',
        headers: { 'Accept': 'application/json','Content-Type': 'application/json',},
        body: JSON.stringify(data),
      })
      .then((resp) => {
        console.log('status', resp.ok);
        setErr(false);
        navigation.navigate('Home');
        setLogin('');
        setPass('');
        setErrText('');
      })
      .catch((err) => {
        console.log(err);
        setErr(true);
        setErrText(err);
      })
    } else {
      setErr(true);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Login</Text>
        <TextInput  
          style={styles.input}
          placeholder='Login'
          value={login}
          onChangeText={(login) => {
            setLogin(login)
          }} />
        <TextInput  
          style={styles.input}
          placeholder='Password'
          value={pass}
          onChangeText={(pass) => {
            setPass(pass)
          }}
          secureTextEntry={true} />
        <TouchableOpacity
          disabled={login.length === 0 || pass.length === 0 ? true : false}
          style={styles.btn}
          onPress={submitForm} >
            <Text style={styles.btnText}>Login</Text>
        </TouchableOpacity>
        {err && 
          <Text style={styles.textModal}>
            {`Введены неверные данные или сервис временно недоступен. ${errText ? 'Ошибка' : ''} ${errText}`}
          </Text>
        }
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'white', 
  },
  content: {
    position: 'relative',
  },
  title: {
    textAlign: 'center',
    marginBottom: 40,
    fontSize: 30,
    color: '#403866',
    textTransform: 'uppercase',

  },
  input: {
    borderWidth: 1,
    borderColor: 'black',
    height: 50,
    marginBottom: 20,
    paddingHorizontal: 20,
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
  textModal: {
    position: 'absolute',
    top: 40,
    textAlign: 'center',
    width: '100%',
  },
});