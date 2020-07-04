import React, {useState, useLayoutEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';

import FastImage from 'react-native-fast-image';
import ImagePicker from 'react-native-image-picker';

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
        <TouchableOpacity
          onPress={() =>
            Alert.alert('프로필 수정', '프로필을 수정하시겠습니까?', [
              {
                text: '아니오',
                onPress: () => console.log('No Pressed'),
                style: 'cancel',
              },
              {text: '예', onPress: () => console.log('Yes Pressed')},
            ])
          }>
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

  const [currentUser, setCurrentUser] = useState(route.params.currentUser);

  const showPicker = () => {
    const options = {
      title: '프로필 사진',
      takePhotoButtonTitle: '카메라',
      chooseFromLibraryButtonTitle: '갤러리에서 선택 ',
      cancelButtonTitle: '취소',
    };
    ImagePicker.showImagePicker(options, (res) => {
      console.log('res = ', res);
      if (res.didCancel) {
        console.log('User cancelled image picter');
      } else if (res.error) {
        console.log('image-picker Errkr : ', res.error);
      } else if (res.customButton) {
        console.log('User tapped custom button : ', res.customButton);
      } else {
        setCurrentUser({...currentUser, userPic: res.uri});
      }
    });
  };

  return (
    <ScrollView style={styles.container}>
      <View style={{display: 'flex', alignItems: 'center', margin: 20}}>
        <TouchableOpacity onPress={showPicker}>
          <FastImage
            source={{uri: currentUser.userPic}}
            style={{
              resizeMode: 'cover',
              width: Dimensions.get('window').width * 0.6,
              height: Dimensions.get('window').width * 0.6,
              borderRadius: 200,
            }}
          />
        </TouchableOpacity>
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
          {currentUser.userId}({currentUser.userNm})
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
          defaultValue={currentUser.userEx}
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
