import React, {useLayoutEffect, useState, useRef, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Image,
  TouchableOpacity,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import FastImage from 'react-native-fast-image';

import {connect} from 'react-redux';

import axios from 'axios';

import * as dateFns from 'date-fns';

const {width} = Dimensions.get('window');

const Message = ({
  navigation,
  route,
  user,
  chatData,
  onSetChatData,
  onSetChatZeroCount,
}) => {
  const info = chatData[route.params.index];
  const message =
    chatData[route.params.index].chatList === null
      ? []
      : chatData[route.params.index].chatList;

  useLayoutEffect(() => {
    navigation.setOptions({
      title: info.targetNm,
      headerStyle: {
        backgroundColor: route.params.isGroup ? 'tomato' : 'rgb(64,115,158)',
      },
    });
  }, []);

  useEffect(() => {
    if (chatData[route.params.index].chatList !== null) {
      return;
    }
    axios
      .post(
        `http://ec2-15-165-140-48.ap-northeast-2.compute.amazonaws.com:8080/room/enter/${info.roomCd}`,
      )
      .then(({data}) => {
        const copyList = chatData.slice();
        copyList[route.params.index].chatList = data;
        onSetChatData(copyList);
      });
    return () => {
      console.log(route.params.index);
      onSetChatZeroCount(route.params.index);
    };
  }, []);

  const scrollViewRef = useRef();
  const textInputRef = useRef();
  const [input, setInput] = useState('');

  const sendMessage = (e) => {
    if (input === '') {
      return;
    }
    console.log('sendMessage');
    axios
      .post(
        'http://ec2-15-165-140-48.ap-northeast-2.compute.amazonaws.com:8080/chat/sendMessage',
        {
          roomCd: info.roomCd,
          userCd: user.userCd,
          userNm: user.userNm,
          content: input,
        },
      )
      .then(() => {
        textInputRef.current.clear();
      })
      .finally(() => {
        setInput('');
      });
  };

  return (
    <KeyboardAvoidingView style={{flex: 1}}>
      <ScrollView
        style={styles.chatContainer}
        ref={scrollViewRef}
        onContentSizeChange={() => scrollViewRef.current.scrollToEnd(true)}>
        {message.map((value, index) => {
          const createdDateTime = dateFns.parseISO(value.crateChat);
          if (value.sendUser.userCd === user.userCd) {
            return (
              <View
                key={`${value.sendUser.userCd}-${index}`}
                style={[styles.chatWrap, {flexDirection: 'row-reverse'}]}>
                <Text
                  style={[
                    styles.chatText,
                    {backgroundColor: 'rgb(64,115,158)', color: 'white'},
                  ]}>
                  {value.content}
                </Text>
                <View style={styles.chatDateTime}>
                  <Text>
                    {dateFns.isSameDay(new Date(), createdDateTime)
                      ? dateFns.format(createdDateTime, 'a') === 'AM'
                        ? '오전 ' + dateFns.format(createdDateTime, 'h:mm')
                        : '오후 ' + dateFns.format(createdDateTime, 'h:mm')
                      : `${dateFns.format(
                          createdDateTime,
                          'M' + ' / ' + 'd',
                        )} ${
                          dateFns.format(createdDateTime, 'a') === 'AM'
                            ? '(오전'
                            : '(오후'
                        } ${dateFns.format(createdDateTime, 'h:mm)')}`}
                  </Text>
                </View>
              </View>
            );
          }
          return (
            <View
              key={`${value.sendUser.userCd}-${index}`}
              style={[styles.chatWrap, {flexDirection: 'row'}]}>
              <FastImage
                source={{uri: value.sendUser.userPic}}
                style={styles.chatPic}
              />
              <View>
                <Text style={{paddingLeft: 4, paddingTop: 6}}>
                  {value.sendUser.userNm}
                </Text>
                <Text style={[styles.chatText, {backgroundColor: 'lightgray'}]}>
                  {value.content}
                </Text>
              </View>
              <View style={styles.chatDateTime}>
                <Text>
                  {dateFns.isSameDay(new Date(), createdDateTime)
                    ? dateFns.format(createdDateTime, 'a') === 'AM'
                      ? '오전 ' + dateFns.format(createdDateTime, 'h:mm')
                      : '오후 ' + dateFns.format(createdDateTime, 'h:mm')
                    : `${dateFns.format(createdDateTime, 'M' + ' / ' + 'd')} ${
                        dateFns.format(createdDateTime, 'a') === 'AM'
                          ? '(오전'
                          : '(오후'
                      } ${dateFns.format(createdDateTime, 'h:mm)')}`}
                </Text>
              </View>
            </View>
          );
        })}
      </ScrollView>
      <View
        style={[
          {
            paddingLeft: 5,
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
          },
          styles.chatWrite,
        ]}>
        <View style={styles.flexRow}>
          <Image
            source={{
              uri: user.userPic,
            }}
            style={styles.chatCurrImg}
          />
          <TextInput
            autoFocus={true}
            style={{
              height: 40,
              paddingLeft: 10,
              flex: 1,
            }}
            ref={textInputRef}
            maxLength={200}
            onFocus={() =>
              setTimeout(() => scrollViewRef.current.scrollToEnd(true), 400)
            }
            onChangeText={(value) => setInput(value)}
            onSubmitEditing={sendMessage}
          />
          <TouchableOpacity
            style={{padding: 5, width: 40}}
            onPress={sendMessage}>
            <MaterialIcons name="subdirectory-arrow-left" size={25} />
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
    chatData: state.chatData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onSetChatData: (chatData) => {
      dispatch({type: 'SET_CHATDATA', chatData: chatData});
    },
    onSetChatZeroCount: (chatIndex) => {
      dispatch({type: 'SET_CHATZEROCOUNT', chatIndex: chatIndex});
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Message);

const styles = StyleSheet.create({
  chatContainer: {
    backgroundColor: '#eee',
  },
  chatWrap: {
    minHeight: 50,
    // borderBottomColor: 'gray',
    // borderBottomWidth: 1,
    paddingLeft: 6,
  },
  chatPic: {
    height: 50,
    width: 50,
    borderRadius: 20,
    marginTop: 5,
  },
  chatText: {
    margin: 5,
    paddingVertical: 10,
    paddingHorizontal: 14,
    textAlignVertical: 'center',
    borderRadius: 5,
    maxWidth: width * 0.6,
  },
  keyboard: {
    height: 60,
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
  chatCurrImg: {
    width: 30,
    height: 30,
    resizeMode: 'cover',
    borderRadius: 50,
  },
  chatWrite: {
    backgroundColor: 'white',
    height: 50,
  },
  chatDateTime: {
    justifyContent: 'flex-end',
    paddingLeft: 2,
    paddingBottom: 8,
  },
});
