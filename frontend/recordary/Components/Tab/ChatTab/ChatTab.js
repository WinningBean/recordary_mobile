import React, {useLayoutEffect, useState, useMemo} from 'react';
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

const Stack = createStackNavigator();

const ChatTab = () => {
  return (
    <Stack.Navigator initialRouteName="chat">
      <Stack.Screen name="chat" component={Chat} />
    </Stack.Navigator>
  );
};

const Chat = ({navigation}) => {
  useState;
  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Chatting',
      headerStyle: {backgroundColor: 'tomato'},
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
    });
  }, []);

  const chatArray = useState([
    {
      id: 'abcd1234',
      nm: '홍길동',
      content: 'ABCDEFGHIJKLMNOPQRX ABCDE',
      date: new Date('2020-03-25'),
      pic:
        'https://i.pinimg.com/originals/0d/e8/86/0de8869350e89fd300edaeef3b659674.jpg',
      message: [
        {
          ex: 'hello world',
          date: new Date('2020-03-28'),
          isMyMessage: false,
        },
        {
          ex: 'hello world',
          date: new Date(),
          isMyMessage: true,
        },
        {
          ex: 'hello world',
          date: new Date(),
          isMyMessage: true,
        },
        {
          ex: 'hello world',
          date: new Date(),
          isMyMessage: false,
        },
        {
          ex: 'hello world',
          date: new Date(),
          isMyMessage: true,
        },
        {
          ex: 'hello world',
          date: new Date(),
          isMyMessage: true,
        },
        {
          ex: 'hello world',
          date: new Date(),
          isMyMessage: true,
        },
        {
          ex: 'hello world',
          date: new Date(),
          isMyMessage: false,
        },
        {
          ex: 'hello world',
          date: new Date(),
          isMyMessage: true,
        },
        {
          ex: 'hello world',
          date: new Date(),
          isMyMessage: true,
        },
        {
          ex: 'hello world',
          date: new Date(),
          isMyMessage: true,
        },
        {
          ex: 'hello world',
          date: new Date(),
          isMyMessage: false,
        },
        {
          ex: 'hello world123',
          date: new Date(),
          isMyMessage: true,
        },
      ],
      isLogin: true,
    },
    {
      id: '142213',
      nm: '김길동',
      content: 'Hello World',
      date: new Date('2020-03-26'),
      pic:
        'https://i.pinimg.com/originals/0d/e8/86/0de8869350e89fd300edaeef3b659674.jpg',
      message: [
        {
          ex: 'hello world',
          date: new Date(),
        },
      ],
      isLogin: false,
    },
    {
      id: '64315',
      nm: '위길동',
      content: 'ABCDEFG',
      date: new Date('2020-03-27'),
      pic:
        'https://i.pinimg.com/originals/0d/e8/86/0de8869350e89fd300edaeef3b659674.jpg',
      message: [
        {
          ex: 'hello world',
          date: new Date(),
        },
      ],
      isLogin: true,
    },
    {
      id: '73453',
      nm: 'Pablo Fornals',
      content: 'OK see you later',
      date: new Date(),
      pic:
        'https://i.pinimg.com/originals/0d/e8/86/0de8869350e89fd300edaeef3b659674.jpg',
      message: [
        {
          ex: 'hello world',
          date: new Date(),
        },
      ],
      isLogin: true,
    },
  ])[0];

  const chatList = useMemo(() => {
    return chatArray.map((value, index) => (
      <TouchableNativeFeedback
        onPress={() =>
          navigation.navigate('message', {
            nm: value.nm,
            message: value.message,
            pic: value.pic,
          })
        }
        key={`chatlist-${value.id}`}>
        <View
          style={[
            styles.item,
            value.isLogin
              ? {borderLeftColor: 'green', borderLeftWidth: 8}
              : {paddingLeft: 8},
          ]}
          key={index}>
          <View style={{height: 80, width: 80, padding: 5}}>
            <FastImage
              source={{uri: value.pic}}
              style={styles.itemImage}
              resizeMode="cover"
            />
          </View>
          <View style={{paddingLeft: 10}}>
            <View style={[styles.itemContent, {justifyContent: 'flex-end'}]}>
              <Text style={{fontSize: 18, fontWeight: 'bold'}}>{value.nm}</Text>
            </View>
            <View
              style={[
                styles.itemContent,
                {justifyContent: 'flex-start', paddingTop: 5},
              ]}>
              <Text style={{fontSize: 16}}>{value.content}</Text>
            </View>
          </View>
        </View>
      </TouchableNativeFeedback>
    ));
  }, [chatArray]);

  return <View style={styles.container}>{chatList}</View>;
};

export default ChatTab;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    height: 80,
    backgroundColor: 'white',
    flexDirection: 'row',
  },
  itemImage: {
    height: 70,
    width: 70,
    borderRadius: 50,
  },
  itemContent: {
    flex: 1,
  },
});
