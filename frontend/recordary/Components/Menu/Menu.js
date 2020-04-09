import React, {useState, useMemo} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Dimensions,
  TouchableOpacity,
} from 'react-native';

import FastImage from 'react-native-fast-image';

const Menu = () => {
  const [isClickFriend, setIsClickFriend] = useState(false);
  const data = useState({
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

  return (
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
            flexDirection: 'row',
          }}>
          <View>
            <FastImage
              source={{uri: 'https://unsplash.it/400/400?image=1'}}
              style={{
                width: 60,
                height: 60,
                borderRadius: 50,
              }}
            />
          </View>
          <View style={{paddingLeft: 10}}>
            <Text style={{fontSize: 20, fontWeight: 'bold'}}>fornals222</Text>
            <Text style={{color: 'gray'}}>위성호</Text>
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
          style={[
            {flex: 1, height: 30, alignItems: 'center'},
            isClickFriend
              ? null
              : {borderBottomColor: 'black', borderBottomWidth: 1},
          ]}
          onPress={() => setIsClickFriend(false)}>
          <Text>그룹</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            {flex: 1, height: 30, alignItems: 'center'},
            isClickFriend
              ? {borderBottomColor: 'black', borderBottomWidth: 1}
              : null,
          ]}
          onPress={() => setIsClickFriend(true)}>
          <Text>친구</Text>
        </TouchableOpacity>
      </View>
      <ScrollView>{isClickFriend ? friendList : groupList}</ScrollView>
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
});
