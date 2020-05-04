import React, {useState, useLayoutEffect, useRef} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Animated} from 'react-native';

import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import FastImage from 'react-native-fast-image';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {createStackNavigator} from '@react-navigation/stack';

import Calendar from 'Containers/Tab/ProfileTab/Calendar';

const Stack = createStackNavigator();

const ProfileTab = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="profile" component={Profile} />
    </Stack.Navigator>
  );
};

const Profile = ({navigation}) => {
  const [content, setContent] = useState(`Hello
World`);
  const value = useRef(new Animated.Value(40)).current;
  const [isFullCalendar, setIsFullCalender] = useState(false);
  const [height, setHeight] = useState(undefined);
  useLayoutEffect(() => {
    navigation.setOptions({
      title: '프로필',
      headerStyle: {backgroundColor: 'rgb(64, 114, 89)'},
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
    });
  }, []);

  const onLayout = ({
    nativeEvent: {
      layout: {height},
    },
  }) => {
    setHeight(height);
  };

  return (
    <View style={styles.container} onLayout={onLayout}>
      <Animated.View
        style={[
          // styles.section,
          // {height: height !== undefined ? height * 0.35 : null},
          {
            flex: value,
          },
        ]}>
        <View style={{flex: 1, justifyContent: 'center'}}>
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
                style={{height: 90, width: 90, borderRadius: 50}}
              />
            </View>
            <View
              style={{
                flex: 3,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <View
                style={{
                  paddingBottom: 5,
                }}>
                <Text
                  style={{
                    fontSize: 18,
                    textAlign: 'center',
                  }}>
                  {`fornals222 (위성호)`}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginTop: 2,
                  marginHorizontal: 20,
                  borderTopColor: 'lightgray',
                  borderTopWidth: 1,
                  paddingTop: 5,
                }}>
                <TouchableOpacity style={{flex: 1}}>
                  <View style={{alignItems: 'center'}}>
                    <Text style={{fontSize: 14}}>팔로우</Text>
                    <Text style={{fontSize: 16}}>20</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity style={{flex: 1}}>
                  <View style={{alignItems: 'center', marginLeft: 10}}>
                    <Text style={{fontSize: 14}}>팔로잉</Text>
                    <Text style={{fontSize: 16}}>20</Text>
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
                  borderRadius: 5,
                }}>
                <Text
                  style={[
                    {fontSize: 14},
                    content === '' ? null : {marginVertical: 10},
                  ]}>
                  {content}
                </Text>
              </View>
            </View>
          </View>
        </View>
        <View style={[styles.section, {backgroundColor: 'white'}]}>
          <View
            style={{
              flexDirection: 'row',
              flex: 1,
              justifyContent: 'space-between',
              // backgroundColor: 'rgba(145,2,2,0.3)',
            }}>
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#f9f9f9',
              }}>
              <MaterialCommunityIcons name="calendar-month" size={28} />
            </View>
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#f9f9f9',
              }}>
              <MaterialCommunityIcons name="clipboard-account" size={28} />
            </View>
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <MaterialCommunityIcons
                name="image"
                size={28}
                color="rgb(64, 114, 89)"
              />
            </View>
          </View>
        </View>
      </Animated.View>
      <View style={height !== undefined && {flex: 60}}>
        {height === undefined ? null : (
          <Calendar
            isFullCalendar={isFullCalendar}
            onFullCalendar={() => {
              setIsFullCalender(true);
              Animated.timing(value, {
                toValue: 0,
                duration: 300,
                useNativeDriver: false,
              }).start();
            }}
            onSmallCalendar={() => {
              setIsFullCalender(false);
              Animated.timing(value, {
                toValue: 40,
                duration: 500,
                useNativeDriver: false,
              }).start();
            }}
          />
        )}
      </View>
    </View>
  );
};

export default ProfileTab;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  section: {
    flex: 0.2,
    // backgroundColor: 'orange',
  },
  profileInfo: {
    flex: 5,
    flexDirection: 'row',
    paddingTop: 4,
  },
  profileContent: {
    flex: 3,
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
