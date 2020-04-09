import React, {useState} from 'react';
import {StatusBar} from 'react-native';
import 'react-native-gesture-handler';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import Login from 'Components/Login/Login';
import WrapMain from 'Components/WrapMain';

const Stack = createStackNavigator();

const App = () => {
  const [isLogin, setIsLogin] = useState(true);
  return (
    <>
      <StatusBar backgroundColor={'transparent'} translucent={true} />
      <NavigationContainer>
        <Stack.Navigator>
          {isLogin ? (
            <Stack.Screen
              name="wrap"
              component={WrapMain}
              options={{headerShown: false}}
            />
          ) : (
            <Stack.Screen
              name="login"
              component={login}
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
    </>
  );
};

export default App;
