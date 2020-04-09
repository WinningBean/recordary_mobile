import React, {useLayoutEffect} from 'react';
import {
  StyleSheet,
  Dimensions,
  View,
  TouchableOpacity,
  Text,
} from 'react-native';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createDrawerNavigator} from '@react-navigation/drawer';

import AddPostTab from 'Components/Tab/AddPostTab/AddPostTab';
import ActiviteTab from 'Components/Tab/ActiviteTab/ActiviteTab';
import HomeTab from 'Components/Tab/HomeTab/HomeTab';
import ChatTab from 'Components/Tab/ChatTab/ChatTab';
import ProfileTab from 'Components/Tab/ProfileTab/ProfileTab';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import Menu from 'Components/Menu/Menu';

const WrapStack = createStackNavigator();
const WrapDraw = createDrawerNavigator();
const BottomTab = createBottomTabNavigator();

const WrapMain = ({navigation}) => {
  console.log({...TransitionPresets.SlideFromRightIOS});

  return (
    <WrapDraw.Navigator
      initialRouteName="main-draw"
      edgeWidth={0}
      drawerStyle={{
        width: Dimensions.get('window').width * 0.7,
      }}
      drawerContent={() => <Menu />}>
      <WrapDraw.Screen name="main-draw" component={StackComponent} />
    </WrapDraw.Navigator>
  );
};

const StackComponent = ({navigation}) => {
  return (
    <WrapStack.Navigator>
      <WrapStack.Screen name="main-stack" component={MainComponent} />
    </WrapStack.Navigator>
  );
};

const MainComponent = ({navigation}) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Recordary',
      headerStyle: {backgroundColor: 'rgba(20, 81, 51, 0.8)'},
      headerTintColor: 'white',
      headerTitleAlign: 'center',
      headerTitleStyle: {
        fontWeight: 'bold',
        fontSize: 24,
      },
      headerLeft: () => (
        <TouchableOpacity
          onPress={() => {
            navigation.openDrawer();
          }}>
          <Text style={{padding: 10}}>
            <MaterialCommunityIcons name="menu" size={34} color="white" />
          </Text>
        </TouchableOpacity>
      ),
    });
  }, []);
  return (
    <BottomTab.Navigator
      initialRouteName="home"
      tabBarOptions={{
        activeTintColor: 'rgba(20, 81, 51, 0.8)',
        showLabel: false,
      }}>
      <BottomTab.Screen
        name="add"
        component={AddPostTab}
        options={{
          tabBarIcon: ({color, focused}) => (
            <MaterialIcons
              name="add-circle"
              color={color}
              size={focused ? 32 : 26}
            />
          ),
        }}
      />
      <BottomTab.Screen
        name="activite"
        component={ActiviteTab}
        options={{
          tabBarIcon: ({color, focused}) => (
            <MaterialCommunityIcons
              name="bell"
              color={color}
              size={focused ? 32 : 26}
            />
          ),
        }}
      />
      <BottomTab.Screen
        name="home"
        component={HomeTab}
        options={{
          tabBarIcon: ({color, focused}) => (
            <MaterialCommunityIcons
              name="home"
              color={color}
              size={focused ? 32 : 26}
            />
          ),
        }}
      />
      <BottomTab.Screen
        name="chat"
        component={ChatTab}
        options={{
          tabBarIcon: ({color, focused}) => (
            <MaterialCommunityIcons
              name="chat"
              color={color}
              size={focused ? 32 : 26}
            />
          ),
        }}
      />
      <BottomTab.Screen
        name="profile"
        component={ProfileTab}
        options={{
          tabBarIcon: ({color, focused}) => (
            <MaterialIcons
              name="person"
              color={color}
              size={focused ? 32 : 26}
            />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
};

export default WrapMain;

const styles = StyleSheet.create({});
