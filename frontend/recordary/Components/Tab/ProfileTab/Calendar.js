import React, {useState, useRef, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Animated,
} from 'react-native';

import {Transition, Transitioning} from 'react-native-reanimated';
import {PanGestureHandler, State} from 'react-native-gesture-handler';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import AsyncStorage from '@react-native-community/async-storage';

import * as dateFns from 'date-fns';

import Day from './Day';

const colorContrast = (hexColor) => {
  var hexToDec = function (hexString) {
    var decString = hexString.replace(/[^a-f0-9]/gi, '');
    return parseInt(decString, 16);
  };

  var red = hexToDec(hexColor.substr(1, 2));
  var green = hexToDec(hexColor.substr(3, 2));
  var blue = hexToDec(hexColor.substr(5, 2));

  var contrast = Math.sqrt(
    red * red * 0.241 + green * green * 0.691 + blue * blue * 0.068,
  );

  if (contrast > 130) {
    return '#000000';
  } else {
    return '#FFF';
  }
};

const {event, Value} = Animated;

// scheduleList : {
//   list : [{start:, end:, nm, ex:, index : }] 스케줄 리스트
//   index:
// }

const {width} = Dimensions.get('window');
const Calendar = ({
  scheduleList,
  setScheduleList,
  selectedDate,
  setSelectedDate,
  isFullCalendar,
  onSmallCalendar,
  onFullCalendar,
  onSaveScList,
}) => {
  const [isClickDay, setIsClickDay] = useState(false);

  // useEffect(() => {
  //   console.log('render', scListState);
  //   (async () => {
  //     await AsyncStorage.setItem('scList', JSON.stringify(scListState));
  //     onSaveScList(scListState);
  //   })();
  // }, [scListState]);

  return (
    <View style={styles.container}>
      <View
        style={{
          height: 40,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <TouchableOpacity
          onPress={() =>
            setSelectedDate(
              dateFns.endOfMonth(dateFns.subMonths(selectedDate, 1)),
            )
          }>
          <MaterialCommunityIcons name="menu-left" size={40} color="gray" />
        </TouchableOpacity>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'row',
          }}>
          <Text style={{fontSize: 16, color: '#333'}}>
            {dateFns.format(selectedDate, 'MMM').toUpperCase()}
          </Text>
          <Text> </Text>
          <Text style={{fontSize: 16, color: '#333'}}>
            {dateFns.format(selectedDate, 'yyyy')}
          </Text>
        </View>
        <TouchableOpacity
          onPress={() =>
            setSelectedDate(
              dateFns.startOfMonth(dateFns.addMonths(selectedDate, 1)),
            )
          }>
          <MaterialCommunityIcons name="menu-right" size={40} color="gray" />
        </TouchableOpacity>
      </View>
      <View
        style={{
          flex: 0.5,
          flexDirection: 'row',
          borderColor: '#eee',
          marginBottom: 3,
          borderTopWidth: 1,
          borderBottomWidth: 1,
          marginHorizontal: 10,
        }}>
        <Text style={[styles.weeklyText, {color: '#FF7777'}]}>SUN</Text>
        <Text style={styles.weeklyText}>SUN</Text>
        <Text style={styles.weeklyText}>MON</Text>
        <Text style={styles.weeklyText}>TUE</Text>
        <Text style={styles.weeklyText}>WED</Text>
        <Text style={styles.weeklyText}>THU</Text>
        <Text style={[styles.weeklyText, {color: '#8888FF'}]}>FRI</Text>
      </View>
      <Month
        scheduleList={scheduleList}
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
        isFullCalendar={isFullCalendar}
        onFullCalendar={() => onFullCalendar()}
        onSmallCalendar={() => onSmallCalendar()}
        onSetIsClickDay={() => setIsClickDay(true)}
      />
      {isClickDay ? (
        <Day
          selectedDate={selectedDate}
          onSetIsClickDay={() => setIsClickDay(false)}
          data={scheduleList.filter((value) =>
            dateFns.isWithinInterval(selectedDate, {
              start: dateFns.startOfDay(value.scheduleStr),
              end: dateFns.endOfDay(value.scheduleEnd),
            }),
          )}
          onSetData={(value) => {
            var copyList = scheduleList.slice();
            for (let i = 0; i < copyList.length; i++) {
              if (value.scheduleCd === copyList[i].scheduleCd) {
                copyList[i] = value;
                break;
              }
            }
            setScheduleList(copyList);
          }}
          onRegisterData={(value) => {
            const draft = scheduleList.slice().concat(value);
            draft.sort((a, b) => {
              if (dateFns.isSameDay(a.scheduleStr, b.scheduleStr)) {
                if (dateFns.isSameDay(a.scheduleEnd, b.scheduleEnd)) {
                  return 0;
                }
                return dateFns.differenceInDays(b.scheduleEnd, a.scheduleEnd);
              }
              return dateFns.differenceInDays(a.scheduleStr, b.scheduleStr);
            });
            setScheduleList(draft);
          }}
          onDeleteData={(scheduleCd) => {
            console.log(index);
            const index = scheduleList.findIndex(
              (value) => value.scheduleCd === scheduleCd,
            );
            var copyList = scheduleList.slice();
            copyList[index].splice(index, 1);
            setScheduleList(copyList);
          }}
        />
      ) : null}
    </View>
  );
};

const Month = ({
  selectedDate,
  scheduleList,
  setScheduleList,
  setSelectedDate,
  isFullCalendar,
  onSmallCalendar,
  onFullCalendar,
  onSetIsClickDay,
}) => {
  const cellsRef = useRef();
  const today = new Date();

  const value = useRef(new Value(0)).current;
  const [state, setState] = useState(0);

  useEffect(() => {
    console.log(state, 'state');
    Animated.spring(value, {
      velocity: 10,
      tension: 0,
      friction: 20,
      toValue: 0,
      useNativeDriver: true,
    }).start();
  }, [selectedDate]);

  const GetMonth = () => {
    const monthStart = dateFns.startOfMonth(selectedDate);

    const monthEnd = dateFns.endOfMonth(monthStart);
    const startDate = dateFns.startOfWeek(monthStart);
    var endDate = dateFns.endOfWeek(monthEnd);
    dateFns.getWeeksInMonth(monthStart) === 5
      ? (endDate = dateFns.addWeeks(endDate, 1))
      : null;

    var stack = [];

    const rows = [];
    let day = startDate;
    var days = [];
    const queueList = scheduleList.slice();

    const onPressCell = (value) => {
      if (dateFns.isSameDay(value, selectedDate)) {
        return;
      }
      cellsRef.current.animateNextTransition();
      setSelectedDate(value);
    };

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        while (
          queueList.length > 0 &&
          dateFns.isWithinInterval(day, {
            start: dateFns.startOfDay(queueList[0].scheduleStr),
            end: dateFns.endOfDay(queueList[0].scheduleEnd),
          })
        ) {
          if (
            stack.length > 0 &&
            stack[stack.length - 1].index !== stack.length - 1
          ) {
            for (let a = 0; a < stack.length; a++) {
              if (stack[a].index > a) {
                stack.splice(a, 0, {
                  value: queueList[0],
                  index: a,
                });
              }
            }
          } else {
            stack.push({
              value: queueList[0],
              index: stack.length > 0 ? stack[stack.length - 1].index + 1 : 0,
            });
          }
          queueList.shift();
        }
        const currDay = day;
        days.push(
          <TouchableWithoutFeedback
            key={`cell-${day}`}
            onPress={() => {
              if (dateFns.isSameWeek(selectedDate, currDay) || isFullCalendar) {
                onSetIsClickDay();
              }
              onPressCell(currDay);
            }}>
            <View
              style={[
                {
                  flex: 1,
                  overflow: 'hidden',
                },
                dateFns.isSameDay(day, selectedDate)
                  ? {
                      borderWidth: 2,
                      borderRadius: 6,
                      borderColor: '#999',
                    }
                  : null,
              ]}>
              <View>
                <Text
                  style={[
                    {
                      paddingLeft: 4,
                      fontSize: 12,
                      color: '#333',
                      // textAlign: 'center',
                    },
                    dateFns.isSaturday(day) ? {color: '#8888FF'} : null,
                    dateFns.isSunday(day) ? {color: '#FF7777'} : null,
                    !dateFns.isSameMonth(day, monthStart)
                      ? {color: 'lightgray'}
                      : null,
                    ,
                    dateFns.isSameDay(today, day)
                      ? {
                          borderLeftWidth: 22,
                          borderLeftColor: 'rgba(20, 81, 51, 0.8)',
                          color: 'white',
                          fontWeight: 'bold',
                        }
                      : null,
                  ]}>
                  {dateFns.format(day, 'd')}
                </Text>
                {stack.map((draft, index) => {
                  const result = [];
                  if (index !== draft.index) {
                    for (let i = 0; i < draft.index - index; i++) {
                      if (
                        isFullCalendar ||
                        dateFns.isSameWeek(day, selectedDate)
                      ) {
                        result.push(
                          <View
                            key={`blank-${day}-${i}`}
                            style={{height: 12, marginTop: 2}}
                          />,
                        );
                      } else {
                        result.push(
                          <View
                            key={`blank-${day}-${i}`}
                            style={{height: 2.6, marginTop: 2}}
                          />,
                        );
                      }
                    }
                  }
                  if (isFullCalendar || dateFns.isSameWeek(day, selectedDate)) {
                    if (
                      dateFns.isSameDay(draft.value.scheduleStr, day) ||
                      dateFns.isSameDay(
                        dateFns.startOfWeek(selectedDate, draft),
                        day,
                      )
                    ) {
                      result.push(
                        <View
                          key={`schedule-${day}-${draft.index}`}
                          style={[
                            {
                              height: 12,
                              marginTop: 2,
                              backgroundColor: draft.value.scheduleCol,
                              overflow: 'hidden',
                            },
                            dateFns.isSameDay(draft.value.scheduleStr, day)
                              ? {marginLeft: 5}
                              : null,
                            dateFns.isSameDay(draft.value.scheduleEnd, day)
                              ? {marginRight: 5}
                              : null,
                          ]}>
                          <Text
                            style={{
                              textAlignVertical: 'center',
                              fontSize: 12,
                              lineHeight: 12,
                              fontWeight: 'bold',
                              color: colorContrast(draft.value.scheduleCol),
                            }}>
                            {draft.value.scheduleNm}
                          </Text>
                        </View>,
                      );
                    } else {
                      result.push(
                        <View
                          key={`schedule-${day}-${draft.index}`}
                          style={[
                            {
                              height: 12,
                              marginTop: 2,
                              backgroundColor: draft.value.scheduleCol,
                            },
                            dateFns.isSameDay(draft.value.scheduleStr, day)
                              ? {marginLeft: 5}
                              : null,
                            dateFns.isSameDay(draft.value.scheduleEnd, day)
                              ? {marginRight: 5}
                              : null,
                          ]}
                        />,
                      );
                    }
                  } else {
                    result.push(
                      <View
                        key={`schedule-${day}-${draft.index}`}
                        style={[
                          {
                            height: 2.6,
                            marginTop: 2,
                            backgroundColor: draft.value.scheduleCol,
                          },
                          dateFns.isSameDay(draft.value.scheduleStr, day)
                            ? {marginLeft: 5}
                            : null,
                          dateFns.isSameDay(draft.value.scheduleEnd, day)
                            ? {marginRight: 5}
                            : null,
                        ]}
                      />,
                    );
                  }
                  return result;
                })}
              </View>
            </View>
          </TouchableWithoutFeedback>,
        );
        stack = stack.filter(
          (val) => !dateFns.isSameDay(day, val.value.scheduleEnd),
        );
        day = dateFns.addDays(day, 1);
      }
      rows.push(
        <View
          key={`week-${day}`}
          style={[
            styles.weekleyWrap,
            isFullCalendar ||
            dateFns.isSameWeek(selectedDate, dateFns.subDays(day, 1))
              ? {flex: 2}
              : null,
          ]}>
          {days}
        </View>,
      );
      days = [];
      stack.forEach((value, index) => (value.index = index));
    }
    return rows;
  };

  const onHandlerStateChange = (e) => {
    if (state === 0) {
      if (e.nativeEvent.state === State.ACTIVE) {
        if (isFullCalendar) {
          e.nativeEvent.velocityY > 300 ? onSmallCalendar() : null;
        } else {
          e.nativeEvent.velocityY < -300 ? onFullCalendar() : null;
        }
        Math.abs(e.nativeEvent.velocityX) > 60 ? setState(1) : null;
      }
    } else {
      if (e.nativeEvent.oldState === State.ACTIVE) {
        if (e.nativeEvent.translationX > 150 || e.nativeEvent.velocityX > 800) {
          value.setValue(-width);
          setSeletedDate(dateFns.endOfMonth(dateFns.addMonths(date, -1)));
        } else if (
          e.nativeEvent.translationX < -150 ||
          e.nativeEvent.velocityX < -800
        ) {
          value.setValue(width);
          setSeletedDate(dateFns.startOfMonth(dateFns.addMonths(date, 1)));
        } else {
          Animated.spring(value, {
            velocity: 10,
            tension: 0,
            friction: 20,
            toValue: 0,
            useNativeDriver: true,
          }).start();
        }
        setState(0);
      }
    }
  };

  const transition = (
    <Transition.Together>
      <Transition.In type="fade" />
      <Transition.Change durationMs={150} />
    </Transition.Together>
  );

  return (
    <Transitioning.View
      style={{flex: 6}}
      transition={transition}
      ref={cellsRef}>
      <PanGestureHandler
        onHandlerStateChange={onHandlerStateChange}
        onGestureEvent={event(
          [
            {
              nativeEvent: {
                translationX: state === 1 ? value : null,
              },
            },
          ],
          {useNativeDriver: true},
        )}>
        <Animated.View
          style={[
            {flex: 1},
            {
              transform: [{translateX: value}],
            },
          ]}>
          {GetMonth()}
        </Animated.View>
      </PanGestureHandler>
    </Transitioning.View>
  );
};

export default Calendar;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    paddingBottom: 6,
  },
  weekleyWrap: {
    flex: 1,
    // backgroundColor: 'tomato',
    flexDirection: 'row',
    paddingHorizontal: 10,
  },
  weeklyText: {
    flex: 1,
    // backgroundColor: 'green',
    textAlignVertical: 'center',
    textAlign: 'center',
    fontSize: 11,
    color: '#777',
  },
});
