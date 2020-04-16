import React, {useState, useLayoutEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Picker,
  Image,
  TextInput,
  Modal,
} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import HomeTab from 'Components/Tab/HomeTab/HomeTab';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as dateFns from 'date-fns';

import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const Stack = createStackNavigator();

const AddPostTab = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="addPost" component={AddPost} />
    </Stack.Navigator>
  );
};

const AddPost = ({navigation}) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      title: '게시물 추가',
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
            navigation.goBack();
          }}>
          <MaterialCommunityIcons
            style={{padding: 10}}
            name="chevron-left"
            size={34}
            color="white"
          />
        </TouchableOpacity>
      ),
      headerRight: () => (
        <TouchableOpacity>
          <MaterialCommunityIcons
            style={{padding: 10}}
            name="check-circle-outline"
            size={34}
            color="white"
          />
        </TouchableOpacity>
      ),
    });
  }, []);

  const [selectedValue, setSelectedValue] = useState('그룹 미선택');
  const [selectedPublic, setSelectedPublic] = useState('전체공개');

  const [isScheduleClick, setIsScheduleClick] = useState(false);
  const [isMediaClick, setIsMediaClick] = useState(false);

  const [mode, setMode] = useState('');

  const [startShow, setStartShow] = useState(false);
  const [startDate, setStartDate] = useState(new Date());

  const [endShow, setEndShow] = useState(false);
  const [endDate, setEndDate] = useState(new Date());

  const onStartChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setStartShow(false);
    setStartDate(currentDate);
  };
  const onEndChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setEndShow(false);
    setEndDate(currentDate);
  };

  return (
    <KeyboardAwareScrollView style={styles.container}>
      <Picker
        mode="dropdown"
        selectedValue={selectedValue}
        style={{height: 50}}
        onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}>
        <Picker.Item label="그룹 미선택" value="그룹 미선택" />
        <Picker.Item label="성호그룹" value="group1" />
        <Picker.Item label="주은그룹" value="group2" />
        <Picker.Item label="승빈그룹" value="group3" />
        <Picker.Item label="수경그룹" value="group4" />
      </Picker>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginBottom: 10,
        }}>
        <View style={styles.flexRow}>
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
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => setIsScheduleClick(!isScheduleClick)}>
            {isScheduleClick === true ? (
              <MaterialCommunityIcons
                name="calendar"
                size={30}
                style={{color: 'rgb(64, 114, 89)'}}
              />
            ) : (
              <MaterialCommunityIcons name="calendar" size={30} />
            )}
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => setIsMediaClick(!isMediaClick)}>
            {isMediaClick === true ? (
              <MaterialIcons
                name="perm-media"
                size={30}
                style={{color: 'rgb(64, 114, 89)'}}
              />
            ) : (
              <MaterialIcons name="perm-media" size={30} />
            )}
          </TouchableOpacity>
          <Picker
            mode="dialog"
            selectedValue={selectedPublic}
            style={{
              height: 30,
              width: 120,
            }}
            onValueChange={(itemValue, itemIndex) =>
              setSelectedPublic(itemValue)
            }>
            <Picker.Item label="전체공개" value="public1" />
            <Picker.Item label="친구만" value="public2" />
            <Picker.Item label="나만보기" value="public3" />
          </Picker>
        </View>
      </View>
      {isScheduleClick === true ? (
        <TextInput
          autoFocus={true}
          style={{
            height: 40,
            borderBottomColor: 'lightgray',
            borderBottomWidth: 1,
          }}
          placeholder="일정제목"
          maxLength={200}
        />
      ) : null}
      <TextInput
        style={{
          maxHeight: 200,
          borderBottomColor: 'lightgray',
          borderBottomWidth: 1,
          // borderTopColor: 'lightgray',
          // borderTopWidth: 1,
        }}
        placeholder="내용을 입력하세요"
        autoFocus={true}
        multiline={true}
        maxLength={2000}
      />
      {isScheduleClick === true ? (
        <>
          <View
            style={[
              {
                // borderTopColor: 'lightgray',
                // borderTopWidth: 1,
                paddingTop: 10,
                marginBottom: 5,
                paddingLeft: 5,
              },
              styles.spaceBetween,
            ]}>
            <View style={{flex: 1}}>
              <Text>시작날짜</Text>
              <TouchableOpacity
                onPress={() => {
                  setMode('date'), setStartShow(true);
                }}>
                <Text
                  style={{fontSize: 16, fontWeight: 'bold', paddingRight: 5}}>
                  {dateFns.format(startDate, 'yyyy.M.d EEE')}
                </Text>
              </TouchableOpacity>
            </View>
            <View style={{flex: 1}}>
              <Text>시작시간</Text>
              <TouchableOpacity
                onPress={() => {
                  setMode('time'), setStartShow(true);
                }}>
                <Text
                  style={{fontSize: 16, fontWeight: 'bold', paddingRight: 5}}>
                  {dateFns.format(startDate, 'a h:mm')}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <View
            style={[
              {
                // borderTopColor: 'lightgray',
                // borderTopWidth: 1,
                paddingTop: 10,
                marginBottom: 5,
                paddingLeft: 5,
              },
              styles.spaceBetween,
            ]}>
            <View style={{flex: 1}}>
              <Text>종료날짜</Text>
              <TouchableOpacity
                onPress={() => {
                  setMode('date'), setEndShow(true);
                }}>
                <Text
                  style={{fontSize: 16, fontWeight: 'bold', paddingRight: 5}}>
                  {dateFns.format(endDate, 'yyyy.M.d EEE')}
                </Text>
              </TouchableOpacity>
            </View>
            <View style={{flex: 1}}>
              <Text>종료시간</Text>
              <TouchableOpacity
                onPress={() => {
                  setMode('time'), setEndShow(true);
                }}>
                <Text
                  style={{fontSize: 16, fontWeight: 'bold', paddingRight: 5}}>
                  {dateFns.format(endDate, 'a h:mm')}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </>
      ) : null}
      {startShow === true ? (
        <DateTimePicker
          value={startDate}
          mode={mode}
          is24Hour={true}
          display="default"
          onChange={onStartChange}
        />
      ) : endShow === true ? (
        <DateTimePicker
          value={endDate}
          mode={mode}
          is24Hour={true}
          display="default"
          onChange={onEndChange}
        />
      ) : null}
      <TouchableOpacity style={styles.addTag}>
        <Text>게시물을 함께할 사람 태그하기</Text>
      </TouchableOpacity>
    </KeyboardAwareScrollView>
  );
};

export default AddPostTab;

const styles = StyleSheet.create({
  container: {padding: 10},
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
  addButton: {
    padding: 5,
    margin: 5,
  },
  addTag: {
    padding: 10,
    borderWidth: 1,
    borderColor: 'lightgray',
    marginTop: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
