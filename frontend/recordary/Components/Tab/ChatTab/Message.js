import React, {useLayoutEffect, useState, useRef} from 'react';
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

const {width} = Dimensions.get('window');

const Message = ({navigation, route}) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      title: route.params.nm,
    });
  }, []);

  const scrollViewRef = useRef();
  const [message, setMessage] = useState(route.params.message);
  const info = useState({nm: route.params.nm, pic: route.params.pic})[0];

  return (
    <KeyboardAvoidingView style={{flex: 1}}>
      <ScrollView
        style={styles.chatContainer}
        ref={scrollViewRef}
        onContentSizeChange={() => scrollViewRef.current.scrollToEnd(true)}>
        {message.map((value, index) => {
          if (value.isMyMessage) {
            return (
              <View
                key={`${info.nm}-${index}`}
                style={[styles.chatWrap, {flexDirection: 'row-reverse'}]}>
                <Text
                  style={[
                    styles.chatText,
                    {backgroundColor: 'rgb(64,115,158)', color: 'white'},
                  ]}>
                  {value.ex}
                </Text>
              </View>
            );
          }
          return (
            <View
              key={`${info.nm}-${index}`}
              style={[styles.chatWrap, {flexDirection: 'row'}]}>
              <FastImage source={{uri: info.pic}} style={styles.chatPic} />
              <View>
                <Text style={{paddingLeft: 4, paddingTop: 6}}>{info.nm}</Text>
                <Text style={[styles.chatText, {backgroundColor: 'lightgray'}]}>
                  {value.ex}
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
