import React, {useLayoutEffect, useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  TextInput,
  ScrollView,
  Dimensions,
  FlatList,
  KeyboardAvoidingView,
} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import * as dateFns from 'date-fns';

import FastImage from 'react-native-fast-image';

import {connect} from 'react-redux';

import axios from 'axios';
const Stack = createStackNavigator();

const ActiviteTab = ({user, navigation}) => {
  const [noticeCount, setNoticeCount] = useState(0);

  useLayoutEffect(() => {
    navigation.setOptions({
      tabBarIcon: ({color, focused}) => (
        <View>
          <MaterialCommunityIcons
            name="bell"
            color={color}
            size={focused ? 32 : 26}
          />
          {noticeCount === 0 ? null : (
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
              <Text style={{color: 'white', fontSize: 12}}>{noticeCount}</Text>
            </View>
          )}
        </View>
      ),
    });
  }, [noticeCount]);

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="activite"
        component={Activite}
        initialParams={{
          user: user,
          setNoticeCount: (value) => setNoticeCount(value),
        }}
      />
    </Stack.Navigator>
  );
};

const Activite = ({navigation, route}) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      title: '활동',
      headerStyle: {backgroundColor: 'rgb(64, 114, 89)'},
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

  const [noticeList, setNoticeList] = useState([]);
  const [refreshing, setRefreshing] = useState(true);

  const acceptNotice = async (index, isGroupApply) => {
    try {
      if (isGroupApply) {
        await axios.post(
          'http://ec2-15-165-140-48.ap-northeast-2.compute.amazonaws.com:8080/groupMember/create',
          {
            groupCd: noticeList[index].groupCd,
            userCd: route.params.user.userCd,
          },
        );
      } else {
        await axios.post(
          'http://ec2-15-165-140-48.ap-northeast-2.compute.amazonaws.com:8080/scheduleMember/update',
          {
            scheduleCd: noticeList[index].scheduleCd,
            userCd: route.params.user.userCd,
          },
        );
      }

      const copyList = noticeList.slice();
      copyList.splice(index, 1);
      setNoticeList(copyList);
    } catch (error) {
      console.error(error);
    }
  };

  const denialNotice = async (index, isGroupApply) => {
    try {
      if (isGroupApply) {
        await axios.post(
          'http://ec2-15-165-140-48.ap-northeast-2.compute.amazonaws.com:8080/groupApply/delete',
          {
            groupCd: noticeList[index].groupCd,
            userCd: route.params.user.userCd,
          },
        );
      } else {
        await axios.post(
          'http://ec2-15-165-140-48.ap-northeast-2.compute.amazonaws.com:8080/scheduleMember/delete',
          {
            scheduleCd: noticeList[index].scheduleCd,
            userCd: route.params.user.userCd,
          },
        );
      }

      const copyList = noticeList.slice();
      copyList.splice(index, 1);
      setNoticeList(copyList);
    } catch (error) {
      console.error(error);
    }
  };

  const getNoticeList = () => {
    axios
      .get(
        `http://ec2-15-165-140-48.ap-northeast-2.compute.amazonaws.com:8080/notice/accept/${route.params.user.userCd}`,
      )
      .then(({data}) => {
        console.log(data);
        setNoticeList(
          data.map((data) => ({
            ...data,
            createTime: dateFns.parseISO(data.createTime),
          })),
        );
        setRefreshing(false);
      });
  };

  useEffect(() => {
    getNoticeList();
  }, []);

  useEffect(() => {
    route.params.setNoticeCount(noticeList.length);
  }, [noticeList]);

  return (
    <FlatList
      keyExtractor={(value, index) => `${value.createTime}-${index}`}
      data={noticeList}
      ListEmptyComponent={() => (
        <View
          style={{
            alignItems: 'center',
            paddingTop: 16,
          }}>
          <Text style={{color: '#999', fontSize: 20}}>알람이 없습니다.</Text>
        </View>
      )}
      renderItem={({item, index}) => {
        const value = item;
        return (
          <View key={`${value.createTime}-${index}`} style={styles.notifyBox}>
            <View style={{margin: 5, flexDirection: 'row'}}>
              <FastImage
                source={{
                  uri:
                    value.scheduleCd === null ? value.groupPic : value.userPic,
                }}
                style={{width: 30, height: 30, borderRadius: 50}}
                resizeMode="cover"
              />
              <Text
                style={{
                  color: 'gray',
                  fontSize: 15,
                  lineHeight: 30,
                  marginLeft: 6,
                }}>
                {dateFns.isSameDay(new Date(), value.createTime)
                  ? dateFns.format(value.createTime, 'a') === 'AM'
                    ? '오전 ' + dateFns.format(value.createTime, 'h:mm')
                    : '오후 ' + dateFns.format(value.createTime, 'h:mm')
                  : `${dateFns.format(
                      value.createTime,
                      'YYY' + ' / ' + 'MM' + ' / ' + 'dd',
                    )} ${
                      dateFns.format(value.createTime, 'a') === 'AM'
                        ? '(오전 '
                        : '(오후 '
                    } ${dateFns.format(value.createTime, 'h:mm)')}`}
              </Text>
            </View>
            <View style={{marginLeft: 5, marginRight: 5}}>
              <Text
                style={{
                  fontSize: 16,
                }}>
                {value.scheduleCd === null
                  ? `'${value.groupNm}' 그룹이 그룹초대를 보냈습니다.`
                  : `'${value.userNm}' 님이 '${value.scheduleNm}' 스케줄에 함께하는 멤버로 초대하였습니다. `}
              </Text>
            </View>
            {/* 수락 거절용일때만  보이게*/}
            <View
              style={[styles.spaceBetween, {marginTop: 5, marginBottom: 5}]}>
              <TouchableOpacity
                onPress={() => acceptNotice(index, value.scheduleCd === null)}>
                <View style={styles.yesNoButton}>
                  <Text style={{fontSize: 15}}>수락</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => denialNotice(index, value.scheduleCd === null)}>
                <View style={styles.yesNoButton}>
                  <Text style={{fontSize: 15}}>거절</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        );
      }}
      refreshing={refreshing}
      onRefresh={() => {
        getNoticeList();
      }}
    />
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps)(ActiviteTab);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  notifyBox: {
    padding: 5,
    margin: 5,
    backgroundColor: 'white',
  },
  spaceBetween: {
    paddingLeft: 5,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  flexRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  yesNoButton: {
    backgroundColor: '#eee',
    width: Dimensions.get('window').width * 0.45,
    height: 30,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
