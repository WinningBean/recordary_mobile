import React, {useLayoutEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import AddPostTab from 'Components/Tab/AddPostTab/AddPostTab';
import ActiviteTab from 'Components/Tab/ActiviteTab/ActiviteTab';
import HomeTab from 'Components/Tab/HomeTab/HomeTab';
import ChatTab from 'Components/Tab/ChatTab/ChatTab';
import ProfileTab from 'Components/Tab/ProfileTab/ProfileTab';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const WrapStack = createStackNavigator();
const BottomTab = createBottomTabNavigator();

const WrapMain = ({navigation}) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  });
  console.log(navigation);

  return (
    <WrapStack.Navigator initialRouteName="main">
      <WrapStack.Screen
        name="menu"
        component={MenuComponent}
        options={{
          ...TransitionPresets.SlideFromRightIOS,
          gestureDirection: 'horizontal-inverted',
        }}
      />
      <WrapStack.Screen name="main" component={MainComponent} />
    </WrapStack.Navigator>
  );
};

const MenuComponent = ({navigation}) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => null,
      headerRight: () => (
        <MaterialCommunityIcons
          name="arrow-right"
          size={30}
          style={{padding: 10}}
          onPress={() => navigation.goBack()}
        />
      ),
    });
  }, []);
  return (
    <View>
      <Text>afds</Text>
    </View>
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
        <MaterialCommunityIcons
          name="menu"
          size={34}
          color="white"
          style={{padding: 10}}
          onPress={() => {
            navigation.navigate('menu');
          }}
        />
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
