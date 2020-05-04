import React, {useEffect} from 'react';
import {Text, View} from 'react-native';

import AsyncStorage from '@react-native-community/async-storage';

const Loading = ({onSaveInitData, route}) => {
  const getStorageData = async () => {
    try {
      // AsyncStorage.clear();
      var user = JSON.parse(await AsyncStorage.getItem('user'));
      user = user === null ? {} : user;

      var postList = JSON.parse(await AsyncStorage.getItem('postList'));
      postList = postList === null ? [] : postList;

      var scList = JSON.parse(await AsyncStorage.getItem('scList'));
      scList = scList === null ? {index: 0, list: []} : scList;

      scList = {
        ...scList,
        list: scList.list.map((value) => ({
          ...value,
          start: new Date(value.start),
          end: new Date(value.end),
        })),
      };
      onSaveInitData(user, postList, scList);
      route.params.onLoading();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getStorageData();
  }, []);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
      }}>
      <Text
        style={{fontSize: 44, color: 'rgb(64, 114, 89)', fontWeight: 'bold'}}>
        Recordary
      </Text>
    </View>
  );
};

export default Loading;
