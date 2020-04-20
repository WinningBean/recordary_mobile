import React, {useState} from 'react';
import {StatusBar} from 'react-native';
import 'react-native-gesture-handler';

import {NavigationContainer} from '@react-navigation/native';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';

import Login from 'Components/Login/Login';
import WrapMain from 'Components/WrapMain';
import Comment from 'Components/Tab/HomeTab/Comment';
import Message from 'Components/Tab/ChatTab/Message';
import Search from 'Components/Tab/ChatTab/Search';

import Setting from 'Components/Menu/Setting';
import ProfileEdit from 'Components/Menu/ProfileEdit';

import Wrap from './Test';

const Stack = createStackNavigator();

const App = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <>
      <StatusBar backgroundColor={'transparent'} translucent={true} />
      <NavigationContainer>
        <Stack.Navigator initialRouteName="wrap">
          {isLogin ? (
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
            </>
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
    </>
  );
};

export default App;
