import React, {useState} from 'react';
import {
  StyleSheet,
  KeyboardAvoidingView,
  TextInput,
  Text,
  View,
  TouchableNativeFeedback,
  Alert,
} from 'react-native';

const Register = () => {
  const [info, setInfo] = useState({
    nm: '',
    id: '',
    pw: '',
    pwCheck: '',
  });

  const onChangeText = (key, value) => {
    setInfo({...info, [key]: value});
  };

  return (
    <KeyboardAvoidingView
      style={{flex: 1, padding: 20, backgroundColor: 'white'}}>
      <TextInput
        style={styles.textInput}
        placeholder="이름"
        onChangeText={(value) => onChangeText('nm', value)}
      />
      <TextInput
        style={styles.textInput}
        placeholder="아이디"
        onChangeText={(value) => onChangeText('id', value)}
      />
      <TextInput
        style={styles.textInput}
        secureTextEntry={true}
        placeholder="비밀번호"
        onChangeText={(value) => onChangeText('pw', value)}
      />
      <TextInput
        style={styles.textInput}
        secureTextEntry={true}
        placeholder="비밀번호 확인"
        onChangeText={(value) => onChangeText('pwCheck', value)}
      />
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'flex-end',
        }}>
        <TouchableNativeFeedback
          onPress={() => Alert.alert(JSON.stringify(info))}>
          <View
            style={{
              height: 40,
              width: 60,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'rgb(64, 114, 89)',
              borderRadius: 10,
            }}>
            <Text style={{fontSize: 18, fontWeight: 'bold', color: 'white'}}>
              완료
            </Text>
          </View>
        </TouchableNativeFeedback>
      </View>
    </KeyboardAvoidingView>
  );
};

export default Register;

const styles = StyleSheet.create({
  textInput: {
    height: 50,
    fontSize: 18,
    marginBottom: 20,
    borderBottomWidth: 1,
  },
});
