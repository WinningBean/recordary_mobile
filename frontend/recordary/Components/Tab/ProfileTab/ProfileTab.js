import React, {useState} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';

import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import FastImage from 'react-native-fast-image';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const ProfileTab = () => {
  const [content, setContent] = useState(`안녕하세요
테스트중 입니다.`);
  return (
    <KeyboardAwareScrollView style={styles.container}>
      <View style={[styles.section, {paddingTop: 12}]}>
        <View style={styles.profileInfo}>
          <View
            style={{
              flex: 2,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <FastImage
              resizeMode={FastImage.resizeMode.cover}
              source={{uri: 'https://unsplash.it/400/400?image=1'}}
              style={{height: 110, width: 110, borderRadius: 50}}
            />
          </View>
          <View style={{flex: 3, justifyContent: 'center', paddingRight: 20}}>
            <View
              style={{
                borderBottomColor: 'lightgray',
                borderBottomWidth: 1,
                paddingBottom: 10,
              }}>
              <Text
                style={{
                  fontSize: 20,
                  textAlign: 'center',
                }}>
                {`fornals222 (위성호)`}
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-around',
                marginTop: 10,
              }}>
              <TouchableOpacity>
                <View style={{alignItems: 'center'}}>
                  <Text style={{fontSize: 14}}>팔로우</Text>
                  <Text style={{fontSize: 18}}>20</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity>
                <View style={{alignItems: 'center', marginLeft: 10}}>
                  <Text style={{fontSize: 14}}>팔로잉</Text>
                  <Text style={{fontSize: 18}}>20</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={styles.profileContent}>
          <View style={{flex: 2}}>
            <View
              style={{
                flex: 1,
                paddingLeft: 20,
                borderBottomColor: 'lightgray',
                borderBottomWidth: 1,
                borderRadius: 5,
              }}>
              <Text
                style={[
                  {fontSize: 16},
                  content === '' ? null : {marginVertical: 10},
                ]}>
                {content}
              </Text>
            </View>
          </View>
        </View>
      </View>
      <View style={[styles.section]}>
        <View
          style={{
            flexDirection: 'row',
            height: 50,
            justifyContent: 'space-between',
            // backgroundColor: 'rgba(145,2,2,0.3)',
          }}>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <MaterialCommunityIcons name="calendar-month" size={28} />
          </View>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <MaterialCommunityIcons name="clipboard-account" size={28} />
          </View>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <MaterialCommunityIcons name="image" size={28} />
          </View>
        </View>
        <View
          style={[
            styles.section,
            {height: 300, backgroundColor: 'tomato'},
          ]}></View>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default ProfileTab;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  section: {
    paddingHorizontal: 10,
    // backgroundColor: 'orange',
  },
  profileInfo: {
    flex: 5,
    flexDirection: 'row',
  },
  profileContent: {
    flex: 3,
    // backgroundColor: 'orange',
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
