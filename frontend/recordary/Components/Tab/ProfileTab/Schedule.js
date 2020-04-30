import React, {useLayoutEffect, useState, useRef} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  StatusBar,
  Dimensions,
  TouchableOpacity,
  TouchableNativeFeedback,
  TouchableWithoutFeedback,
  Modal,
} from 'react-native';

import {TriangleColorPicker} from 'react-native-color-picker';

import DateTimePicker from '@react-native-community/datetimepicker';
import * as dateFns from 'date-fns';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const {width, height} = Dimensions.get('window');

const Schedule = ({navigation, route}) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      title: '',
      headerTintColor: 'white',
      headerStyle: {backgroundColor: 'rgb(64, 114, 89)', elevation: 0.1},
    });
  }, []);

  const [data, setData] = useState(
    route.params.data !== undefined
      ? route.params.data
      : {
          ex: '',
          title: '',
          start: dateFns.startOfDay(route.params.currDate),
          end: dateFns.endOfDay(route.params.currDate),
          color: 'rgb(64, 114, 89)',
        },
  );
  const [isClickStartDate, setIsClickStartDate] = useState(undefined);
  const [isClickStartTime, setIsClickStartTime] = useState(undefined);
  const [isAllTime, setIsAllTime] = useState(true);
  const [isClickColor, setIsClickColor] = useState(false);
  const colorRef = useRef();
  console.log(route.params.data);
  return (
    <View style={styles.container}>
      <View
        style={{
          height: height * 0.4,
          backgroundColor: 'white',
          borderBottomLeftRadius: 30,
          borderBottomRightRadius: 30,
          borderTopWidth: 0,
          borderColor: '#ddd',
          borderWidth: 1,
          paddingHorizontal: 20,
          paddingTop: 10,
        }}>
        <View style={{flexDirection: 'row'}}>
          <TextInput
            style={{fontSize: 24, flex: 6}}
            value={data.ex}
            placeholder="제목"
            onChangeText={(value) => setData({...data, ex: value})}
          />
          <View style={{flex: 1, alignItems: 'center'}}>
            <TouchableOpacity onPress={() => setIsClickColor(true)}>
              <View
                style={{
                  marginTop: height * 0.03,
                  width: width * 0.06,
                  height: width * 0.06,
                  backgroundColor: data.color,
                  borderRadius: 50,
                }}
              />
            </TouchableOpacity>
          </View>
        </View>
        <TextInput
          style={{
            fontSize: 20,
            height: height * 0.16,
          }}
          value={data.ex}
          placeholder="내용"
          multiline
          onChangeText={(value) => setData({...data, ex: value})}
        />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingVertical: 6,
          }}>
          <Text style={{fontWeight: 'bold', fontSize: 18, color: '#666'}}>
            시작
          </Text>
          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity onPress={() => setIsClickStartDate(true)}>
              <Text style={{fontSize: 18}}>
                {dateFns.format(data.start, 'yyyy.M.d EEE')}
              </Text>
            </TouchableOpacity>
            {isAllTime ? null : (
              <TouchableOpacity onPress={() => setIsClickStartTime(true)}>
                <Text style={{fontSize: 18, marginLeft: 20}}>
                  {dateFns.format(data.start, 'HH:mm')}
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingVertical: 6,
          }}>
          <Text style={{fontWeight: 'bold', fontSize: 18, color: '#666'}}>
            종료
          </Text>
          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity onPress={() => setIsClickStartDate(false)}>
              <Text style={{fontSize: 18}}>
                {dateFns.format(data.end, 'yyyy.M.d EEE')}
              </Text>
            </TouchableOpacity>
            {isAllTime ? null : (
              <TouchableOpacity onPress={() => setIsClickStartTime(false)}>
                <Text style={{fontSize: 18, marginLeft: 20}}>
                  {dateFns.format(data.end, 'HH:mm')}
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
          }}>
          <TouchableOpacity
            style={{flex: 1}}
            onPress={() => {
              if (isAllTime) {
                return;
              }
              setIsAllTime(true);
              setData({
                ...data,
                start: dateFns.startOfDay(data.start),
                end: dateFns.endOfDay(data.end),
              });
            }}>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                height: height * 0.04,
                backgroundColor: isAllTime ? '#eee' : null,
              }}>
              <Text>하루 종일</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={{flex: 1}}
            onPress={() => (isAllTime ? setIsAllTime(false) : null)}>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                height: height * 0.04,
                backgroundColor: !isAllTime ? '#eee' : null,
              }}>
              <Text>시간</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
      <View
        style={{
          height: height * 0.36,
          backgroundColor: 'white',
          marginTop: 20,
          borderColor: '#ddd',
          borderWidth: 1,
          paddingHorizontal: 20,
          borderRadius: 30,
        }}>
        <TouchableNativeFeedback>
          <View style={{flex: 1, flexDirection: 'row'}}>
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <MaterialIcons name="group" size={24} />
            </View>
            <View style={{flex: 5, justifyContent: 'center'}}>
              <Text style={{color: '#777', fontSize: 16}}>그룹 미선택</Text>
            </View>
          </View>
        </TouchableNativeFeedback>
        <TouchableNativeFeedback>
          <View style={{flex: 1, flexDirection: 'row'}}>
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <MaterialIcons name="person-add" size={24} />
            </View>
            <View style={{flex: 5, justifyContent: 'center'}}>
              <Text style={{color: '#777', fontSize: 16}}>
                함께하는 친구 미선택
              </Text>
            </View>
          </View>
        </TouchableNativeFeedback>
        <TouchableNativeFeedback>
          <View style={{flex: 1}}></View>
        </TouchableNativeFeedback>
        <TouchableNativeFeedback>
          <View style={{flex: 1}}></View>
        </TouchableNativeFeedback>
      </View>
      <View
        style={{
          height: height * 0.12,
          backgroundColor: 'transparent',
          flexDirection: 'row',
        }}>
        <TouchableNativeFeedback onPress={() => navigation.goBack()}>
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text style={{fontSize: 20}}>취소</Text>
          </View>
        </TouchableNativeFeedback>
        <TouchableNativeFeedback
          onPress={() => {
            if (route.params.data === undefined) {
              route.params.onRegister(data);
            } else {
              route.params.onSave(data);
            }
            navigation.goBack();
          }}>
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text style={{fontSize: 20}}>저장</Text>
          </View>
        </TouchableNativeFeedback>
      </View>
      {(() => {
        if (isClickStartDate === undefined) {
          return null;
        } else if (isClickStartDate) {
          return (
            <DateTimePicker
              value={data.start}
              mode="date"
              display="default"
              is24Hour={true}
              onChange={(event, selectedDate) => {
                setIsClickStartDate(undefined);
                if (event.type !== 'dismissed') {
                  setData({
                    ...data,
                    start: isAllTime
                      ? dateFns.startOfDay(selectedDate)
                      : selectedDate,
                  });
                }
              }}
            />
          );
        } else {
          return (
            <DateTimePicker
              value={data.end}
              mode="date"
              display="default"
              is24Hour={true}
              onChange={(event, selectedDate) => {
                setIsClickStartDate(undefined);
                if (event.type !== 'dismissed') {
                  setData({
                    ...data,
                    end: isAllTime
                      ? dateFns.startOfDay(selectedDate)
                      : selectedDate,
                  });
                }
              }}
            />
          );
        }
      })()}
      {(() => {
        if (isClickStartTime === undefined) {
          return null;
        } else if (isClickStartTime) {
          return (
            <DateTimePicker
              value={data.start}
              mode="time"
              display="default"
              is24Hour={true}
              onChange={(event, selectedDate) => {
                setIsClickStartTime(undefined);
                if (event.type !== 'dismissed') {
                  setData({...data, start: selectedDate});
                }
              }}
            />
          );
        } else {
          return (
            <DateTimePicker
              value={data.end}
              mode="time"
              display="default"
              is24Hour={true}
              onChange={(event, selectedDate) => {
                setIsClickStartTime(undefined);
                if (event.type !== 'dismissed') {
                  setData({...data, end: selectedDate});
                }
              }}
            />
          );
        }
      })()}
      {!isClickColor ? null : (
        <Modal
          transparent
          animated={true}
          animationType="fade"
          onRequestClose={() => setIsClickColor(false)}>
          <TouchableWithoutFeedback onPress={() => onSetIsClickDay()}>
            <View style={styles.modalOverlay} />
          </TouchableWithoutFeedback>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              marginHorizontal: width * 0.1,
              marginVertical: height * 0.15,
            }}>
            <View
              style={{
                width: width * 0.8,
                height: height * 0.7,
                backgroundColor: 'white',
                borderRadius: 20,
              }}>
              <TriangleColorPicker
                defaultColor={data.color}
                onColorSelected={(color) => {
                  setIsClickColor(false);
                  setData({...data, color: color});
                }}
                style={{flex: 6}}
                ref={colorRef}
              />
              <View style={{flexDirection: 'row', flex: 1}}>
                <TouchableNativeFeedback onPress={() => setIsClickColor(false)}>
                  <View
                    style={{
                      flex: 1,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Text style={{fontSize: 20}}>취소</Text>
                  </View>
                </TouchableNativeFeedback>
                <View
                  style={{
                    width: 1,
                    backgroundColor: '#ccc',
                    marginVertical: 20,
                  }}
                />
                <TouchableNativeFeedback
                  onPress={() => colorRef.current._onColorSelected()}>
                  <View
                    style={{
                      flex: 1,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Text style={{fontSize: 20}}>적용</Text>
                  </View>
                </TouchableNativeFeedback>
              </View>
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
};

export default Schedule;

const styles = StyleSheet.create({
  container: {flex: 1},
  modalOverlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#000000aa',
  },
});
