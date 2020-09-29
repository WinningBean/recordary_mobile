import React, {useLayoutEffect, useState, useRef, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Image,
  Modal,
  TouchableNativeFeedback,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from 'react-native';
import { format, differenceInCalendarDays, startOfSecond, endOfDay, parseISO, isAfter } from 'date-fns';
import {TriangleColorPicker} from 'react-native-color-picker';
import DateTimePicker from '@react-native-community/datetimepicker';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import FastImage from 'react-native-fast-image';

import {connect} from 'react-redux';

import axios from 'axios';

import * as dateFns from 'date-fns';
import Todo from './Todo'
import { Button } from 'react-native-paper';

const {width, height} = Dimensions.get('window');

const TodoTab = ({navigation, route}) => {

  const [toDoList, setTodoList] = useState([]);
  const [preToDoList, setPreTodoList] = useState([]);
  const [isOpen, setIsOpen] = useState(false)
  const [isClickColor, setIsClickColor] = useState(false);
  const [isClickDeadLine, setIsClickDeadLine] = useState(undefined);
  const [selectedDate, setSelectedDate] = useState(new Date());
  var today = new Date();
  var koreanWeek = undefined;
  const colorRef = useRef();


  const [data, setData] = useState(
    {
      userCd: route.params.userCd,
      toDoContent: input,
      toDoEndDate: today,
      toDoCol: 'rgb(64, 114, 89)',
      toDoSate: false,
    },
  );

  console.log('>>>>>>>>>>>>>>>>>>>>data.toDoCol>>>>>>>>>>>>>>>>>>>>>>>>>>' + data.toDoCol);

  useLayoutEffect(() => {
  
    navigation.setOptions({
      title: "할일",
      headerStyle: {backgroundColor: 'rgb(175, 77, 160)'},
      headerTintColor: 'white',
      headerTitleAlign: 'left',
      headerTitleStyle: {
        fontWeight: 'bold',
        fontSize: 24,
      }
    });

  }, []);


  const getToDoList = async () => {
    try{
    const {data} = await axios.get(
      `http://ec2-15-165-140-48.ap-northeast-2.compute.amazonaws.com:8080/toDo/${route.params.userCd}`,
    );
    if (data === '') {
      setTodoList([]);
    }
    console.log(data);
    setTodoList(data);
  }catch(error){
    console.error(error);
    Alert.alert('서버에러로 인하여 데이터를 받아오는데 실패하였습니다.');
  }
  };

  const getPreToDoList = async () => {
    try{
    const {data} = await axios.get(
      `http://ec2-15-165-140-48.ap-northeast-2.compute.amazonaws.com:8080/toDo/pre/${route.params.userCd}`,
    );
    if (data === '') {
      setPreTodoList([]);
    }
    console.log(data);
    setPreTodoList(data);
  }catch(error){
    console.error(error);
    Alert.alert('서버에러로 인하여 데이터를 받아오는데 실패하였습니다.');
  }
  };

  useEffect(() => {
   getToDoList();
   getPreToDoList();

  }, []);

  const scrollViewRef = useRef();
  const textInputRef = useRef();
  const [input, setInput] = useState('');

  const addToDo = (e) => {
    if (input === '') {
      return;
    }
    console.log('addToDo');
    axios
      .post(
        'http://ec2-15-165-140-48.ap-northeast-2.compute.amazonaws.com:8080/toDo/',
        {
          userCd: route.params.userCd,
          toDoContent: input,
          toDoEndDate: startOfSecond(endOfDay(selectedDate)).getTime(),
          toDoCol: data.toDoCol,
          toDoSate: false,
        },
      )
      .then(() => {
        textInputRef.current.clear();
      })
      .finally(() => {
        setInput('');
      });
  };

  switch (format(selectedDate, 'i')) {
    case '0':
      koreanWeek = '일요일';
      break;
    case '1':
      koreanWeek = '월요일';
      break;
    case '2':
      koreanWeek = '화요일';
      break;
    case '3':
      koreanWeek = '수요일';
      break;
    case '4':
      koreanWeek = '목요일';
      break;
    case '5':
      koreanWeek = '금요일';
      break;
    case '6':
      koreanWeek = '토요일';
      break;
    case '7':
      koreanWeek = '일요일';
      break;
    default:
      koreanWeek = '에러';
  }

  const loadToDo = (value, index) => {

    const deadline = differenceInCalendarDays( parseISO(value.toDoEndDate), today);

    return (
      <View style={styles.todo} key={`${value.toDoCd}`}>
        <TouchableOpacity 
          onClick={async () => { 
            try {
              await axios.post(`http://ec2-15-165-140-48.ap-northeast-2.compute.amazonaws.com:8080/toDo/update/${value.toDoCd}`);
            } catch (error) {
              onsole.error(error);
              Alert.alert('서버에러로 인하여 데이터를 수정하는데 실패하였습니다.');
            }
          }}>
          <View
            style={[
              styles.circle,
              value.toDoCompleteState ? styles.completedCircle : { borderColor: `${value.toDoCol}` }
            ]}

          />
        </TouchableOpacity>
        <View style ={{ marginLeft: 0, textAlign: 'left'}}>
          <Text
            style={[
              styles.text,
              value.toDoCompleteState ? styles.completedText : styles.uncompletedText
            ]}
          >
            {value.toDoContent}
          </Text>
          <Text style={styles.deadline}>
            {deadline === 0 ? 'D-DAY' : deadline > 0 ? `${deadline}일 후` : `${-deadline}일 전`}
          </Text>
        </View>
      </View>
    );
  };

  return ( 
    <KeyboardAvoidingView style={{flex: 1}}>
      <ScrollView       
       style={styles.Container}
       ref={scrollViewRef}
       onContentSizeChange={() => scrollViewRef.current.scrollToEnd(true)}>

        {isOpen ? (
          <View>
            {preToDoList.map((value, index) => loadToDo(value, index))}
            <TouchableOpacity onPress={() => setIsOpen(false)}>
              <View style={styles.open}>
              </View>
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity onPress={ ()=> setIsOpen(true)}>
            <View style={styles.open}>
            </View>
          </TouchableOpacity>
          )}
        {toDoList.map((value, index) => loadToDo(value, index))}
      </ScrollView>
      <View style={{justifyContent: "space-between",
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center'}}>
          <TouchableOpacity onPress={() => setIsClickDeadLine(true)}>
            <View
              style={{
                width: width*0.5                
              }}>
               <Text style={{fontSize:17}}>{`  ${format(selectedDate, 'yyyy/MM/dd')} ${koreanWeek}까지`}  </Text> 
            </View>

          </TouchableOpacity>
          <TouchableOpacity  onPress={() => setIsClickColor(true)}>
            <View style={{
                  width: 40,
                  height: 40,
                  borderRadius: 20,
              backgroundColor:data.toDoCol,
              marginVertical: 5,
              
            }}>

            </View>
          </TouchableOpacity>
      </View>
      <View
        style={[
          {
            borderTopColor: '#bbb',
            borderTopWidth: StyleSheet.hairlineWidth,
            height: height*0.07,
            paddingLeft: 5,
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: '#bbb'
          },
          styles.textWrite,
        ]}>
   
        <View style={styles.flexRow}>

          <TextInput
            autoFocus={true}
            style={{            
              paddingLeft: 10,
              paddingBottom: 10,
              paddingTop: 10,
              borderTopColor: '#bbb',
              borderTopWidth: StyleSheet.hairlineWidth,
              flex: 1,
              fontSize: 25
            }}
            placeholder="Add a new todo" 
            ref={textInputRef}
            onFocus={() =>
              setTimeout(() => scrollViewRef.current.scrollToEnd(true), 400)
            }
            onChangeText={(value) => setInput(value)}
            onSubmitEditing={addToDo}
          />

        </View>
        {(() => {
        if (isClickDeadLine === undefined) {
          return null;
        }else {
          return (
            <DateTimePicker
              value={data.toDoEndDate}
              mode="date"
              display="default"
              locale="ko"
              is24Hour={true}
              onChange={(event, selectedDate) => {
                setIsClickDeadLine(undefined);
                if (event.type !== 'dismissed') {
                  setSelectedDate(selectedDate);
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
          <TouchableWithoutFeedback onPress={() => setIsClickColor(false)}>
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
                  setData({...data, toDoCol: color});
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
    </KeyboardAvoidingView>
  )
};

export default TodoTab;


const styles = StyleSheet.create({
  Container: {
    backgroundColor: 'white',
    
  },
  keyboard: {
    height: 60,
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
  textWrite: {
    backgroundColor: 'white',
    height: 50,
  },
  todo: {
    width: width,
    borderBottomColor: "#bbb",
    borderBottomWidth: StyleSheet.hairlineWidth,
    flexDirection: "row",
    alignItems: "center",
    //justifyContent: "space-between"
  },
  circle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    marginRight: 20,
    marginLeft: 20
  },
  completedCircle: {
    borderColor: "#bbb"
  },
  uncompletedCircle: {
    borderColor: "#F23657"
  },
  text: {
    fontSize: 20,
    textAlign: "left",
    marginVertical: 10,
    marginBottom: 0
  },
  completedText: {
    color: "#bbb",
    textDecorationLine: "line-through"
  },
  uncompletedText: {
    color: "#353839"
  },
  open: {
    height: 30,
    borderBottomWidth: StyleSheet.hairlineWidth,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomColor: "#bbb",
    backgroundColor: '#eee'
  },
  deadline: {
    color: 'green', 
    fontSize: 14,
    marginBottom: 20
  },
  modalOverlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#000000aa',
  },
  modalContent: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: height * 0.08,
  }
});
