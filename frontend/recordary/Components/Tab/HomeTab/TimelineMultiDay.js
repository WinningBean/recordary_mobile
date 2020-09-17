import React, {useLayoutEffect, useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  TextInput,
  Dimensions,
  Modal,
  ScrollView,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  TouchableNativeFeedback,
} from 'react-native';
import * as dateFns from 'date-fns';
import {useNavigation} from '@react-navigation/native';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import axios from 'axios';
export default function TimelineMultiDay({postList, user}) {
  const [data, setData] = useState(postList);
  const navigation = useNavigation();
  const [targetDate, setTargetDate] = useState(
    dateFns.parseISO(postList.shareScheduleStartDate),
  );
  const [clickedDay, setClickedDay] = useState(null);

  const GetMonth = () => {
    const today = new Date();
    const monthStart = dateFns.startOfMonth(targetDate);

    const monthEnd = dateFns.endOfMonth(monthStart);
    const startDate = dateFns.startOfWeek(monthStart);
    var endDate = dateFns.endOfWeek(monthEnd);
    dateFns.getWeeksInMonth(monthStart) === 5
      ? (endDate = dateFns.addWeeks(endDate, 1))
      : null;

    var stack = [];

    const rows = [];
    let day = startDate;
    var days = [];
    const queueList = data.shareScheduleList
      .map((value) => ({
        ...value,
        scheduleStr: dateFns.parseISO(value.scheduleStr),
        scheduleEnd: dateFns.parseISO(value.scheduleEnd),
      }))
      .filter(
        (value) =>
          startDate <= value.scheduleStr && endDate > value.scheduleStr,
      )
      .slice();

    console.log(queueList, day);

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        while (
          queueList.length > 0 &&
          dateFns.isWithinInterval(day, {
            start: dateFns.startOfDay(queueList[0].scheduleStr),
            end: dateFns.endOfDay(queueList[0].scheduleEnd),
          })
        ) {
          if (
            stack.length > 0 &&
            stack[stack.length - 1].index !== stack.length - 1
          ) {
            for (let a = 0; a < stack.length; a++) {
              if (stack[a].index > a) {
                stack.splice(a, 0, {
                  value: queueList[0],
                  index: a,
                });
              }
            }
          } else {
            stack.push({
              value: queueList[0],
              index: stack.length > 0 ? stack[stack.length - 1].index + 1 : 0,
            });
          }
          queueList.shift();
        }
        const currDay = day;
        days.push(
          <TouchableWithoutFeedback
            key={`cell-${day}`}
            onPress={() => {
              setClickedDay(currDay);
            }}>
            <View
              style={[
                {
                  flex: 1,
                  overflow: 'hidden',
                },
                // dateFns.isSameDay(day, selectedDate)
                //   ? {
                //       borderWidth: 2,
                //       borderRadius: 6,
                //       borderColor: '#999',
                //     }
                //   : null,
              ]}>
              <View>
                <Text
                  style={[
                    {
                      paddingLeft: 4,
                      fontSize: 12,
                      color: 'lightgray',
                      // textAlign: 'center',
                    },
                    dateFns.isSameDay(today, day)
                      ? {
                          borderLeftWidth: 22,
                          borderLeftColor: 'rgba(20, 81, 51, 0.8)',
                          color: 'white',
                          fontWeight: 'bold',
                        }
                      : null,
                    dateFns.isWithinInterval(day, {
                      start: dateFns.startOfDay(
                        dateFns.parseISO(data.shareScheduleStartDate),
                      ),
                      end: dateFns.endOfDay(
                        dateFns.parseISO(data.shareScheduleEndDate),
                      ),
                    })
                      ? {
                          color: 'black',
                        }
                      : null,
                  ]}>
                  {dateFns.format(day, 'd')}
                </Text>
                {stack.map((draft, index) => {
                  const result = [];
                  if (index !== draft.index) {
                    for (let i = 0; i < draft.index - index; i++) {
                      result.push(
                        <View
                          key={`blank-${day}-${i}`}
                          style={{height: 2.6, marginTop: 2}}
                        />,
                      );
                    }
                  }
                  result.push(
                    <View
                      key={`schedule-${day}-${draft.index}`}
                      style={[
                        {
                          height: 2.6,
                          marginTop: 2,
                          backgroundColor: draft.value.scheduleCol,
                        },
                        dateFns.isSameDay(draft.value.scheduleStr, day)
                          ? {marginLeft: 5}
                          : null,
                        dateFns.isSameDay(draft.value.scheduleEnd, day)
                          ? {marginRight: 5}
                          : null,
                      ]}
                    />,
                  );
                  return result;
                })}
              </View>
            </View>
          </TouchableWithoutFeedback>,
        );
        stack = stack.filter(
          (val) => !dateFns.isSameDay(day, val.value.scheduleEnd),
        );
        day = dateFns.addDays(day, 1);
      }
      rows.push(
        <View key={`week-${day}`} style={[styles.weekleyWrap]}>
          {days}
        </View>,
      );
      days = [];
      stack.forEach((value, index) => (value.index = index));
    }
    return rows;
  };

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

      {/* 헤더 */}
      <View style={styles.container}>
        <View
          style={{
            height: 40,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <TouchableOpacity
            disabled={dateFns.isSameMonth(
              targetDate,
              dateFns.parseISO(data.shareScheduleStartDate),
            )}
            onPress={() =>
              setTargetDate(
                dateFns.endOfMonth(dateFns.subMonths(targetDate, 1)),
              )
            }>
            <MaterialCommunityIcons
              name="menu-left"
              size={40}
              color={
                dateFns.isSameMonth(
                  targetDate,
                  dateFns.parseISO(data.shareScheduleStartDate),
                )
                  ? 'lightgray'
                  : 'black'
              }
            />
          </TouchableOpacity>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'row',
            }}>
            <Text style={{fontSize: 16, color: '#333'}}>
              {dateFns.format(targetDate, 'MMM').toUpperCase()}
            </Text>
            <Text> </Text>
            <Text style={{fontSize: 16, color: '#333'}}>
              {dateFns.format(targetDate, 'yyyy')}
            </Text>
          </View>
          <TouchableOpacity
            disabled={dateFns.isSameMonth(
              targetDate,
              dateFns.parseISO(data.shareScheduleEndDate),
            )}
            onPress={() =>
              setTargetDate(
                dateFns.startOfMonth(dateFns.addMonths(targetDate, 1)),
              )
            }>
            <MaterialCommunityIcons
              name="menu-right"
              size={40}
              color={
                dateFns.isSameMonth(
                  targetDate,
                  dateFns.parseISO(data.shareScheduleEndDate),
                )
                  ? 'lightgray'
                  : 'black'
              }
            />
          </TouchableOpacity>
        </View>
        <View
          style={{
            flex: 0.5,
            flexDirection: 'row',
            borderColor: '#eee',
            marginBottom: 3,
            borderTopWidth: 1,
            borderBottomWidth: 1,
            marginHorizontal: 10,
          }}>
          <Text style={[styles.weeklyText, {color: '#FF7777'}]}>SUN</Text>
          <Text style={styles.weeklyText}>SUN</Text>
          <Text style={styles.weeklyText}>MON</Text>
          <Text style={styles.weeklyText}>TUE</Text>
          <Text style={styles.weeklyText}>WED</Text>
          <Text style={styles.weeklyText}>THU</Text>
          <Text style={[styles.weeklyText, {color: '#8888FF'}]}>FRI</Text>
        </View>
        {/* 먼스 */}
        <View style={{height: Dimensions.get('window').width * 0.6}}>
          {GetMonth()}
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
          onPress={() => navigation.push('comment', {post: data, user: user})}>
          <Text style={{padding: 5, fontWeight: 'bold'}}>more ››</Text>
        </TouchableOpacity>
      </View>
      {clickedDay === null ? null : (
        <Modal transparent onRequestClose={() => setClickedDay(null)}>
          <TouchableWithoutFeedback onPress={() => setClickedDay(null)}>
            <View style={styles.modalOverlay} />
          </TouchableWithoutFeedback>
          <View style={styles.modalContainer}>
            <View
              style={{
                width: Dimensions.get('window').width * 0.8,
                height: Dimensions.get('window').height * 0.7,
                backgroundColor: 'white',
                // borderRadius: 20,
                position: 'relative',
              }}>
              <View
                style={{
                  height: Dimensions.get('window').height * 0.12,
                  borderBottomWidth: 1,
                  borderBottomColor: '#eee',
                  marginHorizontal: 12,
                  paddingHorizontal: 10,
                  paddingTop: Dimensions.get('window').height * 0.04,
                  // borderTopLeftRadius: 20,
                  // borderTopRightRadius: 20,
                }}>
                <Text
                  style={{fontSize: Dimensions.get('window').height * 0.04}}>
                  {dateFns.format(clickedDay, 'd일')}
                </Text>
              </View>
              <ScrollView>
                {data.shareScheduleList
                  .filter((value) =>
                    dateFns.isWithinInterval(clickedDay, {
                      start: dateFns.startOfDay(
                        dateFns.parseISO(value.scheduleStr),
                      ),
                      end: dateFns.endOfDay(
                        dateFns.parseISO(value.scheduleEnd),
                      ),
                    }),
                  )
                  .map((value) => (
                    <TouchableNativeFeedback key={value.scheduleCd}>
                      <View
                        style={{
                          height: Dimensions.get('window').height * 0.1,
                          paddingHorizontal: 22,
                          paddingVertical:
                            Dimensions.get('window').height * 0.02,
                          flexDirection: 'row',
                        }}>
                        <View
                          style={{
                            width: Dimensions.get('window').width * 0.06,
                          }}>
                          <View
                            style={{
                              marginTop: 4,
                              width: Dimensions.get('window').width * 0.03,
                              height: Dimensions.get('window').width * 0.03,
                              borderRadius: 50,
                              backgroundColor: value.scheduleCol,
                            }}
                          />
                        </View>
                        <View style={{flex: 1}}>
                          <Text style={{fontWeight: 'bold'}}>
                            {value.scheduleNm}
                          </Text>
                          <Text style={{color: '#888'}}>
                            {dateFns.isSameDay(
                              clickedDay,
                              dateFns.parseISO(value.scheduleStr),
                            ) &&
                            dateFns.isSameDay(
                              clickedDay,
                              dateFns.parseISO(value.scheduleEnd),
                            )
                              ? `${
                                  dateFns.format(
                                    dateFns.parseISO(value.scheduleStr),
                                    'aa',
                                  ) === 'AM'
                                    ? '오전'
                                    : '오후'
                                } ${dateFns.format(
                                  dateFns.parseISO(value.scheduleStr),
                                  'h:mm',
                                )} - ${
                                  dateFns.format(
                                    dateFns.parseISO(value.scheduleEnd),
                                    'aa',
                                  ) === 'AM'
                                    ? '오전'
                                    : '오후'
                                } ${dateFns.format(
                                  dateFns.parseISO(value.scheduleEnd),
                                  'h:mm',
                                )}`
                              : '하루 종일'}
                          </Text>
                        </View>
                        <View
                          style={
                            value.tabCd === null
                              ? {
                                  backgroundColor: 'rgb(255,197,0)',
                                  margin: 5,
                                  padding: 5,
                                  height: 30,
                                  width: 50,
                                }
                              : {
                                  backgroundColor: value.tabCol,
                                  margin: 5,
                                  padding: 5,
                                  height: 30,
                                  width: 50,
                                }
                          }>
                          <Text style={{textAlign: 'center', color: 'black'}}>
                            {value.tabCd === null ? 'All' : value.tabNM}
                          </Text>
                        </View>
                      </View>
                    </TouchableNativeFeedback>
                  ))}
              </ScrollView>
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  post: {
    padding: 5,
    marginBottom: 30,
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
  container: {
    backgroundColor: 'white',
    flex: 1,
    paddingBottom: 6,
  },
  weekleyWrap: {
    flex: 1,
    // backgroundColor: 'tomato',
    flexDirection: 'row',
    paddingHorizontal: 10,
  },
  weeklyText: {
    flex: 1,
    // backgroundColor: 'green',
    textAlignVertical: 'center',
    textAlign: 'center',
    fontSize: 11,
    color: '#777',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: Dimensions.get('window').width * 0.1,
    marginVertical: Dimensions.get('window').height * 0.15,
  },
  modalOverlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#000000aa',
  },
});
