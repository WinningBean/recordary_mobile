import React, {useLayoutEffect, useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Alert,
} from 'react-native';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';

import Timeline from './Timeline';
import OnlyPostExTimeline from './OnlyPostExTimeline';
import TimelineOneDay from './TimelineOneDay';
import Comment from './Comment';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FastImage from 'react-native-fast-image';
import axios from 'axios';

const Stack = createStackNavigator();

const HomeTab = ({user}) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="home"
        component={Home}
        initialParams={{
          user: user,
        }}
      />
    </Stack.Navigator>
  );
};

const Home = ({navigation, route}) => {
  const [timeline, setTimeline] = useState([]);
  useEffect(() => {
    (async () => {
      try {
        const timeLineDataList = (
          await axios.get(
            `http://www.recordary.gq:8080/post/pagingTimeLine/${route.params.user.userCd}`,
          )
        ).data;
        if (timeLineDataList.length < 0) {
          return;
        } else {
          setTimeline(timeLineDataList);
        }
      } catch (e) {
        console.error(e);
      }
    })();
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Recordary',
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

  return (
    <ScrollView style={styles.container}>
      {timeline.map((value, index) => {
        if (value.mediaFK !== null) {
          return (
            <View key={`${value.postCd}-${index}`}>
              <Timeline postList={value} user={route.params.user} />
            </View>
          );
        } else if (value.scheduleFK !== null) {
          return (
            <View key={`${value.postCd}-${index}`}>
              <TimelineOneDay postList={value} user={route.params.user} />
            </View>
          );
        } else if (value.postOriginFK === null) {
          return (
            <View key={`${value.postCd}-${index}`}>
              <OnlyPostExTimeline postList={value} user={route.params.user} />
            </View>
          );
        } else return;
      })}
    </ScrollView>
  );
};

export default HomeTab;

const styles = StyleSheet.create({
  container: {
    paddingTop: 5,
    paddingBottom: 5,
  },
  post: {
    padding: 5,
    margin: 10,
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
  postImage: {
    width: Dimensions.get('window').width * 0.9,
    height: Dimensions.get('window').width * 0.9,
    resizeMode: 'cover',
    margin: 5,
  },
  commentImage: {
    width: 30,
    height: 30,
    resizeMode: 'cover',
    borderRadius: 50,
  },
  oneSchedule: {
    borderBottomColor: 'lightgray',
    borderBottomWidth: 1,
    height: 40,
  },
});
