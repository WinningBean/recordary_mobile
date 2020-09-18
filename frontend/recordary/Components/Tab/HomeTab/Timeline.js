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
  KeyboardAvoidingView,
} from 'react-native';
import * as dateFns from 'date-fns';

import {useNavigation} from '@react-navigation/native';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FastImage from 'react-native-fast-image';
import axios from 'axios';

export default function Timeline({postList, user}) {
  const [data, setData] = useState(postList);
  const [mediaList, setMediaList] = useState([]);
  const [active, setActive] = useState(0);
  const navigation = useNavigation();

  useEffect(() => {
    (async () => {
      try {
        const mediaSrc = (
          await axios.get(
            `http://ec2-15-165-140-48.ap-northeast-2.compute.amazonaws.com:8080/media/${postList.mediaFK.mediaCd}`,
          )
        ).data;
        if (mediaSrc.length < 0) {
          return;
        } else {
          setMediaList(mediaSrc);
        }
      } catch (e) {
        console.error(e);
      }
    })();
  }, []);

  return (
    <View
      style={[styles.post, data.groupFK !== null ? styles.groupBorder : null]}>
      <View style={styles.spaceBetween}>
        {data.groupFK === null ? (
          <View style={styles.flexRow}>
            <Image
              source={{
                uri: data.userFK.userPic,
              }}
              style={{
                width: 40,
                height: 40,
                resizeMode: 'cover',
                borderRadius: 50,
              }}
            />
            <Text style={{padding: 10, fontSize: 18}}>
              {data.userFK.userId}({data.userFK.userNm})
            </Text>
          </View>
        ) : (
          <View style={styles.flexRow}>
            <Image
              source={{
                uri: data.groupFK.groupPic,
              }}
              style={{
                width: 40,
                height: 40,
                resizeMode: 'cover',
                borderRadius: 50,
              }}
            />
            <Text style={{padding: 10, fontSize: 18}}>
              {data.groupFK.groupNm}
            </Text>
            <Image
              source={{
                uri: data.userFK.userPic,
              }}
              style={{
                width: 25,
                height: 25,
                resizeMode: 'cover',
                borderRadius: 50,
              }}
            />
            <Text style={{padding: 10, fontSize: 14, color: 'gray'}}>
              {data.userFK.userId}({data.userFK.userNm})
            </Text>
          </View>
        )}
        <View style={styles.flexRow}>
          <Text>
            {Math.abs(
              dateFns.differenceInDays(
                dateFns.parseISO(data.modifiedDate),
                new Date(),
              ),
            ) === 0
              ? '오늘'
              : `${Math.abs(
                  dateFns.differenceInDays(
                    dateFns.parseISO(data.modifiedDate),
                    new Date(),
                  ),
                )}일 전`}
          </Text>
          <TouchableOpacity style={{padding: 5}}>
            <MaterialIcons name="more-vert" size={25} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.spaceBetween}>
        <Text
          style={{
            width: Dimensions.get('window').width * 0.8,
            marginBottom: 5,
            marginTop: 10,
          }}>
          {data.postEx}
        </Text>
      </View>
      <View>
        <ScrollView
          horizontal={true}
          pagingEnabled={true}
          onScroll={(e) => {
            const slide = Math.ceil(
              e.nativeEvent.contentOffset.x /
                e.nativeEvent.layoutMeasurement.width,
            );
            if (slide !== active) {
              setActive(slide);
            }
          }}
          showsHorizontalScrollIndicator={false}>
          {mediaList.map((val, index) => (
            <FastImage
              key={`img-${index}`}
              source={{
                uri: val,
              }}
              style={styles.postImage}
            />
          ))}
        </ScrollView>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            position: 'absolute',
            bottom: 0,
            alignSelf: 'center',
          }}>
          {mediaList.length > 1
            ? mediaList.map((val, index) => (
                <Text
                  key={index}
                  style={
                    index === active
                      ? styles.pagingActiveText
                      : styles.pagingText
                  }>
                  ⬤
                </Text>
              ))
            : null}
        </View>
      </View>
      <View style={styles.flexRow}>
        <TouchableOpacity
          style={{padding: 5}}
          onPress={async () => {
            try {
              if (data.currentUserLikePost === false) {
                const like = (
                  await axios.post(
                    `http://ec2-15-165-140-48.ap-northeast-2.compute.amazonaws.com:8080/post/${data.postCd}/like`,
                    JSON.stringify(user.userCd),
                    {
                      headers: {'Content-Type': 'application/json'},
                    },
                  )
                ).data;
                console.log(like);
                if (like) {
                  setData({
                    ...data,
                    currentUserLikePost: true,
                    postLikeCount: data.postLikeCount + 1,
                    postLikeFirstUser:
                      data.postLikeFirstUser === null
                        ? user
                        : data.postLikeFirstUser,
                  });
                }
              } else {
                const unLike = (
                  await axios.delete(
                    `http://ec2-15-165-140-48.ap-northeast-2.compute.amazonaws.com:8080/post/${data.postCd}/unLike`,
                    {params: {userCd: user.userCd}},
                  )
                ).data;
                setData({
                  ...data,
                  currentUserLikePost: false,
                  postLikeCount: data.postLikeCount - 1,
                  postLikeFirstUser: (await axios.get(`/post/${data.postCd}`))
                    .data.postLikeFirstUser,
                  // data.postLikeFirstUser.userCd === props.user.userCd ? null : data.postLikeForstUser,
                  // data.postLikeFirstUser.userCd === props.user.userCd ? 다음 사람의 데이터...ㅠ : data.postLikeForstUser,
                });
              }
            } catch (e) {
              console.log(e);
            }
          }}>
          <MaterialCommunityIcons
            name="thumb-up"
            size={25}
            style={
              data.currentUserLikePost ? {color: 'rgb(64, 114, 89)'} : null
            }
          />
        </TouchableOpacity>
        {data.postLikeCount < 1 ? (
          <Text>첫번째 좋아요를 눌러주세욤</Text>
        ) : data.postLikeCount === 1 ? (
          <Text>{`${data.postLikeFirstUser.userId}(${data.postLikeFirstUser.userNm}) 님이 좋아합니다`}</Text>
        ) : (
          <Text>
            {`${data.postLikeFirstUser.userId}(${
              data.postLikeFirstUser.userNm
            }) 님 외 ${data.postLikeCount - 1}명이 좋아합니다`}
          </Text>
        )}
      </View>
      <View style={styles.spaceBetween}>
        <KeyboardAvoidingView style={styles.flexRow} enabled={true}>
          <Image
            source={{
              uri: user.userPic,
            }}
            style={styles.commentImage}
          />
          <TouchableOpacity
            onPress={() =>
              navigation.push('comment', {post: data, user: user})
            }>
            <TextInput
              style={{height: 40, paddingLeft: 10}}
              placeholder="댓글을 입력하세요..."
              maxLength={200}
              editable={false}
            />
          </TouchableOpacity>
        </KeyboardAvoidingView>

        <TouchableOpacity
          style={{padding: 5}}
          onPress={() => {
            navigation.push('comment', {post: data, user: user});
          }}>
          <Text style={{padding: 5, fontWeight: 'bold'}}>more ››</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  post: {
    padding: 5,
    marginBottom: 30,
    // marginLeft: 10,
    // marginRight: 10,
    backgroundColor: 'white',
    elevation: 2,
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
    width: Dimensions.get('window').width * 0.95,
    height: Dimensions.get('window').width * 0.95,
    resizeMode: 'cover',
    margin: 5,
  },
  commentImage: {
    width: 30,
    height: 30,
    resizeMode: 'cover',
    borderRadius: 50,
  },
  groupBorder: {
    borderTopColor: 'tomato',
    borderTopWidth: 3,
  },
  pagingText: {color: '#888', marginBottom: 7, marginLeft: 2, marginRight: 2},
  pagingActiveText: {
    color: 'white',
    marginBottom: 6,
    marginLeft: 2,
    marginRight: 2,
  },
});
