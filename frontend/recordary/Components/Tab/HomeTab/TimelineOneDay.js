import React, {useLayoutEffect, useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  TextInput,
  Dimensions,
  KeyboardAvoidingView,
} from 'react-native';
import * as dateFns from 'date-fns';
import {useNavigation} from '@react-navigation/native';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export default function TimelineOneDay({postList, user}) {
  const [data, setData] = useState(postList);
  const navigation = useNavigation();

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
            <Text
              style={{
                padding: 10,
                fontSize: 14,
              }}>
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
      <View style={[{paddingLeft: 5}, styles.flexRow, styles.oneSchedule]}>
        <Text style={{fontSize: 16}}>{data.scheduleFK.scheduleNm}</Text>
      </View>
      {data.scheduleFK.scheduleEx !== '' ? (
        <View
          style={[
            {
              paddingLeft: 5,
              paddingTop: 10,
              paddingBottom: 10,
              borderBottomColor: 'lightgray',
              borderBottomWidth: 1,
            },
            styles.flexRow,
          ]}>
          <Text>{data.scheduleFK.scheduleEx}</Text>
        </View>
      ) : null}

      <View style={[styles.spaceBetween, styles.oneSchedule]}>
        <Text>시작 날짜</Text>
        <Text>
          {dateFns.format(
            dateFns.parseISO(data.scheduleFK.scheduleStr),
            'yyyy.M.d EEE h:mm a',
          )}
        </Text>
      </View>
      <View style={[styles.spaceBetween, styles.oneSchedule]}>
        <Text>종료 날짜</Text>
        <Text>
          {dateFns.format(
            dateFns.parseISO(data.scheduleFK.scheduleEnd),
            'yyyy.M.d EEE h:mm a',
          )}
        </Text>
      </View>
      <View style={styles.flexRow}>
        <TouchableOpacity style={{padding: 5}}>
          <MaterialCommunityIcons name="thumb-up" size={25} />
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
          onPress={() => navigation.push('comment', {post: data, user: user})}>
          <Text style={{padding: 5, fontWeight: 'bold'}}>more ››</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  post: {
    padding: 5,
    marginBottom: 10,
    marginLeft: 10,
    marginRight: 10,
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
  groupBorder: {
    borderTopColor: 'tomato',
    borderTopWidth: 3,
  },
});
