import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  KeyboardAvoidingView,
  TextInput,
  Dimensions,
  TouchableOpacity,
  Alert,
  Image,
} from 'react-native';

import AsyncStorage from '@react-native-community/async-storage';

import axios from 'axios';

const Login = ({route, navigation}) => {
  const [info, setInfo] = useState({id: '', pw: ''});
  return (
    <KeyboardAvoidingView style={styles.container}>
      <Image
        style={{height: 70, width: 260}}
        resizeMode="cover"
        source={require('../../Static/logo.png')}
      />
      <View style={{marginTop: 10}}>
        <TextInput
          style={styles.input}
          placeholder="아이디"
          onChangeText={(value) => setInfo({...info, id: value})}
        />
        <TextInput
          style={styles.input}
          placeholder="비밀번호"
          secureTextEntry={true}
          onChangeText={(value) => setInfo({...info, pw: value})}
        />
        <View
          style={[
            styles.buttonArea,
            {borderBottomColor: 'lightgray', borderBottomWidth: 1},
          ]}>
          <TouchableOpacity onPress={() => navigation.push('register')}>
            <Text style={styles.textStyle}>회원가입</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={async () => {
              try {
                const {data} = await axios.post(
                  'http://ec2-15-165-140-48.ap-northeast-2.compute.amazonaws.com:8080/user/login',
                  {
                    userId: info.id,
                    userPw: info.pw,
                  },
                );
                if (data === '') {
                  Alert.alert('아이디와 패스워드를 확인해주세요');
                  return;
                }

                await AsyncStorage.setItem(
                  'loginData',
                  JSON.stringify({
                    userId: info.id,
                    userPw: info.pw,
                  }),
                );
                route.params.onLogin(data);
              } catch (error) {
                Alert.alert('아이디와 패스워드를 확인해주세요');
                // console.error(error);
              }
            }}>
            <Text style={styles.textStyle}>로그인</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgb(64, 114, 89)',
  },
  // title: {
  //   fontSize: 50,
  //   fontWeight: 'bold',
  //   color: 'white',
  // },
  input: {
    width: Dimensions.get('window').width * 0.6,
    height: 40,
    backgroundColor: 'white',
    marginTop: 10,
  },
  buttonArea: {
    width: Dimensions.get('window').width * 0.6,
    flexDirection: 'row',
    height: 40,
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: 30,
    paddingBottom: 10,
  },
  textStyle: {
    fontSize: 17,
    padding: 30,
    color: 'white',
    fontWeight: 'bold',
  },
});
