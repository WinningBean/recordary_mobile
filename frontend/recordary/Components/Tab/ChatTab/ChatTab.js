import React, {useLayoutEffect} from 'react';
import {View, Text} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {connect} from 'react-redux';

import Chat from './Chat';

const Stack = createStackNavigator();

const ChatTab = ({navigation, chatData}) => {
  const count = chatData.reduce(
    (initialValue, currentValue) => initialValue + currentValue.count,
    0,
  );
  console.log(count, 'count');

  useLayoutEffect(() => {
    navigation.setOptions({
      tabBarIcon: ({color, focused}) => (
        <View>
          <MaterialCommunityIcons
            name="chat"
            color={focused ? 'rgb(64,115,158)' : color}
            size={focused ? 32 : 26}
          />
          {count === 0 ? null : (
            <View
              style={{
                position: 'absolute',
                top: 0,
                right: 0,
                width: 15,
                height: 15,
                backgroundColor: 'red',
                borderRadius: 50,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text style={{color: 'white', fontSize: 12}}>{count}</Text>
            </View>
          )}
        </View>
      ),
    });
  }, [chatData]);

  return (
    <Stack.Navigator initialRouteName="chat">
      <Stack.Screen name="chat" component={Chat} />
    </Stack.Navigator>
  );
};

const mapStateToProps = (state) => {
  return {
    chatData: state.chatData,
  };
};

export default connect(mapStateToProps)(ChatTab);
