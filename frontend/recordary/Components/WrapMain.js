import React, {useLayoutEffect, useState} from 'react';
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

import AddPostTab from 'Containers/Tab/AddPostTab/AddPostTab';
import ActiviteTab from 'Components/Tab/ActiviteTab/ActiviteTab';
import HomeTab from 'Containers/Tab/HomeTab/HomeTab';
import ChatTab from 'Components/Tab/ChatTab/ChatTab';
import ProfileTab from 'Containers/Tab/ProfileTab/ProfileTab';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import Menu from 'Containers/Menu/Menu';

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
      drawerContent={(option) => <Menu option={option} />}>
      <WrapDraw.Screen name="main-draw" component={MainComponent} />
    </WrapDraw.Navigator>
  );
};
const MainComponent = ({navigation}) => {
  return (
    <BottomTab.Navigator
      initialRouteName="home"
      tabBarOptions={{
        activeTintColor: 'rgb(64, 114, 89)',
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
              color={focused ? 'rgb(64,115,158)' : color}
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
