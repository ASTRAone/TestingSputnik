import React, { useEffect, useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { Loading } from '../components/Loading';

import { Login } from '../screens/login';
import { Home } from '../screens/home';

const Stack = createStackNavigator();

export const AppStack = () => {
  const [initialRouteName, setInitialRouteName] = useState('Login');
  const [loading, setLoading] = useState(false);

  async function updateRouteName() {
    fetch('https://ic56xdo6p-test-api-rn.herokuapp.com/dashboard', {
      method: 'GET',
      headers: { 'Accept': 'application/json', 'Content-Type': 'application/json', },
    })
      .then((resp) => {
        console.log(resp.bodyUsed);
        setInitialRouteName(resp.bodyUsed ? 'Home' : 'Login');
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setLoading(false);
      })
  };

  useEffect(() => {
    setLoading(true);
    updateRouteName();
  }, []);

  return (
    <NavigationContainer >
      {loading ? (
        <Loading />
      ) : (
        <Stack.Navigator initialRouteName={initialRouteName}>
          <Stack.Screen
            name="Login"
            component={Login}
            options={{
              headerShown: false,
              title: 'Авторизация',
              headerTitleAlign: 'center',
            }}
          />
          <Stack.Screen
            name="Home"
            component={Home}
            options={{
              headerShown: false,
              title: 'Добро пожаловать',
              headerTitleAlign: 'center',
            }}
          />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
};