import React, {useRef, useState, useLayoutEffect, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Animated,
  ProgressBarAndroid,
  ScrollView,
  Dimensions,
  Image,
  TextInput,
  Alert,
} from 'react-native';

import * as dateFns from 'date-fns';

import ClickPicture from './ClickPicture';
import Timeline from 'Components/Tab/HomeTab/Timeline';
import OnlyPostExTimeline from 'Components/Tab/HomeTab/OnlyPostExTimeline';
import TimelineOneDay from 'Components/Tab/HomeTab/TimelineOneDay';
import TimelineMultiDay from 'Components/Tab/HomeTab/TimelineMultiDay';

import Comment from 'Components/Tab/HomeTab/Comment';

import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import FastImage from 'react-native-fast-image';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import Calendar from './Calendar';
import axios from 'axios';
const {width} = Dimensions.get('window');

const Profile = ({navigation, route}) => {
  const [currUser, setCurrUser] = useState(route.params.user);
  const value = useRef(new Animated.Value(40)).current;
  const [isFullCalendar, setIsFullCalender] = useState(false);
  const [clickPicture, setClickPicture] = useState(null);
  const [height, setHeight] = useState(undefined);
  const [info, setInfo] = useState(undefined);
  const [timeline, setTimeline] = useState([]);
  const [scheduleList, setScheduleList] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());


  useLayoutEffect(() => {
    console.log('>>>>>>>>>>>>>>>>>>>>currUser.userCd>>>>>>>>>>>>>>>>>>>>>>>>>>' + currUser.userCd);
    console.log('>>>>>>>>>>>>>>>>>>>>>currUser.userNm>>>>>>>>>>>>>>>>>>>>>>>>>' + currUser.userNm);
    navigation.setOptions({
      title:
        route.params.isGroup === undefined
          ? '나의 프로필'
          : route.params.isGroup
          ? `${route.params.group.groupNm}`
          : `${route.params.user.userNm}님의 프로필`,
      headerStyle: {
        backgroundColor: route.params.isGroup ? 'tomato' : 'rgb(64, 114, 89)',
      },
      headerTintColor: 'white',
      headerTitleAlign: 'left',
      headerTitleStyle: {
        fontWeight: 'bold',
        fontSize: 24,
      },
      headerLeft: () =>
        route.params.isGroup === undefined ? (
          <TouchableOpacity
            onPress={() => {
              navigation.openDrawer();
            }}>
            <Text style={{padding: 10}}>
              <MaterialCommunityIcons name="menu" size={34} color="white" />
            </Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}>
            <Text style={{padding: 10}}>
              <MaterialCommunityIcons
                name="arrow-left"
                size={34}
                color="white"
              />
            </Text>
          </TouchableOpacity>
        ),
        headerRight: () => (
          <TouchableOpacity
            onPress={() => {
              navigation.push('todoTab',{
                userCd: currUser.userCd,
                userNm: currUser.userNm
              });
            }}>
            <Text style={{padding: 10}}>
              <MaterialCommunityIcons
                name="clipboard-text"
                size={34}
                color="white"
              />
            </Text>
          </TouchableOpacity>
        ),
    });
  }, []);


  useEffect(() => {
    if (route.params.isGroup === true) {
      getGroupInfo();
      return;
    }
    getUserInfo();
  }, []);

  const getGroupInfo = async () => {
    try {
      const groupInfo = (
        await axios.get(
          'http://ec2-15-165-140-48.ap-northeast-2.compute.amazonaws.com:8080/group/',
          {
            params: {input: route.params.group.groupCd},
          },
        )
      ).data;

      setInfo(groupInfo);

      const groupPostList = (
        await axios.get(
          `http://ec2-15-165-140-48.ap-northeast-2.compute.amazonaws.com:8080/post/group/${route.params.group.groupCd}`,
        )
      ).data;

      setTimeline(groupPostList);

      const monthStart = dateFns.startOfMonth(selectedDate);
      const monthEnd = dateFns.endOfMonth(selectedDate);
      const startDate = dateFns.startOfWeek(monthStart);
      const endDate = dateFns.endOfWeek(monthEnd);

      const groupSchedule = (
        await axios.post(
          `http://ec2-15-165-140-48.ap-northeast-2.compute.amazonaws.com:8080/schedule/showGroupSchedule/${route.params.group.groupCd}`,
          {
            groupCd: route.params.group.groupCd,
            frommDate: startDate.getTime(),
            toDate: endDate.getTime(),
          },
        )
      ).data;

      setScheduleList(
        groupSchedule.map((value) => ({
          ...value,
          scheduleStr: dateFns.parseISO(value.scheduleStr),
          scheduleEnd: dateFns.parseISO(value.scheduleEnd),
        })),
      );
    } catch (error) {
      console.error(error);
    }
  };

  const getUserInfo = async () => {
    try {
      //info 저장 전 => 다른 유저일때 다시 작성할 것
      const {data} = await axios.get(
        `http://ec2-15-165-140-48.ap-northeast-2.compute.amazonaws.com:8080/user/profile/${route.params.user.userId}`,
      );
      console.log(data);
      setInfo(data);
      //프로필 타임라인
      const timeLineDataList = (
        await axios.get(
          `http://ec2-15-165-140-48.ap-northeast-2.compute.amazonaws.com:8080/post/user/${route.params.user.userCd}`,
        )
      ).data;
      if (timeLineDataList.length < 0) {
        return;
      } else {
        setTimeline(timeLineDataList);
      }
      const monthStart = dateFns.startOfMonth(selectedDate);
      const monthEnd = dateFns.endOfMonth(selectedDate);
      const startDate = dateFns.startOfWeek(monthStart);
      const endDate = dateFns.endOfWeek(monthEnd);

      console.log(selectedDate, startDate, endDate);

      const scheduleData = (
        await axios.post(
          `http://ec2-15-165-140-48.ap-northeast-2.compute.amazonaws.com:8080/schedule/showUserSchedule/${route.params.user.userCd}`,
          {
            userCd: route.params.user.userCd,
            frommDate: startDate.getTime(),
            toDate: endDate.getTime(),
          },
        )
      ).data;
      console.log('axios pass');

      setScheduleList(
        scheduleData.map((value) => ({
          ...value,
          scheduleStr: dateFns.parseISO(value.scheduleStr),
          scheduleEnd: dateFns.parseISO(value.scheduleEnd),
        })),
      );
    } catch (error) {
      console.error(error);
      Alert.alert('서버에러로 인하여 데이터를 받아오는데 실패하였습니다.');
    }
  };

  const [type, setType] = useState(0);
  // 0 캘린더
  // 1 타임라인
  // 2 사진

  const onLayout = ({
    nativeEvent: {
      layout: {height},
    },
  }) => {
    setHeight(height);
    console.log('pass ');
  };
  return (
    <View style={styles.container} onLayout={onLayout}>
      {height === undefined ? (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ProgressBarAndroid />
        </View>
      ) : type == 0 ? (
        <>
          <Animated.View
            style={[
              // styles.section,
              // {height: height !== undefined ? height * 0.35 : null},
              {
                flex: value,
              },
            ]}>
            <View style={{flex: 1, justifyContent: 'center'}}>
              <View style={styles.profileInfo}>
                <View
                  style={{
                    flex: 2,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  {info === undefined ? null : (
                    <FastImage
                      resizeMode={FastImage.resizeMode.cover}
                      source={
                        route.params.isGroup === true
                          ? {uri: info.groupPic}
                          : {uri: info.userInfo.userPic}
                      }
                      style={{height: 90, width: 90, borderRadius: 50}}
                    />
                  )}
                </View>
                <View
                  style={{
                    flex: 3,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <View
                    style={{
                      paddingBottom: 5,
                    }}>
                    {info !== undefined ? (
                      <Text
                        style={{
                          fontSize: 18,
                          textAlign: 'center',
                        }}>
                        {route.params.isGroup === true
                          ? info.groupNm
                          : `${info.userInfo.userId}(${info.userInfo.userNm})`}
                      </Text>
                    ) : null}
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      marginTop: 2,
                      marginHorizontal: 20,
                      borderTopColor: 'lightgray',
                      borderTopWidth: 1,
                      paddingTop: 5,
                    }}>
                    {info === undefined ? null : route.params.isGroup ===
                      true ? (
                      <TouchableOpacity
                        style={{flex: 1}}
                        onPress={() =>
                          navigation.push('ListComponent', {
                            isGroup: true,
                            userInfo: info.memberList,
                          })
                        }>
                        <View style={{alignItems: 'center'}}>
                          <Text style={{fontSize: 14}}>그룹 멤버</Text>
                          <Text style={{fontSize: 16}}>
                            {info !== undefined ? info.memberList.length : 0}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    ) : (
                      <>
                        <TouchableOpacity
                          style={{flex: 1}}
                          onPress={() =>
                            navigation.push('ListComponent', {
                              isFollow: true,
                              isGroup: false,
                              userInfo: info.userInfo,
                            })
                          }>
                          <View style={{alignItems: 'center'}}>
                            <Text style={{fontSize: 14}}>팔로워</Text>
                            <Text style={{fontSize: 16}}>
                              {info.followerCount}
                            </Text>
                          </View>
                        </TouchableOpacity>
                        <TouchableOpacity
                          style={{flex: 1}}
                          onPress={() =>
                            navigation.push('ListComponent', {
                              isFollow: false,
                              isGroup: false,
                              userInfo: info.userInfo,
                            })
                          }>
                          <View style={{alignItems: 'center', marginLeft: 10}}>
                            <Text style={{fontSize: 14}}>팔로우</Text>
                            <Text style={{fontSize: 16}}>
                              {info.followingCount}
                            </Text>
                          </View>
                        </TouchableOpacity>
                      </>
                    )}
                  </View>
                </View>
              </View>
              {info === undefined ? null : route.params.isGroup ? (
                info.groupEx === null ? null : (
                  <View style={styles.profileContent}>
                    <View
                      style={{
                        flex: 1,
                        paddingLeft: 20,
                        borderRadius: 5,
                      }}>
                      <Text style={[{fontSize: 14}]}>{info.groupEx}</Text>
                    </View>
                  </View>
                )
              ) : info.userInfo.userEx === null ? null : (
                <View style={styles.profileContent}>
                  <View
                    style={{
                      flex: 1,
                      paddingLeft: 20,
                      borderRadius: 5,
                    }}>
                    <Text style={[{fontSize: 14}]}>{info.userInfo.userEx}</Text>
                  </View>
                </View>
              )}
            </View>
            <View style={[styles.section, {backgroundColor: 'white'}]}>
              <View
                style={{
                  flexDirection: 'row',
                  flex: 1,
                  justifyContent: 'space-between',
                  // backgroundColor: 'rgba(145,2,2,0.3)',
                }}>
                <TouchableOpacity
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: type === 0 ? 'white' : '#f9f9f9',
                  }}
                  onPress={() => setType(0)}>
                  <MaterialCommunityIcons name="calendar-month" size={28} />
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: type === 1 ? 'white' : '#f9f9f9',
                  }}
                  onPress={() => setType(1)}>
                  <MaterialCommunityIcons name="clipboard-account" size={28} />
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: type === 2 ? 'white' : '#f9f9f9',
                  }}
                  onPress={() => setType(2)}>
                  <MaterialCommunityIcons
                    name="image"
                    size={28}
                    color="rgb(64, 114, 89)"
                  />
                </TouchableOpacity>
              </View>
            </View>
          </Animated.View>
          <View style={height !== undefined && {flex: 60}}>
            {height === undefined ? null : (
              <Calendar
                isManager={route.params.isGroup === undefined}
                scheduleList={scheduleList}
                setScheduleList={setScheduleList}
                selectedDate={selectedDate}
                setSelectedDate={(value) => {
                  if (!dateFns.isSameMonth(value, selectedDate)) {
                    const monthStart = dateFns.startOfMonth(value);
                    const monthEnd = dateFns.endOfMonth(value);
                    const startDate = dateFns.startOfWeek(monthStart);
                    const endDate = dateFns.endOfWeek(monthEnd);

                    console.log(value, startDate, endDate);

                    if (route.params.isGroup === true) {
                      axios
                        .post(
                          `http://ec2-15-165-140-48.ap-northeast-2.compute.amazonaws.com:8080/schedule/showGroupSchedule/${route.params.group.groupCd}`,
                          {
                            groupCd: route.params.group.groupCd,
                            frommDate: startDate.getTime(),
                            toDate: endDate.getTime(),
                          },
                        )
                        .then(({data}) => {
                          setScheduleList(
                            data.map((value) => ({
                              ...value,
                              scheduleStr: dateFns.parseISO(value.scheduleStr),
                              scheduleEnd: dateFns.parseISO(value.scheduleEnd),
                            })),
                          );
                        });
                    } else {
                      axios
                        .post(
                          `http://ec2-15-165-140-48.ap-northeast-2.compute.amazonaws.com:8080/schedule/showUserSchedule/${route.params.user.userCd}`,
                          {
                            userCd: route.params.user.userCd,
                            frommDate: startDate.getTime(),
                            toDate: endDate.getTime(),
                          },
                        )
                        .then(({data}) => {
                          setScheduleList(
                            data.map((value) => ({
                              ...value,
                              scheduleStr: dateFns.parseISO(value.scheduleStr),
                              scheduleEnd: dateFns.parseISO(value.scheduleEnd),
                            })),
                          );
                        });
                    }
                  }
                  setSelectedDate(value);
                }}
                onRegisterSchedule={async (value) => {
                  try {
                    const scCd = (
                      await axios.post(
                        'http://ec2-15-165-140-48.ap-northeast-2.compute.amazonaws.com:8080/schedule/',
                        {
                          tabCd: undefined,
                          // groupCd: type === 2 || type === 3 ? data.groupCd : null,
                          userCd: currUser.userCd,
                          scheduleNm: value.scheduleNm,
                          scheduleEx: value.scheduleEx,
                          scheduleStr: value.scheduleStr.getTime(),
                          scheduleEnd: value.scheduleEnd.getTime(),
                          scheduleMember: [],
                          scheduleCol: value.scheduleCol,
                          schedulePublicState: value.schedulePublicState,
                        },
                      )
                    ).data;

                    await axios.post(
                      `http://ec2-15-165-140-48.ap-northeast-2.compute.amazonaws.com:8080/post/`,
                      {
                        userCd: currUser.userCd,
                        // groupCd: type === 2 || type === 3 ? data.groupCd : null,
                        postOriginCd: null,
                        scheduleCd: scCd,
                        mediaCd: null,
                        postEx: value.scheduleEx,
                        postPublicState: value.schedulePublicState,
                        postScheduleShareState: false,
                      },
                    );

                    const draft = scheduleList
                      .slice()
                      .concat({...value, scheduleCd: scCd});
                    draft.sort((a, b) => {
                      if (dateFns.isSameDay(a.scheduleStr, b.scheduleStr)) {
                        if (dateFns.isSameDay(a.scheduleEnd, b.scheduleEnd)) {
                          return 0;
                        }
                        return dateFns.differenceInDays(
                          b.scheduleEnd,
                          a.scheduleEnd,
                        );
                      }
                      return dateFns.differenceInDays(
                        a.scheduleStr,
                        b.scheduleStr,
                      );
                    });

                    setScheduleList(draft);
                  } catch (error) {
                    console.error(error);
                    Alert.alert('일정 생성에 실패하였습니다.');
                  }
                }}
                onModify={(value) => {
                  axios
                    .post(
                      `http://ec2-15-165-140-48.ap-northeast-2.compute.amazonaws.com:8080/schedule/update/${value.scheduleCd}`,
                      {
                        // groupCd: type === 0 ? null : props.info.groupCd,
                        TabCodeFK: null,
                        scheduleNm: value.scheduleNm,
                        scheduleEx: value.scheduleEx,
                        scheduleStr: value.scheduleStr.getTime(),
                        scheduleEnd: value.scheduleEnd.getTime(),
                        scheduleCol: value.scheduleCol,
                        schedulePublicState: value.schedulePublicState,
                      },
                    )
                    .then(() => {
                      var copyList = scheduleList.slice();
                      for (let i = 0; i < copyList.length; i++) {
                        if (value.scheduleCd === copyList[i].scheduleCd) {
                          copyList[i] = value;
                          break;
                        }
                      }
                      setScheduleList(copyList);
                    })
                    .catch(() => {
                      Alert.alert('일정 수정에 실패하였습니다.');
                    });
                }}
                onDeleteData={(scheduleCd) => {
                  console.log(scheduleCd);
                  axios
                    .delete(
                      `http://ec2-15-165-140-48.ap-northeast-2.compute.amazonaws.com:8080/schedule/${scheduleCd}`,
                    )
                    .then(() => {
                      const index = scheduleList.findIndex(
                        (value) => value.scheduleCd === scheduleCd,
                      );
                      var copyList = scheduleList.slice();
                      copyList.splice(index, 1);
                      setScheduleList(copyList);
                    })
                    .catch(() => {
                      Alert.alert('일정 삭제에 실패하였습니다.');
                    });
                }}
                isFullCalendar={isFullCalendar}
                onFullCalendar={() => {
                  setIsFullCalender(true);
                  Animated.timing(value, {
                    toValue: 0,
                    duration: 300,
                    useNativeDriver: false,
                  }).start();
                }}
                onSmallCalendar={() => {
                  setIsFullCalender(false);
                  Animated.timing(value, {
                    toValue: 40,
                    duration: 500,
                    useNativeDriver: false,
                  }).start();
                }}
              />
            )}
          </View>
        </>
      ) : (
        <ScrollView>
          <View style={{height: height * 0.4}}>
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
              }}>
              <View style={styles.profileInfo}>
                <View
                  style={{
                    flex: 2,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  {info === undefined ? null : (
                    <FastImage
                      resizeMode={FastImage.resizeMode.cover}
                      source={
                        route.params.isGroup === true
                          ? {uri: info.groupPic}
                          : {uri: info.userInfo.userPic}
                      }
                      style={{height: 90, width: 90, borderRadius: 50}}
                    />
                  )}
                </View>
                <View
                  style={{
                    flex: 3,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <View
                    style={{
                      paddingBottom: 5,
                    }}>
                    {info !== undefined ? (
                      <Text
                        style={{
                          fontSize: 18,
                          textAlign: 'center',
                        }}>
                        {route.params.isGroup === true
                          ? info.groupNm
                          : `${info.userInfo.userId}(${info.userInfo.userNm})`}
                      </Text>
                    ) : null}
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      marginTop: 2,
                      marginHorizontal: 20,
                      borderTopColor: 'lightgray',
                      borderTopWidth: 1,
                      paddingTop: 5,
                    }}>
                    {info === undefined ? null : route.params.isGroup ===
                      true ? (
                      <TouchableOpacity
                        style={{flex: 1}}
                        onPress={() =>
                          navigation.push('ListComponent', {
                            isGroup: true,
                            groupList: info,
                          })
                        }>
                        <View style={{alignItems: 'center'}}>
                          <Text style={{fontSize: 14}}>그룹 멤버</Text>
                          <Text style={{fontSize: 16}}>
                            {info !== undefined ? info.memberList.length : 0}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    ) : (
                      <>
                        <TouchableOpacity
                          style={{flex: 1}}
                          onPress={() =>
                            navigation.push('ListComponent', {
                              isFollow: true,
                              isGroup: false,
                              userInfo: info.userInfo,
                            })
                          }>
                          <View style={{alignItems: 'center'}}>
                            <Text style={{fontSize: 14}}>팔로우</Text>
                            <Text style={{fontSize: 16}}>
                              {info.followerCount}
                            </Text>
                          </View>
                        </TouchableOpacity>
                        <TouchableOpacity
                          style={{flex: 1}}
                          onPress={() =>
                            navigation.push('ListComponent', {
                              isFollow: false,
                              isGroup: false,
                              userInfo: info.userInfo,
                            })
                          }>
                          <View style={{alignItems: 'center', marginLeft: 10}}>
                            <Text style={{fontSize: 14}}>팔로잉</Text>
                            <Text style={{fontSize: 16}}>
                              {info.followingCount}
                            </Text>
                          </View>
                        </TouchableOpacity>
                      </>
                    )}
                  </View>
                </View>
              </View>
              {info === undefined ? null : route.params.isGroup ? (
                info.groupEx === null ? null : (
                  <View style={styles.profileContent}>
                    <View
                      style={{
                        flex: 1,
                        paddingLeft: 20,
                        borderRadius: 5,
                      }}>
                      <Text style={[{fontSize: 14}]}>{info.groupEx}</Text>
                    </View>
                  </View>
                )
              ) : info.userInfo.userEx === null ? null : (
                <View style={styles.profileContent}>
                  <View
                    style={{
                      flex: 1,
                      paddingLeft: 20,
                      borderRadius: 5,
                    }}>
                    <Text style={[{fontSize: 14}]}>{info.userInfo.userEx}</Text>
                  </View>
                </View>
              )}
            </View>
            <View style={[styles.section, {backgroundColor: 'white'}]}>
              <View
                style={{
                  flexDirection: 'row',
                  flex: 1,
                  justifyContent: 'space-between',
                  // backgroundColor: 'rgba(145,2,2,0.3)',
                }}>
                <TouchableOpacity
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: type === 0 ? 'white' : '#f9f9f9',
                  }}
                  onPress={() => setType(0)}>
                  <MaterialCommunityIcons name="calendar-month" size={28} />
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: type === 1 ? 'white' : '#f9f9f9',
                  }}
                  onPress={() => setType(1)}>
                  <MaterialCommunityIcons name="clipboard-account" size={28} />
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: type === 2 ? 'white' : '#f9f9f9',
                  }}
                  onPress={() => setType(2)}>
                  <MaterialCommunityIcons
                    name="image"
                    size={28}
                    color="rgb(64, 114, 89)"
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
          {type === 1 ? (
            timeline.map((value, index) => {
              if (value.mediaFK !== null) {
                return (
                  <View key={`${value.postCd}-${index}`}>
                    <Timeline postList={value} user={route.params.user} />
                  </View>
                );
              } else if (value.scheduleFK !== null) {
                return (
                  <View key={`${value.postCd}-${index}`}>
                    <TimelineOneDay postList={value} user={route.params.user} />
                  </View>
                );
              } else if (value.shareScheduleList.length > 0) {
                return (
                  <View key={`${value.postCd}-${index}`}>
                    <TimelineMultiDay
                      postList={value}
                      user={route.params.user}
                    />
                  </View>
                );
              } else if (value.postOriginFK === null) {
                return (
                  <View key={`${value.postCd}-${index}`}>
                    <OnlyPostExTimeline
                      postList={value}
                      user={route.params.user}
                    />
                  </View>
                );
              } else return null;
            })
          ) : (
            <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
              {timeline.map((value, index) => {
                if (value.mediaFK !== null) {
                  return (
                    <TouchableOpacity
                      key={`img-${index}`}
                      onPress={() => setClickPicture(value)}
                      style={{
                        position: 'relative',
                      }}>
                      {value.length > 1 ? (
                        <MaterialCommunityIcons
                          name="image-multiple"
                          style={{
                            position: 'absolute',
                            zIndex: 10,
                            top: width * 0.01,
                            right: width * 0.01,
                          }}
                          color="black"
                          size={24}
                        />
                      ) : null}
                      <FastImage
                        resizeMode={FastImage.resizeMode.cover}
                        source={{uri: value.mediaFK.mediaFirstPath}}
                        style={{width: width * 0.3333, height: width * 0.3333}}
                      />
                    </TouchableOpacity>
                  );
                } else return null;
              })}
              {clickPicture === null ? null : (
                <ClickPicture
                  user={currUser}
                  post={clickPicture}
                  onClose={() => setClickPicture(null)}
                />
              )}
            </View>
          )}
        </ScrollView>
      )}
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(230,230,230)',
  },
  section: {
    flex: 0.2,
    // backgroundColor: 'orange',
  },
  profileInfo: {
    flex: 5,
    flexDirection: 'row',
    paddingTop: 4,
  },
  profileContent: {
    flex: 3,
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  post: {
    padding: 5,
    margin: 10,
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
  postImage: {
    width: Dimensions.get('window').width * 0.9,
    height: Dimensions.get('window').width * 0.9,
    resizeMode: 'cover',
    margin: 5,
  },
  commentImage: {
    width: 30,
    height: 30,
    resizeMode: 'cover',
    borderRadius: 50,
  },
  oneSchedule: {
    borderBottomColor: 'lightgray',
    borderBottomWidth: 1,
    height: 40,
  },
});
