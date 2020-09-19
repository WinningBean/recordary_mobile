import React, {useState, useLayoutEffect, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Picker,
  Image,
  TextInput,
  Modal,
  Alert,
} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as dateFns from 'date-fns';
import {addHours, startOfDay, endOfDay, startOfSecond} from 'date-fns';

import axios from 'axios';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
const Stack = createStackNavigator();

const AddPostTab = ({user, groupList}) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="addPost"
        component={AddPost}
        initialParams={{
          user: user,
          groupList: groupList,
        }}
      />
    </Stack.Navigator>
  );
};

const AddPost = ({navigation, route}) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      title: '게시물 추가',
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
            navigation.goBack();
          }}>
          <MaterialCommunityIcons
            style={{padding: 10}}
            name="chevron-left"
            size={34}
            color="white"
          />
        </TouchableOpacity>
      ),
      // headerRight: () => (
      //   <TouchableOpacity>
      //     <MaterialCommunityIcons
      //       style={{padding: 10}}
      //       name="check-circle-outline"
      //       size={34}
      //       color="white"
      //     />
      //   </TouchableOpacity>
      // ),
    });
  }, []);

  const [post, setPost] = useState({
    userCd: route.params.user.userCd,
    groupCd: null,
    postOriginCd: null,
    scheduleCd: null,
    mediaCd: null,
    postEx: null,
    postPublicState: 0,
    postScheduleShareState: false,
  });

  const [scheduleInfo, setScheduleInfo] = useState({
    tabCd: null,
    userCd: route.params.user.userCd,
    scheduleNm: '',
    scheduleEx: '',
    scheduleStr: new Date(),
    scheduleEnd: addHours(new Date(), 1),
    scheduleCol: 'rgb(64, 114, 89)',
    schedulePublicState: 0,
    scheduleMembers: [],
  });

  const [selectedValue, setSelectedValue] = useState('그룹 미선택');
  const [selectedPublic, setSelectedPublic] = useState('전체공개');

  const [isScheduleClick, setIsScheduleClick] = useState(false);
  const [isMediaClick, setIsMediaClick] = useState(false);

  const [mode, setMode] = useState('');

  const [startShow, setStartShow] = useState(false);

  const [endShow, setEndShow] = useState(false);

  const onStartChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setStartShow(false);
    setScheduleInfo({
      ...scheduleInfo,
      scheduleStr: currentDate,
      scheduleEnd: addHours(currentDate, 1),
    });
  };

  const onEndChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setEndShow(false);
    setScheduleInfo({
      ...scheduleInfo,
      scheduleEnd: currentDate,
    });
  };

  return (
    <KeyboardAwareScrollView style={styles.container}>
      <Picker
        mode="dropdown"
        selectedValue={selectedValue}
        style={{height: 50}}
        onValueChange={(itemValue, itemIndex) => {
          setSelectedValue(itemValue);
          setPost({...post, groupCd: itemValue});
          console.log(itemValue);
        }}>
        <Picker.Item label="그룹 미선택" value={null} />
        {route.params.groupList.map((value, index) => (
          <Picker.Item label={value.groupNm} value={value.groupCd} />
        ))}
      </Picker>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginBottom: 10,
        }}>
        <View style={styles.flexRow}>
          <Image
            source={{
              uri: route.params.user.userPic,
            }}
            style={{
              width: 50,
              height: 50,
              resizeMode: 'cover',
              borderRadius: 50,
            }}
          />
          <Text style={{padding: 10, fontSize: 20}}>
            {route.params.user.userNm}
          </Text>
        </View>
        <View style={styles.flexRow}>
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => setIsScheduleClick(!isScheduleClick)}>
            {isScheduleClick === true ? (
              <MaterialCommunityIcons
                name="calendar"
                size={30}
                style={{color: 'rgb(64, 114, 89)'}}
              />
            ) : (
              <MaterialCommunityIcons name="calendar" size={30} />
            )}
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => setIsMediaClick(!isMediaClick)}>
            {isMediaClick === true ? (
              <MaterialIcons
                name="perm-media"
                size={30}
                style={{color: 'rgb(64, 114, 89)'}}
              />
            ) : (
              <MaterialIcons name="perm-media" size={30} />
            )}
          </TouchableOpacity>
          {post.groupCd === null ? (
            <Picker
              mode="dialog"
              selectedValue={selectedPublic}
              style={{
                height: 30,
                width: 120,
              }}
              onValueChange={(itemValue, itemIndex) => {
                setSelectedPublic(itemValue);
                setPost({...post, postPublicState: itemValue});
              }}>
              <Picker.Item label="전체공개" value={0} />
              <Picker.Item label="팔로워만" value={1} />
              <Picker.Item label="친구만" value={2} />
              <Picker.Item label="나만보기" value={3} />
            </Picker>
          ) : (
            <Picker
              mode="dialog"
              selectedValue={selectedPublic}
              style={{
                height: 30,
                width: 120,
              }}
              onValueChange={(itemValue, itemIndex) => {
                setSelectedPublic(itemValue);
                setPost({...post, postPublicState: itemValue});
              }}>
              <Picker.Item label="전체공개" value={0} />
              <Picker.Item label="비공개" value={3} />
            </Picker>
          )}
        </View>
      </View>
      {isScheduleClick === true ? (
        <TextInput
          autoFocus={true}
          style={{
            height: 40,
            borderBottomColor: 'lightgray',
            borderBottomWidth: 1,
          }}
          placeholder="일정제목"
          maxLength={200}
          onChangeText={(value) =>
            setScheduleInfo({...scheduleInfo, scheduleNm: value})
          }
        />
      ) : null}
      <TextInput
        style={{
          maxHeight: 200,
          borderBottomColor: 'lightgray',
          borderBottomWidth: 1,
        }}
        placeholder="내용을 입력하세요"
        autoFocus={true}
        multiline={true}
        maxLength={2000}
        onChangeText={(value) => setPost({...post, postEx: value})}
      />

      {isScheduleClick === true ? (
        <>
          <View
            style={[
              {
                // borderTopColor: 'lightgray',
                // borderTopWidth: 1,
                paddingTop: 10,
                marginBottom: 5,
                paddingLeft: 5,
              },
              styles.spaceBetween,
            ]}>
            <View style={{flex: 1}}>
              <Text>시작날짜</Text>
              <TouchableOpacity
                onPress={() => {
                  setMode('date'), setStartShow(true);
                }}>
                <Text
                  style={{fontSize: 16, fontWeight: 'bold', paddingRight: 5}}>
                  {dateFns.format(scheduleInfo.scheduleStr, 'yyyy.M.d EEE')}
                </Text>
              </TouchableOpacity>
            </View>
            <View style={{flex: 1}}>
              <Text>시작시간</Text>
              <TouchableOpacity
                onPress={() => {
                  setMode('time'), setStartShow(true);
                }}>
                <Text
                  style={{fontSize: 16, fontWeight: 'bold', paddingRight: 5}}>
                  {dateFns.format(scheduleInfo.scheduleStr, 'a h:mm')}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <View
            style={[
              {
                // borderTopColor: 'lightgray',
                // borderTopWidth: 1,
                paddingTop: 10,
                marginBottom: 5,
                paddingLeft: 5,
              },
              styles.spaceBetween,
            ]}>
            <View style={{flex: 1}}>
              <Text>종료날짜</Text>
              <TouchableOpacity
                onPress={() => {
                  setMode('date'), setEndShow(true);
                }}>
                <Text
                  style={{fontSize: 16, fontWeight: 'bold', paddingRight: 5}}>
                  {dateFns.format(scheduleInfo.scheduleEnd, 'yyyy.M.d EEE')}
                </Text>
              </TouchableOpacity>
            </View>
            <View style={{flex: 1}}>
              <Text>종료시간</Text>
              <TouchableOpacity
                onPress={() => {
                  setMode('time'), setEndShow(true);
                }}>
                <Text
                  style={{fontSize: 16, fontWeight: 'bold', paddingRight: 5}}>
                  {dateFns.format(scheduleInfo.scheduleEnd, 'a h:mm')}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </>
      ) : null}
      {startShow === true ? (
        <DateTimePicker
          value={scheduleInfo.scheduleStr}
          mode={mode}
          is24Hour={true}
          display="default"
          onChange={onStartChange}
        />
      ) : endShow === true ? (
        <DateTimePicker
          value={scheduleInfo.scheduleEnd}
          mode={mode}
          is24Hour={true}
          display="default"
          onChange={onEndChange}
        />
      ) : null}
      <TouchableOpacity style={styles.addTag}>
        <Text>게시물을 함께할 사람 태그하기</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.addTag}
        onPress={() =>
          Alert.alert(
            '게시물 추가',
            '게시물을 추가하시겠습니까?',
            [
              {
                text: '아니오',
                onPress: () => console.log(postEx),
                style: 'cancel',
              },
              {
                text: '예',
                onPress: async () => {
                  try {
                    var getScheduleCd = null;
                    if (isScheduleClick === true) {
                      getScheduleCd = (
                        await axios.post(
                          'http://ec2-15-165-140-48.ap-northeast-2.compute.amazonaws.com:8080/schedule/',
                          {
                            tabCd: null,
                            groupCd: post.groupCd,
                            userCd: route.params.user.userCd,
                            scheduleNm: scheduleInfo.scheduleNm,
                            scheduleEx: post.postEx,
                            scheduleStr: scheduleInfo.scheduleStr.getTime(),
                            scheduleEnd: scheduleInfo.scheduleEnd.getTime(),
                            scheduleCol: scheduleInfo.scheduleCol,
                            scheduleMember: scheduleInfo.scheduleMembers,
                            schedulePublicState:
                              scheduleInfo.schedulePublicState,
                          },
                        )
                      ).data;
                      console.log(getScheduleCd);
                    }
                    const postData = (
                      await axios.post(
                        `http://ec2-15-165-140-48.ap-northeast-2.compute.amazonaws.com:8080/post/`,
                        {
                          userCd: route.params.user.userCd,
                          groupCd: post.groupCd,
                          postOriginCd: null,
                          scheduleCd: getScheduleCd,
                          mediaCd: null,
                          postEx: post.postEx,
                          postPublicState: 0,
                          postScheduleShareState: false,
                        },
                      )
                    ).data;
                    console.log(postData);
                    if (postData !== '') {
                      navigation.goBack();
                    }
                  } catch (e) {
                    console.log(e);
                  }
                },
              },
            ],
            {cancelable: false},
          )
        }>
        <Text>추가</Text>
      </TouchableOpacity>
    </KeyboardAwareScrollView>
  );
};

export default AddPostTab;

const styles = StyleSheet.create({
  container: {padding: 10},
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
  addButton: {
    padding: 5,
    margin: 5,
  },
  addTag: {
    padding: 10,
    borderWidth: 1,
    borderColor: 'lightgray',
    marginTop: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
