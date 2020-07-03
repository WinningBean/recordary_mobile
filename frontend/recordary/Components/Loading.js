import React, {useEffect} from 'react';
import {Text, View} from 'react-native';

import AsyncStorage from '@react-native-community/async-storage';

import Store from '../Store';

import axios from 'axios';

const Loading = ({onSaveInitData, route}) => {
  const getStorageData = async () => {
    try {
      // AsyncStorage.clear();
      // var user = JSON.parse(await AsyncStorage.getItem('user'));
      // user = user === null ? {} : user;

      // var postList = JSON.parse(await AsyncStorage.getItem('postList'));
      // postList = postList === null ? [] : postList;

      // var scList = JSON.parse(await AsyncStorage.getItem('scList'));
      // scList = scList === null ? {index: 0, list: []} : scList;

      // scList = {
      //   ...scList,
      //   list: scList.list.map((value) => ({
      //     ...value,
      //     start: new Date(value.start),
      //     end: new Date(value.end),
      //   })),
      // };
      // console.log(user, postList, scList);

      const loginData = JSON.parse(await AsyncStorage.getItem('loginData'));
      console.log(loginData);

      if (loginData === null) {
        // 로그인 데이터가 없으면 로그인창으로...
        route.params.onLoading();
        return;
      }

      const {data} = await axios.post(
        'http://www.recordary.gq:8080/user/login',
        {
          userId: loginData.userId,
          userPw: loginData.userPw,
        },
      );
      if (data === '') {
        Alert.alert('로그인 토큰 에러');
        AsyncStorage.clear(); // 로그인 데이터 삭제
        route.params.onLoading();
        return;
      } else {
        onSaveInitData(data);
        route.params.onSuccessLogin();
      }
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
