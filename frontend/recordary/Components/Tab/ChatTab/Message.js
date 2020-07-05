import React, {useLayoutEffect, useState, useRef} from 'react';
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

const {width} = Dimensions.get('window');

const Message = ({navigation, route}) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      title: route.params.nm,
    });
  }, []);

  const scrollViewRef = useRef();
  const [currUser, setCurrUser] = useState(route.params.user);
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
      <View style={[styles.spaceBetween, styles.chatWrite]}>
        <View style={styles.flexRow}>
          <Image
            source={{
              uri: currUser.userPic,
            }}
            style={styles.chatCurrImg}
          />
          <TextInput
            autoFocus={true}
            style={{height: 40, paddingLeft: 10}}
            maxLength={200}
            onFocus={() =>
              setTimeout(() => scrollViewRef.current.scrollToEnd(true), 400)
            }
          />
        </View>
        <TouchableOpacity style={{padding: 5}}>
          <MaterialIcons name="subdirectory-arrow-left" size={25} />
        </TouchableOpacity>
      </View>
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
    marginLeft: 5,
    marginRight: 5,
  },
});
