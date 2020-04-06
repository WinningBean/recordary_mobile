import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';

import 'react-native-gesture-handler';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import Login from 'Components/Login/Login';
import WrapMain from 'Components/WrapMain';

const Stack = createStackNavigator();

const App = () => {
  const [isLogin, setIsLogin] = useState(false);
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {isLogin ? (
          <Stack.Screen name="wrap" component={WrapMain} />
        ) : (
          <Stack.Screen
            name="login"
            component={Login}
            options={{
              headerShown: false,
            }}
            initialParams={{
              onLogin: () => setIsLogin(true),
            }}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

const styles = StyleSheet.create({});
