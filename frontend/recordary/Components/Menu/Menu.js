import React, {useState, useMemo, useRef, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  TouchableNativeFeedback,
  Alert,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import FastImage from 'react-native-fast-image';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {Transition, Transitioning} from 'react-native-reanimated';
import axios from 'axios';

const window = Dimensions.get('window');

const Menu = (props) => {
  console.log(props, 'isProps');
  const navigation = useNavigation();
  const [isClickFriend, setIsClickFriend] = useState(false);
  const [currUser, setCurrUser] = useState(props.user);
  const menuRef = useRef();

  const getGroupList = async () => {
    try {
      const {data} = await axios.get(
        `http://ec2-15-165-140-48.ap-northeast-2.compute.amazonaws.com:8080/group/group/${currUser.userCd}`,
      );
      if (data.length === 0) {
        props.onSaveGroupList([]);
      }
      props.onSaveGroupList(data);
    } catch (error) {
      console.error(error);
      Alert.alert('서버에러로 인하여 데이터를 받아오는데 실패하였습니다.');
    }
  };

  const getFriendList = async () => {
    try {
      const {data} = await axios.get(
        `http://ec2-15-165-140-48.ap-northeast-2.compute.amazonaws.com:8080/friends/${currUser.userCd}`,
      );
      if (data === '') {
        props.onSaveFriendList([]);
      }
      props.onSaveFriendList(data);
    } catch (error) {
      console.error(error);
      Alert.alert('서버에러로 인하여 데이터를 받아오는데 실패하였습니다.');
    }
  };

  const groupList = () => {
    if (props.groupList === undefined) {
      getGroupList();
    } else {
      return props.groupList.map((value) => (
        <TouchableNativeFeedback
          key={value.groupCd}
          onPress={() => {
            navigation.push('otherProfile', {
              group: value,
              user: props.user,
              isGroup: true,
            });
          }}>
          <View style={styles.box}>
            <View
              style={{
                width: 60,
                height: 60,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <FastImage
                source={{uri: value.groupPic}}
                style={{width: 40, height: 40, borderRadius: 50}}
                resizeMode="cover"
              />
            </View>
            <View style={{justifyContent: 'center'}}>
              <Text style={{fontSize: 16}}>{value.groupNm}</Text>
              {/* <Text style={{fontSize: 13, color: 'gray'}}>{value.groupEx}</Text> */}
            </View>
          </View>
        </TouchableNativeFeedback>
      ));
    }
  };

  const friendList = () => {
    if (props.friendList === undefined) {
      getFriendList();
    } else {
      return props.friendList.map((value) => (
        <TouchableNativeFeedback
          key={value.groupCd}
          onPress={() => {
            navigation.push('otherProfile', {user: value, isGroup: false});
          }}>
          <View
            style={[
              styles.box,
              value.isLogin
                ? {borderLeftColor: 'green', borderLeftWidth: 3}
                : null,
            ]}
            key={value.userCd}>
            <View
              style={{
                width: 60,
                height: 60,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <FastImage
                source={{uri: value.userPic}}
                style={{width: 40, height: 40, borderRadius: 50}}
                resizeMode="cover"
              />
            </View>
            <View style={{justifyContent: 'center', marginBottom: 5}}>
              <Text style={{fontSize: 16}}>{value.userId}</Text>
              <Text style={{fontSize: 13, color: 'gray'}}>{value.userNm}</Text>
            </View>
          </View>
        </TouchableNativeFeedback>
      ));
    }
  };

  const changeClick = (isFriend) => {
    if (isFriend === isClickFriend) return;
    menuRef.current.animateNextTransition();
    setIsClickFriend(isFriend);
  };

  return (
    <View>
      <View
        style={{
          height: window.height * 0.16,
          backgroundColor: 'white',
          // backgroundColor: 'lightgray',
          justifyContent: 'center',
          paddingHorizontal: 18,
        }}>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <View
            style={{
              flexDirection: 'row',
            }}>
            <View>
              {currUser.userPic === null
                ? setCurrUser({
                    ...currUser,
                    userPic:
                      'https://recordary-springboot-upload.s3.ap-northeast-2.amazonaws.com/user/basic.png',
                  })
                : null}
              <FastImage
                source={{uri: currUser.userPic}}
                style={{
                  width: 60,
                  height: 60,
                  borderRadius: 50,
                }}
              />
            </View>
            <View style={{paddingLeft: 10}}>
              <Text style={{fontSize: 20, fontWeight: 'bold', paddingLeft: 4}}>
                {currUser.userId}
              </Text>
              <Text style={{color: 'gray'}}> {currUser.userNm}</Text>
            </View>
          </View>
          <View style={{marginTop: 10}}>
            <TouchableOpacity
              onPress={() =>
                navigation.push('profileEdit', {
                  currentUser: currUser,
                })
              }>
              <MaterialIcons name="edit" size={30} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
          alignItems: 'center',
          borderBottomColor: '#eeeeee',
          borderBottomWidth: 1,
          height: 30,
        }}>
        <TouchableOpacity
          style={{flex: 1, height: 30, alignItems: 'center'}}
          onPress={() => changeClick(false)}>
          <Text>그룹</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{flex: 1, height: 30, alignItems: 'center'}}
          onPress={() => changeClick(true)}>
          <Text>친구</Text>
        </TouchableOpacity>
      </View>
      <Transitioning.View
        ref={menuRef}
        transition={<Transition.Change />}
        style={[
          {
            height: 1,
            width: window.width * 0.35,
            backgroundColor: 'black',
          },
          isClickFriend ? {marginLeft: window.width * 0.35} : null,
        ]}
      />
      <ScrollView style={{height: window.height * 0.74, paddingHorizontal: 18}}>
        {isClickFriend ? friendList() : groupList()}
      </ScrollView>
      <View
        style={[
          styles.spaceBetween,
          {
            borderTopColor: '#eee',
            borderTopWidth: 1,
            height: window.height * 0.06,
          },
        ]}>
        <Text style={{color: 'gray', marginLeft: 15}}>From.FairyPitta</Text>
        <TouchableOpacity
          style={{padding: 10}}
          onPress={() => navigation.push('setting')}>
          <MaterialIcons name="settings" size={25} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Menu;

const styles = StyleSheet.create({
  box: {
    height: 60,
    flexDirection: 'row',
    borderBottomColor: '#eeeeee',
    borderBottomWidth: 1,
    paddingLeft: 2,
  },
  spaceBetween: {
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
});
