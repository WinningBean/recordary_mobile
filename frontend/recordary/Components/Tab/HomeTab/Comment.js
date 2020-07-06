import React, {useState, useRef} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  TextInput,
  ScrollView,
  Dimensions,
} from 'react-native';
import * as dateFns from 'date-fns';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import axios from 'axios';
import produce from 'immer';

import RecommentList from './RecommentList';

const Comment = ({navigation, route}) => {
  const [data, setData] = useState(route.params.post);
  const [user, setUser] = useState(route.params.user);
  const [writtenComment, setWrittenComment] = useState(undefined);
  const [commentList, setCommentList] = useState(
    route.params.post.commentList.map((value) => ({
      ...value,
      showRecommentClick: {recommentList: [], click: false},
      updateClick: false,
    })),
  );
  const textInputRef = useRef();

  const getRecommentList = async (value, index, bool) => {
    try {
      const recommentListData = (
        await axios.get(
          `http://ec2-15-165-140-48.ap-northeast-2.compute.amazonaws.com:8080/comment/sub/${value.commentCd}`,
        )
      ).data;
      setCommentList(
        commentList.map((val, listIndex) => {
          if (index === listIndex) {
            return produce(val, (draft) => {
              draft.showRecommentClick.click = !bool;
              draft.showRecommentClick.recommentList = recommentListData;
            });
          } else {
            return produce(val, (draft) => {
              draft.showRecommentClick.click = draft.showRecommentClick.click;
            });
          }
        }),
      );
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={{flex: 1}}>
      <ScrollView style={styles.container}>
        <View
          style={{
            backgroundColor: 'white',
            borderBottomColor: 'lightgray',
            borderBottomWidth: 1,
          }}>
          <View style={styles.spaceBetween}>
            <View style={{display: 'flex'}}>
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
                <Text style={{padding: 10, fontSize: 20}}>
                  {data.userFK.userId}( {data.userFK.userNm})
                </Text>
              </View>
              {data.postEx !== null ? (
                <View
                  style={{
                    height: 40,
                    display: 'flex',
                    justifyContent: 'center',
                  }}>
                  <Text style={{fontSize: 15, marginTop: 5, marginBottom: 10}}>
                    {data.postEx}
                  </Text>
                </View>
              ) : null}
            </View>
            {data.mediaFK === null ? null : (
              <View
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                }}>
                <Image
                  source={{
                    uri: data.mediaFK.mediaFirstPath,
                  }}
                  style={styles.postImage}></Image>
              </View>
            )}
          </View>
          {data.scheduleFK === null ? null : (
            <View style={styles.scheduleDate}>
              <View style={styles.spaceBetween}>
                <Text style={styles.scheduleText}>시작 날짜</Text>
                <Text style={styles.scheduleText}>
                  {dateFns.format(
                    dateFns.parseISO(data.scheduleFK.scheduleStr),
                    'yyyy.M.d EEE h:mm a',
                  )}
                </Text>
              </View>
              <View style={styles.spaceBetween}>
                <Text style={styles.scheduleText}>종료 날짜</Text>
                <Text style={styles.scheduleText}>
                  {dateFns.format(
                    dateFns.parseISO(data.scheduleFK.scheduleStr),
                    'yyyy.M.d EEE h:mm a',
                  )}
                </Text>
              </View>
            </View>
          )}
        </View>
        <View style={{paddingLeft: 5, marginTop: 5}}>
          {commentList.length > 0
            ? commentList.map((value, index) => (
                <View
                  style={{display: 'flex', flexDirection: 'row'}}
                  key={`${value.commentCd}-${index}`}>
                  <Image
                    source={{
                      uri: value.userFK.userPic,
                    }}
                    style={{
                      width: 40,
                      height: 40,
                      resizeMode: 'cover',
                      borderRadius: 50,
                      marginTop: 10,
                    }}
                  />
                  <View
                    style={{
                      display: 'flex',
                      paddingTop: 5,
                      paddingBottom: 5,
                      paddingLeft: 10,
                    }}>
                    <View style={{display: 'flex', flexDirection: 'row'}}>
                      <View>
                        <View>
                          <Text
                            style={{
                              fontSize: 15,
                              fontWeight: 'bold',
                            }}>
                            {value.userFK.userId}({value.userFK.userNm})
                          </Text>
                        </View>
                        <TouchableOpacity
                          onPress={() =>
                            user === undefined
                              ? null
                              : getRecommentList(
                                  value,
                                  index,
                                  value.showRecommentClick.click,
                                )
                          }>
                          {value.reCommentCount > 0 ? (
                            value.showRecommentClick.click === false ? (
                              <Text
                                style={{
                                  color: 'gray',
                                }}>{`댓글 ${
                                value.showRecommentClick.recommentList.length >
                                0
                                  ? value.showRecommentClick.recommentList
                                      .length
                                  : value.reCommentCount
                              }개`}</Text>
                            ) : (
                              <Text>{`댓글 접기`}</Text>
                            )
                          ) : (
                            <View style={{padding: 2}}>
                              <MaterialCommunityIcons
                                name="comment-processing"
                                size={15}
                              />
                            </View>
                          )}
                        </TouchableOpacity>
                      </View>
                      <View>
                        <Text
                          style={{
                            fontSize: 15,
                            paddingLeft: 10,
                            maxWidth: 290,
                          }}>
                          {value.commentContent}
                        </Text>
                      </View>
                    </View>
                    <View>
                      {value.showRecommentClick.click === true ? (
                        <RecommentList
                          list={value.showRecommentClick.recommentList}
                        />
                      ) : null}
                    </View>
                    <View></View>
                  </View>
                </View>
              ))
            : null}
        </View>
      </ScrollView>
      <View style={[styles.spaceBetween, styles.commentWrite]}>
        <View style={styles.flexRow}>
          <Image
            source={{
              uri: user.userPic,
            }}
            style={styles.commentImage}
          />
          <TextInput
            ref={textInputRef}
            autoFocus={true}
            style={{paddingLeft: 10}}
            placeholder="댓글을 입력하세요..."
            maxLength={200}
            multiline={true}
            onChangeText={(value) => setWrittenComment(value)}
          />
        </View>
        <TouchableOpacity
          style={{padding: 5}}
          onPress={async (e) => {
            if (writtenComment !== '') {
              try {
                const data = (
                  await axios.post(
                    'http://ec2-15-165-140-48.ap-northeast-2.compute.amazonaws.com:8080/comment/',
                    {
                      userCd: user.userCd,
                      postCd: route.params.post.postCd,
                      commentContent: writtenComment,
                      commentOriginCd: null,
                    },
                  )
                ).data;
                console.log(data);
                setCommentList(
                  commentList.concat({
                    commentCd: data,
                    commentContent: writtenComment,
                    reCommentCount: 0,
                    userFK: {
                      userCd: user.userCd,
                      userId: user.userId,
                      userNm: user.userNm,
                      userPic: user.userPic,
                    },
                    showRecommentClick: {recommentList: [], click: false},
                    updateClick: false,
                  }),
                );
                textInputRef.current.clear();
                setWrittenComment('');
              } catch (e) {
                console.log(e);
              }
            } else return null;
          }}>
          <MaterialIcons name="subdirectory-arrow-left" size={25} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Comment;

const styles = StyleSheet.create({
  container: {
    padding: 5,
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
  scheduleDate: {
    display: 'flex',
    margin: 5,
  },
  postImage: {
    width: Dimensions.get('window').width * 0.2,
    height: Dimensions.get('window').width * 0.2,
    resizeMode: 'cover',
    margin: 5,
  },
  scheduleText: {
    fontSize: 14,
  },
  commentImage: {
    width: 30,
    height: 30,
    resizeMode: 'cover',
    borderRadius: 50,
  },
  commentWrite: {
    backgroundColor: 'white',
    height: 50,
    marginLeft: 5,
    marginRight: 5,
  },
});
