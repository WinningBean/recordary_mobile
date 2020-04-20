import React, {useState, useMemo, useRef, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import FastImage from 'react-native-fast-image';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {Transition, Transitioning} from 'react-native-reanimated';

const Menu = () => {
  const navigation = useNavigation();

  const [isClickFriend, setIsClickFriend] = useState(true);
  const menuRef = useRef();
  const data = useState({
    currentUser: {
      id: 'fornals222',
      nm: '위성호',
      pic: 'https://unsplash.it/400/400?image=1',
      ex: 'ㅈ데렂덜ㄴ으뤌ㅇㅈ다루포여ㅑㄷ저ㅗㅠ허ㅑ대자러ㅑㄷ자ㅓ',
    },
    group: [
      {
        nm: '졸업작품',
        pic: 'https://unsplash.it/400/400?image=5',
        master: '위승빈',
      },
    ],
    friend: [
      {
        nm: '홍길동',
        id: 'hong1234',
        pic: 'https://unsplash.it/400/400?image=2',
        isLogin: true,
      },
      {
        nm: '김길동',
        id: 'iamkim486',
        pic: 'https://unsplash.it/400/400?image=3',
        isLogin: false,
      },
      {
        nm: '위길동',
        id: 'howareyou',
        pic: 'https://unsplash.it/400/400?image=4',
        isLogin: true,
      },
    ],
  })[0];

  const groupList = useMemo(() => {
    return data.group.map((value) => (
      <View style={styles.box} key={value.nm}>
        <View
          style={{
            width: 60,
            height: 60,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <FastImage
            source={{uri: value.pic}}
            style={{width: 40, height: 40, borderRadius: 50}}
            resizeMode="cover"
          />
        </View>
        <View style={{justifyContent: 'center'}}>
          <Text style={{fontSize: 16}}>{value.nm}</Text>
          <Text style={{fontSize: 13, color: 'gray'}}>{value.master}</Text>
        </View>
      </View>
    ));
  }, [data]);

  const friendList = useMemo(() => {
    return data.friend.map((value) => (
      <View
        style={[
          styles.box,
          value.isLogin ? {borderLeftColor: 'green', borderLeftWidth: 3} : null,
        ]}
        key={value.nm}>
        <View
          style={{
            width: 60,
            height: 60,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <FastImage
            source={{uri: value.pic}}
            style={{width: 40, height: 40, borderRadius: 50}}
            resizeMode="cover"
          />
        </View>
        <View style={{justifyContent: 'center'}}>
          <Text style={{fontSize: 16}}>{value.nm}</Text>
          <Text style={{fontSize: 13, color: 'gray'}}>{value.id}</Text>
        </View>
      </View>
    ));
  }, [data]);

  const changeClick = (isFriend) => {
    if (isFriend === isClickFriend) return;
    menuRef.current.animateNextTransition();
    setIsClickFriend(isFriend);
  };

  return (
    <View>
      <View style={{paddingHorizontal: 18}}>
        <View
          style={{
            height: Dimensions.get('window').height * 0.16,
            backgroundColor: 'white',
            // backgroundColor: 'lightgray',
            justifyContent: 'center',
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
                <FastImage
                  source={{uri: data.currentUser.pic}}
                  style={{
                    width: 60,
                    height: 60,
                    borderRadius: 50,
                  }}
                />
              </View>
              <View style={{paddingLeft: 10}}>
                <Text style={{fontSize: 20, fontWeight: 'bold'}}>
                  {data.currentUser.id}
                </Text>
                <Text style={{color: 'gray'}}>{data.currentUser.nm}</Text>
              </View>
            </View>
            <View style={{marginTop: 10}}>
              <TouchableOpacity
                onPress={() =>
                  navigation.push('profileEdit', {
                    currentUser: data.currentUser,
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
              width: Dimensions.get('window').width * 0.31,
              backgroundColor: 'black',
            },
            isClickFriend
              ? {marginLeft: Dimensions.get('window').width * 0.31}
              : null,
          ]}
        />
        <ScrollView style={{height: Dimensions.get('window').height * 0.8}}>
          {isClickFriend ? friendList : groupList}
        </ScrollView>
      </View>

      <View
        style={[
          styles.spaceBetween,
          {
            backgroundColor: '#eee',
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
