import React, {useLayoutEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Picker,
  Image,
  TextInput,
  ScrollView,
  Dimensions,
} from 'react-native';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';
import * as dateFns from 'date-fns';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FastImage from 'react-native-fast-image';

const Stack = createStackNavigator();

const HomeTab = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="home" component={Home} />
    </Stack.Navigator>
  );
};

const Home = ({navigation}) => {
  const [content, setContent] = useState(false);
  const data = useState({
    post: [
      {
        postForm: 0,
        post_cd: 4,
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
    ],
  })[0];

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Recordary',
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

  return (
    <ScrollView style={styles.container}>
      {data.post.map((value, index) => (
        <View style={styles.post} key={`post${index}`}>
          <View style={styles.spaceBetween}>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
              }}>
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
              <Text style={{padding: 10, fontSize: 20}}>{value.user_id}</Text>
            </View>
            <View style={styles.flexRow}>
              <Text>{`${dateFns.differenceInDays(
                value.uploadDate,
                new Date(),
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
              <TextInput
                style={{height: 40, paddingLeft: 10}}
                placeholder="댓글을 입력하세요..."
                maxLength={200}
              />
            </View>

            <TouchableOpacity
              style={{padding: 5}}
              onPress={() => {
                navigation.push('comment', {postData: value});
              }}>
              <Text style={{padding: 5, fontWeight: 'bold'}}>more ››</Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}
    </ScrollView>
  );
};

export default HomeTab;

const styles = StyleSheet.create({
  container: {
    paddingTop: 5,
    paddingBottom: 5,
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
});
