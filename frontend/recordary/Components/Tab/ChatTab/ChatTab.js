import React, {useLayoutEffect, useState, useMemo, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableNativeFeedback,
  TouchableOpacity,
} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import FastImage from 'react-native-fast-image';

import WebSock from 'Components/WebSock';

const Stack = createStackNavigator();

const ChatTab = () => {
  return (
    <Stack.Navigator initialRouteName="chat">
      <Stack.Screen name="chat" component={Chat} />
    </Stack.Navigator>
  );
};

const Chat = ({navigation}) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Chatting',
      headerStyle: {backgroundColor: 'rgb(64,115,158)'},
      headerTintColor: 'white',
      headerTitleAlign: 'left',
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
      headerRight: () => (
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('search');
          }}>
          <Text style={{padding: 10}}>
            <MaterialCommunityIcons
              name="comment-search-outline"
              size={34}
              color="white"
            />
          </Text>
        </TouchableOpacity>
      ),
    });
  }, []);

  useEffect(() => {
    console.log('show chat');
  }, []);

  const [chatData, setChatData] = useState([]);
  const [user, setUser] = useState(null);

  const chatList = useMemo(() => {
    return chatData.map((value, index) => (
      <TouchableNativeFeedback
        onPress={() =>
          navigation.navigate('message', {
            info: value,
            user: user,
          })
        }
        key={`chatlist-${value.roomCd}`}>
        <View
          style={[
            styles.item,
            value.isGroup
              ? {borderLeftColor: 'tomato', borderLeftWidth: 6}
              : {paddingLeft: 8},
          ]}>
          <View style={{height: 70, width: 70, padding: 5}}>
            <FastImage
              source={{uri: value.targetPic}}
              style={styles.itemImage}
              resizeMode="cover"
            />
          </View>
          <View style={{paddingLeft: 10}}>
            <View style={[styles.itemContent, {justifyContent: 'flex-end'}]}>
              <Text style={{fontSize: 18, fontWeight: 'bold'}}>
                {value.targetNm}
              </Text>
            </View>
            <View
              style={[
                styles.itemContent,
                {justifyContent: 'flex-start', paddingTop: 5},
              ]}>
              <Text style={{fontSize: 16}}>{value.lastChat}</Text>
            </View>
          </View>
        </View>
      </TouchableNativeFeedback>
    ));
  }, [chatData, user]);

  return (
    <View style={styles.container}>
      {chatList}
      <WebSock
        setChatData={(value) => setChatData(value)}
        setUser={(value) => setUser(value)}
      />
    </View>
  );
};

export default ChatTab;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    height: 70,
    backgroundColor: 'white',
    flexDirection: 'row',
  },
  itemImage: {
    height: 60,
    width: 60,
    borderRadius: 50,
  },
  itemContent: {
    flex: 1,
  },
});
