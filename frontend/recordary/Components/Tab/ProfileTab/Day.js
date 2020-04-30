import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Modal,
  ScrollView,
  Alert,
  TouchableWithoutFeedback,
  TouchableNativeFeedback,
  TouchableOpacity,
} from 'react-native';

import {useNavigation} from '@react-navigation/native';

import * as dateFns from 'date-fns';
import Animated from 'react-native-reanimated';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const {eq, event, Value, set} = Animated;

const {width, height} = Dimensions.get('window');
const Day = ({data, currDate, onSetIsClickDay, onSetData, onRegisterData}) => {
  const navigation = useNavigation();
  return (
    <Modal
      transparent
      animated={true}
      animationType="fade"
      onRequestClose={() => onSetIsClickDay()}>
      <TouchableWithoutFeedback onPress={() => onSetIsClickDay()}>
        <View style={styles.modalOverlay} />
      </TouchableWithoutFeedback>
      <View style={styles.container}>
        <View
          style={{
            width: width * 0.8,
            height: height * 0.7,
            backgroundColor: 'white',
            borderRadius: 20,
            position: 'relative',
          }}>
          <View
            style={{
              height: height * 0.12,
              borderBottomWidth: 1,
              borderBottomColor: '#eee',
              marginHorizontal: 12,
              paddingHorizontal: 10,
              paddingTop: height * 0.04,
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
            }}>
            <Text style={{fontSize: height * 0.04}}>
              {dateFns.format(currDate, 'd일')}
            </Text>
          </View>
          <ScrollView>
            {data.map((value, index) => (
              <TouchableNativeFeedback
                key={index}
                onPress={() => {
                  const currIndex = index;
                  onSetIsClickDay();
                  navigation.push('schedule', {
                    data: value,
                    onSave: (value) => {
                      onSetData(value, currIndex);
                    },
                  });
                }}>
                <View
                  style={{
                    height: height * 0.1,
                    paddingHorizontal: 22,
                    paddingVertical: height * 0.02,
                    flexDirection: 'row',
                  }}>
                  <View
                    style={{
                      width: width * 0.06,
                    }}>
                    <View
                      style={{
                        marginTop: 4,
                        width: width * 0.03,
                        height: width * 0.03,
                        borderRadius: 50,
                        backgroundColor: value.color,
                      }}
                    />
                  </View>
                  <View style={{flex: 1}}>
                    <Text style={{fontWeight: 'bold'}}>{value.ex}</Text>
                    <Text style={{color: '#888'}}>
                      {dateFns.isSameDay(currDate, value.start) &&
                      dateFns.isSameDay(currDate, value.end)
                        ? `${
                            dateFns.format(value.start, 'aa') === 'AM'
                              ? '오전'
                              : '오후'
                          } ${dateFns.format(value.start, 'h:mm')} - ${
                            dateFns.format(value.end, 'aa') === 'AM'
                              ? '오전'
                              : '오후'
                          } ${dateFns.format(value.end, 'h:mm')}`
                        : '하루 종일'}
                    </Text>
                  </View>
                </View>
              </TouchableNativeFeedback>
            ))}
          </ScrollView>
          <TouchableOpacity
            onPress={() => {
              onSetIsClickDay();
              navigation.push('schedule', {
                data: undefined,
                currDate: currDate,
                onRegister: (value) => onRegisterData(value),
              });
            }}
            style={{
              position: 'absolute',
              bottom: 30,
              right: 20,
              width: 50,
              height: 50,
            }}>
            <View
              style={{
                flex: 1,
                borderRadius: 50,
                backgroundColor: 'rgb(64, 114, 89)',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <MaterialCommunityIcons name="plus" color="white" size={28} />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default Day;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: width * 0.1,
    marginVertical: height * 0.15,
  },
  modalOverlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#000000aa',
  },
});
