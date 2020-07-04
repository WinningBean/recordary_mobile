import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';

import {NavigationContainer} from '@react-navigation/native';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';

import Login from 'Components/Login/Login';
import Register from 'Components/Login/Register';
import WrapMain from 'Components/WrapMain';
import Comment from 'Components/Tab/HomeTab/Comment';
import homeSearch from 'Components/Tab/HomeTab/homeSearch';
import Message from 'Components/Tab/ChatTab/Message';
import Search from 'Components/Tab/ChatTab/Search';
import Schedule from 'Components/Tab/ProfileTab/Schedule';
import ListComponent from 'Components/UI/ListComponent';

import Setting from 'Components/Menu/Setting';
import Profile from 'Components/Tab/ProfileTab/Profile';
import ProfileEdit from 'Components/Menu/ProfileEdit';
import Loading from 'Containers/Loading';

const Stack = createStackNavigator();

const Navigator = ({isLogin, setIsLogin, setUser}) => {
  const [isLoadFinish, setIsLoadFinish] = useState(false);
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="wrap">
        {!isLoadFinish ? (
          <Stack.Screen
            name="loading"
            component={Loading}
            options={{
              headerShown: false,
            }}
            initialParams={{
              onLoading: () => setIsLoadFinish(true),
              onSuccessLogin: () => {
                setIsLoadFinish(true);
                setIsLogin(true);
              },
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
                cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
                tabBarVisible: false,
              }}
            />
            <Stack.Screen
              name="profileEdit"
              component={ProfileEdit}
              options={{
                cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
              }}
            />
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
                cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
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
                cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="schedule"
              component={Schedule}
              options={{
                cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
              }}
            />
            <Stack.Screen
              name="ListComponent"
              component={ListComponent}
              options={{
                title: 'ListComponent',
                headerStyle: {backgroundColor: 'rgb(64, 114, 89)'},
                headerTintColor: 'white',
                headerTitleAlign: 'left',
                tabBarVisible: false,
                cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
              }}
            />
            <Stack.Screen
              name="homeSearch"
              component={homeSearch}
              options={{
                cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="otherProfile"
              component={Profile}
              options={{
                cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
                // headerShown: false,
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
                  setUser(data);
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
  );
};

const mapStateToProps = (state) => {
  return {
    isLogin: state.isLogin,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setIsLogin: (bool) => {
      dispatch({type: 'SET_LOGIN', isLogin: bool});
    },
    setUser: (data) => {
      dispatch({type: 'SET_USER', user: data});
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Navigator);
