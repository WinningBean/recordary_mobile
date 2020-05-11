import React, {useState, useLayoutEffect, useRef} from 'react';
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
} from 'react-native';

import * as dateFns from 'date-fns';

import ClickPicture from './ClickPicture';

import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import FastImage from 'react-native-fast-image';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {createStackNavigator} from '@react-navigation/stack';

import Calendar from 'Containers/Tab/ProfileTab/Calendar';

const Stack = createStackNavigator();

const {width} = Dimensions.get('window');

const ProfileTab = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="profile" component={Profile} />
    </Stack.Navigator>
  );
};

const Profile = ({navigation}) => {
  const [content, setContent] = useState(`Hello
World`);
  const value = useRef(new Animated.Value(40)).current;
  const [isFullCalendar, setIsFullCalender] = useState(false);
  const [clickPicture, setClickPicture] = useState(null);
  const [height, setHeight] = useState(undefined);
  useLayoutEffect(() => {
    navigation.setOptions({
      title: '프로필',
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

  const [imageList, setImageList] = useState([
    [
      'https://file3.instiz.net/data/file3/2018/01/31/6/c/f/6cf544c9adce51443d50013f636b2639.jpg',
    ],
    ['https://i.pinimg.com/564x/b4/00/e8/b400e8388e84a012ccc75ef264941f9c.jpg'],
    [
      'https://file3.instiz.net/data/file3/2018/01/31/6/c/f/6cf544c9adce51443d50013f636b2639.jpg',
    ],
    [
      'https://mblogthumb-phinf.pstatic.net/MjAxODA3MTRfMjkw/MDAxNTMxNTAwMDk1MDkw.1qrloWvjf71wVtMdQAMYb5O1u8l_2z1YnemfLv6djXIg.9ScPpzgWGdbG6D3UtIVo28Wlg1hLmfrKG5a9CgzWvvog.GIF.grace4088/99E21E3F5B3F31C1367679.gif?type=w800',
      'https://file3.instiz.net/data/file3/2018/01/31/6/c/f/6cf544c9adce51443d50013f636b2639.jpg',
    ],
  ]);

  const [type, setType] = useState(0);
  // 0 캘린더
  // 1 타임라인
  // 2 사진

  const timeline = useState({
    post: [
      {
        postForm: 0,
        post_cd: 1,
        user_id: 'HwangSG',
        user_pic:
          'https://file3.instiz.net/data/file3/2018/01/31/6/c/f/6cf544c9adce51443d50013f636b2639.jpg',
        group_cd: null,
        uploadDate: new Date(),
        post_pic: [
          'https://i.pinimg.com/564x/b4/00/e8/b400e8388e84a012ccc75ef264941f9c.jpg',
          'https://file3.instiz.net/data/file3/2018/01/31/6/c/f/6cf544c9adce51443d50013f636b2639.jpg',
          'https://mblogthumb-phinf.pstatic.net/MjAxODA3MTRfMjkw/MDAxNTMxNTAwMDk1MDkw.1qrloWvjf71wVtMdQAMYb5O1u8l_2z1YnemfLv6djXIg.9ScPpzgWGdbG6D3UtIVo28Wlg1hLmfrKG5a9CgzWvvog.GIF.grace4088/99E21E3F5B3F31C1367679.gif?type=w800',
        ],
        post_title: '팔색조와 여행😁',
        post_ex:
          '1일차 : 천사곱창에서 1차😍 보드게임방에서에서에서에서에서 2차🐱‍👤\n2일차 : 치치에서 1차~ 오술차에서 2차!!🍺🍻\n3일차 : 김밥천국에서 냠냠🍳🍱🍜\n4일차 : 본캠 카페!~~!~!🥛☕',
        post_str_ymd: new Date(),
        post_end_ymd: new Date('2020-05-14'),
        postLikeCount: 5,
        postLikePerson: 'WiSungho',
      },
      {
        postForm: 0,
        post_cd: 2,
        user_id: 'WeeSungHo',
        user_pic:
          'https://i.pinimg.com/564x/b4/00/e8/b400e8388e84a012ccc75ef264941f9c.jpg',
        group_cd: null,
        uploadDate: new Date('2020-04-12'),
        post_pic: [
          'data:image/jpeg;base64,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',
          'https://mblogthumb-phinf.pstatic.net/MjAxODA3MTRfMjkw/MDAxNTMxNTAwMDk1MDkw.1qrloWvjf71wVtMdQAMYb5O1u8l_2z1YnemfLv6djXIg.9ScPpzgWGdbG6D3UtIVo28Wlg1hLmfrKG5a9CgzWvvog.GIF.grace4088/99E21E3F5B3F31C1367679.gif?type=w800',
          'https://i.pinimg.com/564x/b4/00/e8/b400e8388e84a012ccc75ef264941f9c.jpg',
        ],
        post_title: '팔색조와 여행😁',
        post_ex:
          '1일차 : 천사곱창에서 1차😍 보드게임방에서에서에서에서에서 2차🐱‍👤\n2일차 : 치치에서 1차~ 오술차에서 2차!!🍺🍻\n3일차 : 김밥천국에서 냠냠🍳🍱🍜\n4일차 : 본캠 카페!~~!~!🥛☕',
        post_str_ymd: new Date(),
        post_end_ymd: new Date('2020-05-14'),
        postLikeCount: 5,
        postLikePerson: 'WiSungho',
      },
    ],
  })[0];

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
                  <FastImage
                    resizeMode={FastImage.resizeMode.cover}
                    source={{uri: 'https://unsplash.it/400/400?image=1'}}
                    style={{height: 90, width: 90, borderRadius: 50}}
                  />
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
                    <Text
                      style={{
                        fontSize: 18,
                        textAlign: 'center',
                      }}>
                      {`fornals222 (위성호)`}
                    </Text>
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
                    <TouchableOpacity style={{flex: 1}}>
                      <View style={{alignItems: 'center'}}>
                        <Text style={{fontSize: 14}}>팔로우</Text>
                        <Text style={{fontSize: 16}}>20</Text>
                      </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={{flex: 1}}>
                      <View style={{alignItems: 'center', marginLeft: 10}}>
                        <Text style={{fontSize: 14}}>팔로잉</Text>
                        <Text style={{fontSize: 16}}>20</Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
              <View style={styles.profileContent}>
                <View style={{flex: 2}}>
                  <View
                    style={{
                      flex: 1,
                      paddingLeft: 20,
                      borderRadius: 5,
                    }}>
                    <Text
                      style={[
                        {fontSize: 14},
                        content === '' ? null : {marginVertical: 10},
                      ]}>
                      {content}
                    </Text>
                  </View>
                </View>
              </View>
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
            <View style={{flex: 1, justifyContent: 'center'}}>
              <View style={styles.profileInfo}>
                <View
                  style={{
                    flex: 2,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <FastImage
                    resizeMode={FastImage.resizeMode.cover}
                    source={{uri: 'https://unsplash.it/400/400?image=1'}}
                    style={{height: 90, width: 90, borderRadius: 50}}
                  />
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
                    <Text
                      style={{
                        fontSize: 18,
                        textAlign: 'center',
                      }}>
                      {`fornals222 (위성호)`}
                    </Text>
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
                    <TouchableOpacity style={{flex: 1}}>
                      <View style={{alignItems: 'center'}}>
                        <Text style={{fontSize: 14}}>팔로우</Text>
                        <Text style={{fontSize: 16}}>20</Text>
                      </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={{flex: 1}}>
                      <View style={{alignItems: 'center', marginLeft: 10}}>
                        <Text style={{fontSize: 14}}>팔로잉</Text>
                        <Text style={{fontSize: 16}}>20</Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
              <View style={styles.profileContent}>
                <View style={{flex: 2}}>
                  <View
                    style={{
                      flex: 1,
                      paddingLeft: 20,
                      borderRadius: 5,
                    }}>
                    <Text
                      style={[
                        {fontSize: 14},
                        content === '' ? null : {marginVertical: 10},
                      ]}>
                      {content}
                    </Text>
                  </View>
                </View>
              </View>
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
            timeline.post.map((value, index) => (
              <View style={styles.post} key={`post${index}`}>
                <View style={styles.spaceBetween}>
                  <View style={styles.flexRow}>
                    <Image
                      source={{
                        uri: value.user_pic,
                      }}
                      style={{
                        width: 50,
                        height: 50,
                        resizeMode: 'cover',
                        borderRadius: 50,
                      }}
                    />
                    <Text style={{padding: 10, fontSize: 20}}>
                      {value.user_id}
                    </Text>
                  </View>
                  <View style={styles.flexRow}>
                    <Text>{`${Math.abs(
                      dateFns.differenceInDays(value.uploadDate, new Date()),
                    )}일 전`}</Text>
                    <TouchableOpacity style={{padding: 5}}>
                      <MaterialIcons name="more-vert" size={25} />
                    </TouchableOpacity>
                  </View>
                </View>
                <View style={styles.spaceBetween}>
                  <Text style={{fontWeight: 'bold'}}>{value.post_title}</Text>
                  <TouchableOpacity style={{padding: 5}}>
                    {content === true ? (
                      <MaterialIcons
                        onPress={() => setContent(false)}
                        name="arrow-drop-up"
                        size={25}
                      />
                    ) : (
                      <MaterialIcons
                        onPress={() => setContent(true)}
                        name="arrow-drop-down"
                        size={25}
                      />
                    )}
                  </TouchableOpacity>
                </View>
                {content === true ? (
                  <View style={styles.spaceBetween}>
                    <Text
                      style={{
                        width: Dimensions.get('window').width * 0.8,
                        marginBottom: 5,
                      }}>
                      {value.post_ex}
                    </Text>
                  </View>
                ) : null}
                <ScrollView
                  horizontal={true}
                  pagingEnabled={true}
                  showsHorizontalScrollIndicator={false}>
                  {value.post_pic.map((val, index) => (
                    <Image
                      key={`img-${index}`}
                      source={{
                        uri: val,
                      }}
                      style={styles.postImage}
                    />
                  ))}
                </ScrollView>
                <View style={styles.flexRow}>
                  <TouchableOpacity style={{padding: 5}}>
                    <MaterialCommunityIcons name="thumb-up" size={25} />
                  </TouchableOpacity>
                  <Text>{`${value.postLikePerson} 님 외 ${value.postLikeCount}명이 좋아합니다`}</Text>
                </View>
                <View style={styles.spaceBetween}>
                  <View style={styles.flexRow}>
                    <Image
                      source={{
                        uri:
                          'https://file3.instiz.net/data/file3/2018/01/31/6/c/f/6cf544c9adce51443d50013f636b2639.jpg',
                      }}
                      style={styles.commentImage}
                    />
                    <TouchableOpacity
                      onPress={() =>
                        navigation.push('comment', {postData: value})
                      }>
                      <TextInput
                        style={{height: 40, paddingLeft: 10}}
                        placeholder="댓글을 입력하세요..."
                        maxLength={200}
                        editable={false}
                      />
                    </TouchableOpacity>
                  </View>

                  <TouchableOpacity
                    style={{padding: 5}}
                    onPress={() => {
                      navigation.push('comment', {postData: value});
                    }}>
                    <Text style={{padding: 5, fontWeight: 'bold'}}>
                      more ››
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))
          ) : (
            <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
              {imageList.map((value, index) => {
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
                      source={{uri: value[0]}}
                      style={{width: width * 0.3333, height: width * 0.3333}}
                    />
                  </TouchableOpacity>
                );
              })}
              {clickPicture === null ? null : (
                <ClickPicture
                  imageList={clickPicture}
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

export default ProfileTab;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
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
