import React, {useLayoutEffect} from 'react';
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
import {createStackNavigator} from '@react-navigation/stack';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const Stack = createStackNavigator();

const HomeTab = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="home" component={Home} />
    </Stack.Navigator>
  );
};

const Home = ({navigation}) => {
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
      <View style={styles.timeline}>
        <View style={styles.spaceBetween}>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Image
              source={{
                uri:
                  'data:image/jpeg;base64,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',
              }}
              style={{
                width: 50,
                height: 50,
                resizeMode: 'cover',
                borderRadius: 50,
              }}
            />
            <Text style={{padding: 10, fontSize: 20}}>이지은</Text>
          </View>
          <View style={styles.flexRow}>
            <Text>1일전</Text>
            <TouchableOpacity style={{padding: 5}}>
              <MaterialIcons name="more-vert" size={25} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.spaceBetween}>
          <Text>오늘은 졸작하는 날</Text>
          <TouchableOpacity style={{padding: 5}}>
            <MaterialIcons name="expand-more" size={25} />
          </TouchableOpacity>
        </View>
        <View style={styles.flexRow}>
          {/* <TouchableOpacity style={{padding: 5}}>
            <MaterialCommunityIcons
              name="arrow-left-drop-circle-outline"
              size={25}
            />
          </TouchableOpacity> */}
          <Image
            source={{
              uri:
                'data:image/jpeg;base64,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',
            }}
            style={styles.timelineImage}
          />
          {/* <TouchableOpacity style={{padding: 5, justifySelf: 'flex-end'}}>
            <MaterialCommunityIcons
              name="arrow-right-drop-circle-outline"
              size={25}
            />
          </TouchableOpacity> */}
        </View>
        <View style={styles.spaceBetween}>
          <View style={styles.flexRow}>
            <TouchableOpacity style={{padding: 5}}>
              <MaterialCommunityIcons name="thumb-up" size={25} />
            </TouchableOpacity>
            <Text>100명이 이 게시물을 좋아합니다</Text>
          </View>
          <TouchableOpacity style={{padding: 5}}>
            <MaterialCommunityIcons name="chat" size={25} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.timeline}>
        <View style={styles.spaceBetween}>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Image
              source={{
                uri:
                  'data:image/jpeg;base64,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',
              }}
              style={{
                width: 50,
                height: 50,
                resizeMode: 'cover',
                borderRadius: 50,
              }}
            />
            <Text style={{padding: 10, fontSize: 20}}>이지은</Text>
          </View>
          <View style={styles.flexRow}>
            <Text>1일전</Text>
            <TouchableOpacity style={{padding: 5}}>
              <MaterialIcons name="more-vert" size={25} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.spaceBetween}>
          <Text>오늘은 졸작하는 날</Text>
          <TouchableOpacity style={{padding: 5}}>
            <MaterialIcons name="expand-more" size={25} />
          </TouchableOpacity>
        </View>
        <View style={styles.flexRow}>
          {/* <TouchableOpacity style={{padding: 5}}>
            <MaterialCommunityIcons
              name="arrow-left-drop-circle-outline"
              size={25}
            />
          </TouchableOpacity> */}
          <Image
            source={{
              uri:
                'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQLtv8pZXxAKssqo0H9gFmEYEhgt0PPf5DqKFAq6bxtFAXz60hK&usqp=CAU ',
            }}
            style={styles.timelineImage}
          />
          {/* <TouchableOpacity style={{padding: 5, justifySelf: 'flex-end'}}>
            <MaterialCommunityIcons
              name="arrow-right-drop-circle-outline"
              size={25}
            />
          </TouchableOpacity> */}
        </View>
        <View style={styles.spaceBetween}>
          <View style={styles.flexRow}>
            <TouchableOpacity style={{padding: 5}}>
              <MaterialCommunityIcons name="thumb-up" size={25} />
            </TouchableOpacity>
            <Text>100명이 이 게시물을 좋아합니다</Text>
          </View>
          <TouchableOpacity style={{padding: 5}}>
            <MaterialCommunityIcons name="chat" size={25} />
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default HomeTab;

const styles = StyleSheet.create({
  container: {
    paddingTop: 5,
    paddingBottom: 5,
  },
  timeline: {
    padding: 5,
    // marginTop: 10,
    // marginBottom: 10,
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
  timelineImage: {
    width: Dimensions.get('window').width * 0.9,
    height: Dimensions.get('window').width * 0.9,
    resizeMode: 'cover',
    margin: 5,
  },
});
