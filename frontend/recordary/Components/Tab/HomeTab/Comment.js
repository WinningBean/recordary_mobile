import React, {useState} from 'react';
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

const Comment = ({navigation, route}) => {
  const [data, setData] = route.params.post;
  const [user, setUser] = route.params.user;
  // const [isClickList, setIsClickList] = useState(route.params.commentList.map(() => false));

  // const showRecommentList = (list, index) =>
  //   list.map((value) => (
  //     <View
  //       style={{display: 'flex', flexDirection: 'row'}}
  //       key={`대댓글-img${index}`}>
  //       <Image
  //         source={{
  //           uri: value.user_pic,
  //         }}
  //         style={{
  //           width: 40,
  //           height: 40,
  //           resizeMode: 'cover',
  //           borderRadius: 50,
  //           marginTop: 10,
  //         }}
  //       />
  //       <View
  //         style={{
  //           display: 'flex',
  //           paddingTop: 5,
  //           paddingBottom: 5,
  //           paddingLeft: 10,
  //         }}>
  //         <View style={styles.flexRow}>
  //           <Text style={{fontSize: 15, fontWeight: 'bold'}}>
  //             {value.user_id}
  //           </Text>
  //           <Text style={{fontSize: 15, paddingLeft: 10}}>
  //             {value.user_comment}
  //           </Text>
  //         </View>

  //         <View style={styles.flexRow}>
  //           <TouchableOpacity style={{padding: 2}}>
  //             <MaterialIcons name="thumb-up" size={15} />
  //           </TouchableOpacity>
  //           <TouchableOpacity style={{padding: 2}}>
  //             <MaterialCommunityIcons name="comment-processing" size={15} />
  //           </TouchableOpacity>
  //         </View>
  //       </View>
  //     </View>
  //   ));

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

              <View
                style={{
                  height: 30,
                  display: 'flex',
                  justifyContent: 'center',
                }}>
                <Text style={{fontSize: 20}}>{data.postEx}</Text>
              </View>
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
          {data.commentList.map((value, index) => (
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
                <View style={styles.flexRow}>
                  <Text style={{fontSize: 15, fontWeight: 'bold'}}>
                    {value.userFK.userId}({value.userFK.userNm})
                  </Text>
                  <Text style={{fontSize: 15, paddingLeft: 10}}>
                    {value.commentContent}
                  </Text>
                </View>
                <View style={styles.flexRow}>
                  <TouchableOpacity style={{padding: 2}}>
                    <MaterialIcons name="thumb-up" size={15} />
                  </TouchableOpacity>
                  <TouchableOpacity style={{padding: 2}}>
                    <MaterialCommunityIcons
                      name="comment-processing"
                      size={15}
                    />
                  </TouchableOpacity>
                </View>
                <View>
                  <TouchableOpacity
                    style={{padding: 2}}
                    // onPress={() =>
                    //   setIsClickList(
                    //     isClickList.map((val, reIndex) => {
                    //       if (reIndex === index) {
                    //         return !val;
                    //       }
                    //       return val;
                    //     }),
                    //   )
                    // }
                  >
                    {value.reCommentCount > 0 ? (
                      value.showRecommentClick.click === false ? (
                        <Text
                          style={{
                            color: 'gray',
                          }}>{`댓글 ${
                          value.showRecommentClick.recommentList.length > 0
                            ? value.showRecommentClick.recommentList.length
                            : value.reCommentCount
                        }개 모두 보기`}</Text>
                      ) : (
                        <Text>{`댓글 접기`}</Text>
                      )
                    ) : null}
                  </TouchableOpacity>
                  {/* <View>
                    {value.recommentList.length > 0 &&
                    isClickList[index] === true
                      ? showRecommentList(value.recommentList, index)
                      : null}
                  </View> */}
                </View>
              </View>
            </View>
          ))}
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
            autoFocus={true}
            style={{height: 40, paddingLeft: 10}}
            placeholder="댓글을 입력하세요..."
            maxLength={200}
          />
        </View>
        <TouchableOpacity style={{padding: 5}}>
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
