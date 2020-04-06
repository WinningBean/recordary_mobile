import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  KeyboardAvoidingView,
  TextInput,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {Button} from 'react-native-material-ui';

const Login = ({route}) => {
  console.log(route);
  return (
    <KeyboardAvoidingView style={styles.container}>
      <Text style={styles.title}>Recordary</Text>
      <View style={{marginTop: 20}}>
        <TextInput style={styles.input} placeholder="아이디" />
        <TextInput
          style={styles.input}
          placeholder="비밀번호"
          secureTextEntry={true}
        />
        <View
          style={[
            styles.buttonArea,
            {borderBottomColor: 'lightgray', borderBottomWidth: 1},
          ]}>
          <TouchableOpacity>
            <Text style={styles.textStyle}>회원가입</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => route.params.onLogin()}>
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
    backgroundColor: 'rgba(20, 81, 51, 0.8)',
  },
  title: {
    fontSize: 50,
    fontWeight: 'bold',
    color: 'white',
  },
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
