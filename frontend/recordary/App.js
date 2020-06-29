import React, {useState, useEffect} from 'react';
import {StatusBar} from 'react-native';
import 'react-native-gesture-handler';

import {NavigationContainer} from '@react-navigation/native';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';

import Login from 'Components/Login/Login';
import Register from 'Components/Login/Register';
import WrapMain from 'Components/WrapMain';
import Comment from 'Components/Tab/HomeTab/Comment';
import Message from 'Components/Tab/ChatTab/Message';
import Search from 'Components/Tab/ChatTab/Search';
import Schedule from 'Components/Tab/ProfileTab/Schedule';

import Setting from 'Components/Menu/Setting';
import ProfileEdit from 'Components/Menu/ProfileEdit';

import Loading from 'Containers/Loading';

import Store from './Store';

import {Provider} from 'react-redux';

const Stack = createStackNavigator();

const App = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isLogin, setIsLogin] = useState(false);

  return (
    <Provider store={Store}>
      <StatusBar backgroundColor={'transparent'} translucent={true} />
      <NavigationContainer>
        <Stack.Navigator initialRouteName="wrap">
          {!isLoading ? (
            <Stack.Screen
              name="loading"
              component={Loading}
              options={{
                headerShown: false,
              }}
              initialParams={{
                onLoading: () => setIsLoading(true),
              }}
            />
          ) : isLogin ? (
            <>
              <Stack.Screen
                name="wrap"
                component={WrapMain}
                // component={Test}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="setting"
                component={Setting}
                options={{
                  title: '설정',
                  headerStyle: {backgroundColor: 'rgb(64, 114, 89)'},
                  headerTintColor: 'white',
                  headerTitleAlign: 'left',
                  cardStyleInterpolator:
                    CardStyleInterpolators.forHorizontalIOS,
                  tabBarVisible: false,
                }}
              />
              <Stack.Screen name="profileEdit" component={ProfileEdit} />
              <Stack.Screen
                name="comment"
                component={Comment}
                options={{
                  title: '댓글',
                  headerStyle: {backgroundColor: 'rgb(64, 114, 89)'},
                  headerTintColor: 'white',
                  headerTitleAlign: 'left',
                  tabBarVisible: false,
                }}
              />
              <Stack.Screen
                name="message"
                component={Message}
                options={{
                  cardStyleInterpolator:
                    CardStyleInterpolators.forHorizontalIOS,
                  headerStyle: {backgroundColor: 'tomato'},
                  headerTintColor: 'white',
                  headerTitleStyle: {
                    fontWeight: 'bold',
                    fontSize: 24,
                  },
                }}
              />
              <Stack.Screen
                name="search"
                component={Search}
                options={{
                  cardStyleInterpolator:
                    CardStyleInterpolators.forHorizontalIOS,
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name="schedule"
                component={Schedule}
                options={{
                  cardStyleInterpolator:
                    CardStyleInterpolators.forHorizontalIOS,
                }}
              />
            </>
          ) : (
            <>
              <Stack.Screen
                name="login"
                component={Login}
                options={{
                  headerShown: false,
                }}
                initialParams={{
                  onLogin: (data) => {
                    console.log(data);
                    Store.dispatch({type: 'SET_USER', user: data});
                    setIsLogin(true);
                  },
                }}
              />
              <Stack.Screen
                name="register"
                options={{
                  title: '회원가입',
                  headerStyle: {
                    backgroundColor: 'rgb(64, 114, 89)',
                  },
                  headerTintColor: 'white',
                }}
                component={Register}
              />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
