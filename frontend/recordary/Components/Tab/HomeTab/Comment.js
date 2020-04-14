import React, {useState} from 'react';
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
import * as dateFns from 'date-fns';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const Comment = ({navigation, route}) => {
  const data = useState({
    comment: [
      {
        user_id: 'wi_sungho',
        user_pic:
          'data:image/jpeg;base64,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',
        user_comment: '가나다라바사',
        commentLike: false,
        recommentList: [
          {
            user_id: '위승빈',
            user_pic:
              'https://i.pinimg.com/originals/e8/f1/3d/e8f13d744f012e0900b8b3f0d387ca40.jpg',
            user_comment: '배고프다',
            commentLike: false,
          },
          {
            user_id: '위승빈',
            user_pic:
              'https://i.pinimg.com/originals/e8/f1/3d/e8f13d744f012e0900b8b3f0d387ca40.jpg',
            user_comment: '배고프다',
            commentLike: false,
          },
          {
            user_id: '위승빈',
            user_pic:
              'https://i.pinimg.com/originals/e8/f1/3d/e8f13d744f012e0900b8b3f0d387ca40.jpg0',
            user_comment: '배고프다',
            commentLike: false,
          },
          {
            user_id: '위승빈',
            user_pic:
              'https://i.pinimg.com/originals/e8/f1/3d/e8f13d744f012e0900b8b3f0d387ca40.jpg',
            user_comment: '배고프다',
            commentLike: false,
          },
          {
            user_id: '위승빈',
            user_pic:
              'https://i.pinimg.com/originals/e8/f1/3d/e8f13d744f012e0900b8b3f0d387ca40.jpg',
            user_comment: '배고프다',
            commentLike: false,
          },
        ],
      },
      {
        user_id: 'hsg',
        user_pic:
          'https://i.pinimg.com/originals/e8/f1/3d/e8f13d744f012e0900b8b3f0d387ca40.jpg',
        user_comment: 'abcd',
        commentLike: false,
        recommentList: [
          {
            user_id: '위승빈',
            user_pic:
              'https://i.pinimg.com/originals/e8/f1/3d/e8f13d744f012e0900b8b3f0d387ca40.jpg',
            user_comment: '배고프다',
            commentLike: false,
          },
          {
            user_id: '위승빈',
            user_pic:
              'https://i.pinimg.com/originals/e8/f1/3d/e8f13d744f012e0900b8b3f0d387ca40.jpg',
            user_comment: '배고프다',
            commentLike: false,
          },
        ],
      },
    ],
  })[0];

  const {postData} = route.params;
  // const [isClick]
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
                    uri: postData.user_pic,
                  }}
                  style={{
                    width: 40,
                    height: 40,
                    resizeMode: 'cover',
                    borderRadius: 50,
                  }}
                />
                <Text style={{padding: 10, fontSize: 20}}>
                  {postData.user_id}
                </Text>
              </View>

              <View
                style={{
                  height: 30,
                  display: 'flex',
                  justifyContent: 'center',
                }}>
                <Text style={{fontSize: 20}}>{postData.post_title}</Text>
              </View>
            </View>

            <View
              style={{
                display: 'flex',
                justifyContent: 'center',
              }}>
              <Image
                source={{
                  uri: postData.post_pic[0],
                }}
                style={styles.postImage}></Image>
            </View>
          </View>
          <View style={styles.scheduleDate}>
            <View style={styles.spaceBetween}>
              <Text style={styles.scheduleText}>시작 날짜</Text>
              <Text style={styles.scheduleText}>
                {dateFns.format(postData.post_str_ymd, 'yyyy.M.d EEE a h:mm')}
              </Text>
            </View>
            <View style={styles.spaceBetween}>
              <Text style={styles.scheduleText}>종료 날짜</Text>
              <Text style={styles.scheduleText}>
                {dateFns.format(postData.post_end_ymd, 'yyyy.M.d EEE a h:mm')}
              </Text>
            </View>
          </View>
        </View>
        <View style={{backgroundColor: 'white', marginTop: 10, paddingLeft: 5}}>
          {data.comment.map((value, index) => (
            <View style={styles.flexRow} key={`댓글img-${index}`}>
              <Image
                source={{
                  uri: value.user_pic,
                }}
                style={{
                  width: 40,
                  height: 40,
                  resizeMode: 'cover',
                  borderRadius: 50,
                }}
              />
              <View style={{display: 'flex', padding: 10}}>
                <View style={styles.flexRow}>
                  <Text style={{fontSize: 15, fontWeight: 'bold'}}>
                    {value.user_id}
                  </Text>
                  <Text style={{fontSize: 15, paddingLeft: 10}}>
                    {value.user_comment}
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
                {}
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
      <View style={[styles.spaceBetween, styles.commentWrite]}>
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
