import React, {useState, useLayoutEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const ProfileEdit = ({navigation, route}) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      title: '프로필 수정',
      headerStyle: {backgroundColor: 'rgb(64, 114, 89)'},
      headerTintColor: 'white',
      headerTitleAlign: 'left',
      headerTitleStyle: {
        fontWeight: 'bold',
        fontSize: 24,
      },
      headerRight: () => (
        <TouchableOpacity>
          <MaterialCommunityIcons
            style={{padding: 10, marginRight: 5}}
            name="check-circle-outline"
            size={34}
            color="white"
          />
        </TouchableOpacity>
      ),
    });
  }, []);

  const {currentUser} = route.params;

  return (
    <ScrollView style={styles.container}>
      <View style={{display: 'flex', alignItems: 'center', margin: 20}}>
        <FastImage
          source={{uri: currentUser.pic}}
          style={{
            resizeMode: 'cover',
            width: Dimensions.get('window').width * 0.6,
            height: Dimensions.get('window').width * 0.6,
            borderRadius: 200,
          }}
        />
      </View>
      <View
        style={{
          height: 50,
          // borderBottomWidth: 1,
          // borderBottomColor: '#aaa',
          marginRight: 20,
          marginLeft: 20,
          display: 'flex',
          alignItems: 'center',
        }}>
        <TextInput style={{fontSize: 20, color: 'gray'}} editable={false}>
          {currentUser.id}({currentUser.nm})
        </TextInput>
      </View>
      <View
        style={{
          marginRight: 20,
          marginLeft: 20,
          marginTop: 20,
        }}>
        <Text style={{color: 'gray', marginBottom: 10, marginLeft: 5}}>
          상태메시지
        </Text>
        <TextInput
          defaultValue={currentUser.ex}
          multiline={true}
          maxLength={300}
          numberOfLines={2}
          style={{
            fontSize: 20,
            borderTopColor: 'lightgray',
            borderTopWidth: 1,
            borderBottomColor: 'lightgray',
            borderBottomWidth: 1,
          }}
        />
      </View>
    </ScrollView>
  );
};

export default ProfileEdit;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
});
