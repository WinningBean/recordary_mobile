import React, {useLayoutEffect, useState, useRef, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native';

import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import FastImage from 'react-native-fast-image';

import axios from 'axios';

const {width} = Dimensions.get('window');

const Message = ({navigation, route}) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      title: route.params.info.targetNm,
    });
  }, []);

  useEffect(() => {
    axios
      .post(
        `http://ec2-15-165-140-48.ap-northeast-2.compute.amazonaws.com:8080/room/enter/${route.params.info.roomCd}`,
      )
      .then(({data}) => {
        setMessage(data);
      });
  }, []);

  const scrollViewRef = useRef();
  const [message, setMessage] = useState([]);

  return (
    <KeyboardAvoidingView style={{flex: 1}}>
      <ScrollView
        style={styles.chatContainer}
        ref={scrollViewRef}
        onContentSizeChange={() => scrollViewRef.current.scrollToEnd(true)}>
        {message.map((value, index) => {
          if (value.sendUser.userCd === route.params.user.userCd) {
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
            </View>
          );
        })}
      </ScrollView>
      <TextInput
        style={styles.keyboard}
        onFocus={() =>
          setTimeout(() => scrollViewRef.current.scrollToEnd(true), 400)
        }
      />
    </KeyboardAvoidingView>
  );
};

export default Message;

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
});
