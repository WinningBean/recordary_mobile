import React, {useLayoutEffect, useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableNativeFeedback,
  TouchableOpacity,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {connect} from 'react-redux';

import FastImage from 'react-native-fast-image';

const Chat = ({navigation, chatData}) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Chatting',
      headerStyle: {backgroundColor: 'rgb(64,115,158)'},
      headerTintColor: 'white',
      headerTitleAlign: 'left',
      headerTitleStyle: {
        fontWeight: 'bold',
        fontSize: 24,
      },
      headerLeft: () => (
        <TouchableOpacity
          onPress={() => {
            navigation.openDrawer();
          }}>
          <Text style={{padding: 10}}>
            <MaterialCommunityIcons name="menu" size={34} color="white" />
          </Text>
        </TouchableOpacity>
      ),
      headerRight: () => (
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('search');
          }}>
          <Text style={{padding: 10}}>
            <MaterialCommunityIcons
              name="comment-search-outline"
              size={34}
              color="white"
            />
          </Text>
        </TouchableOpacity>
      ),
    });
  }, []);

  useEffect(() => {
    console.log('show chat');
  }, []);

  const chatList = () => {
    return chatData.map((value, index) => (
      <TouchableNativeFeedback
        onPress={() => {
          navigation.navigate('message', {
            index: index,
            isGroup: value.isGroup,
          });
        }}
        key={`chatlist-${value.roomCd}`}>
        <View
          style={[
            styles.item,
            value.isGroup
              ? {borderLeftColor: 'tomato', borderLeftWidth: 6}
              : {paddingLeft: 8},
          ]}>
          <View style={{height: 70, width: 70, padding: 5}}>
            <FastImage
              source={{uri: value.targetPic}}
              style={styles.itemImage}
              resizeMode="cover"
            />
            {value.count === 0 ? null : (
              <View
                style={{
                  position: 'absolute',
                  bottom: 2,
                  right: 2,
                  width: 20,
                  height: 20,
                  backgroundColor: 'red',
                  borderRadius: 50,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Text style={{color: 'white', fontSize: 16}}>
                  {value.count}
                </Text>
              </View>
            )}
          </View>
          <View style={{paddingLeft: 10}}>
            <View style={[styles.itemContent, {justifyContent: 'flex-end'}]}>
              <Text style={{fontSize: 17, fontWeight: 'bold'}}>
                {value.isGroup
                  ? value.targetNm
                  : `${value.targetId}(${value.targetNm})`}
              </Text>
            </View>
            <View
              style={[
                styles.itemContent,
                {
                  justifyContent: 'flex-start',
                  paddingTop: 5,
                },
              ]}>
              <Text
                style={{
                  fontSize: 13,
                  width: 270,
                  overflow: 'hidden',
                  height: 20,
                  textOverflow: 'ellipsis',
                }}>
                {value.lastChat}
              </Text>
            </View>
          </View>
        </View>
      </TouchableNativeFeedback>
    ));
  };

  return <View style={styles.container}>{chatList()}</View>;
};

const mapStateToProps = (state) => {
  return {
    chatData: state.chatData,
  };
};

export default connect(mapStateToProps)(Chat);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(230,230,230)',
  },
  item: {
    height: 70,
    backgroundColor: 'white',
    flexDirection: 'row',
  },
  itemImage: {
    height: 60,
    width: 60,
    borderRadius: 50,
  },
  itemContent: {
    flex: 1,
  },
});
