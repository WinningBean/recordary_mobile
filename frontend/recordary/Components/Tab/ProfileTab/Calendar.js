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

import * as dateFns from 'date-fns';

import Day from './Day';

const {event, Value} = Animated;

const {width} = Dimensions.get('window');
const Calendar = ({isFullCalendar, onSmallCalendar, onFullCalendar}) => {
  const [scList, setScList] = useState([
    {
      start: dateFns.addDays(new Date(), -5),
      end: dateFns.addDays(new Date(), -1),
      color: '#f1c40f',
    },
    {
      start: dateFns.addDays(new Date(), -4),
      end: new Date(),
      color: '#2ecc71',
    },
    {
      start: new Date(),
      end: dateFns.addDays(new Date(), 7),
      color: '#2ecc71',
    },
    {
      start: new Date(),
      end: dateFns.addDays(new Date(), 4),
      color: '#2ecc71',
    },
    {
      start: new Date(),
      end: new Date(),
      color: '#9b59b6',
    },
    {
      start: dateFns.addDays(new Date(), 1),
      end: dateFns.addDays(new Date(), 3),
      color: '#9b59b6',
    },
    {
      start: dateFns.addDays(new Date(), 10),
      end: dateFns.addDays(new Date(), 18),
      color: '#9b59b6',
    },
    {
      start: dateFns.addDays(new Date(), 13),
      end: dateFns.addDays(new Date(), 13),
      color: '#bdc3c7',
    },
    {
      start: dateFns.addDays(new Date(), 13),
      end: dateFns.addDays(new Date(), 13),
      color: '#bdc3c7',
    },
    {
      start: dateFns.addDays(new Date(), 13),
      end: dateFns.addDays(new Date(), 13),
      color: '#bdc3c7',
    },
    {
      start: dateFns.addDays(new Date(), 13),
      end: dateFns.addDays(new Date(), 30),
      color: '#34495e',
    },
    {
      start: dateFns.addDays(new Date(), 14),
      end: dateFns.addDays(new Date(), 18),
      color: '#34495e',
    },
    {
      start: dateFns.addDays(new Date(), 14),
      end: dateFns.addDays(new Date(), 18),
      color: '#34495e',
    },
    {
      start: dateFns.addDays(new Date(), 14),
      end: dateFns.addDays(new Date(), 18),
      color: '#3498db',
    },
  ]);
  const [currDate, setCurrDate] = useState(new Date());

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
            setCurrDate(dateFns.endOfMonth(dateFns.subMonths(currDate, 1)))
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
            {dateFns.format(currDate, 'MMM').toUpperCase()}
          </Text>
          <Text> </Text>
          <Text style={{fontSize: 16, color: '#333'}}>
            {dateFns.format(currDate, 'yyyy')}
          </Text>
        </View>
        <TouchableOpacity
          onPress={() =>
            setCurrDate(dateFns.startOfMonth(dateFns.addMonths(currDate, 1)))
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
        scList={scList}
        date={currDate}
        onSetDate={(value) => setCurrDate(value)}
        isFullCalendar={isFullCalendar}
        onFullCalendar={() => onFullCalendar()}
        onSmallCalendar={() => onSmallCalendar()}
      />
      <Day />
    </View>
  );
};

const Month = ({
  date,
  scList,
  onSetDate,
  isFullCalendar,
  onSmallCalendar,
  onFullCalendar,
}) => {
  const cellsRef = useRef();
  const today = new Date();

  const value = useRef(new Value(0)).current;
  const [state, setState] = useState(0);
  const velocityY = useRef(new Value(0)).current;

  useEffect(() => {
    console.log(state, 'state');
    Animated.spring(value, {
      velocity: 10,
      tension: 0,
      friction: 20,
      toValue: 0,
      useNativeDriver: true,
    }).start();
  }, [date]);

  // 0 main
  // 1 pre
  // 2 next
  const GetMonth = () => {
    const monthStart = dateFns.startOfMonth(date);

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
    const queueList = scList.slice();

    const onPressCell = (value) => {
      if (dateFns.isSameDay(value, date)) {
        return;
      }
      cellsRef.current.animateNextTransition();
      onSetDate(value);
    };

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        while (
          queueList.length > 0 &&
          dateFns.isWithinInterval(day, {
            start: dateFns.startOfDay(queueList[0].start),
            end: dateFns.endOfDay(queueList[0].end),
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
            onPress={() => onPressCell(currDay)}>
            <View
              style={[
                {
                  flex: 1,
                  overflow: 'hidden',
                },
                dateFns.isSameDay(day, date)
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
                      if (isFullCalendar || dateFns.isSameWeek(day, date)) {
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
                  if (isFullCalendar || dateFns.isSameWeek(day, date)) {
                    if (
                      dateFns.isSameDay(draft.value.start, day) ||
                      dateFns.isSameDay(dateFns.startOfWeek(date, draft), day)
                    ) {
                      result.push(
                        <View
                          key={`schedule-${day}-${draft.index}`}
                          style={[
                            {
                              height: 12,
                              marginTop: 2,
                              backgroundColor: `${draft.value.color}A0`,
                              overflow: 'hidden',
                            },
                            dateFns.isSameDay(draft.value.start, day)
                              ? {marginLeft: 5}
                              : null,
                            dateFns.isSameDay(draft.value.end, day)
                              ? {marginRight: 5}
                              : null,
                          ]}>
                          <Text
                            style={{
                              textAlignVertical: 'center',
                              fontSize: 12,
                              lineHeight: 12,
                            }}>
                            Hello World
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
                              backgroundColor: `${draft.value.color}A0`,
                            },
                            dateFns.isSameDay(draft.value.start, day)
                              ? {marginLeft: 5}
                              : null,
                            dateFns.isSameDay(draft.value.end, day)
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
                            backgroundColor: `${draft.value.color}A0`,
                          },
                          dateFns.isSameDay(draft.value.start, day)
                            ? {marginLeft: 5}
                            : null,
                          dateFns.isSameDay(draft.value.end, day)
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
        stack = stack.filter((val) => !dateFns.isSameDay(day, val.value.end));
        day = dateFns.addDays(day, 1);
      }
      rows.push(
        <View
          key={`week-${day}`}
          style={[
            styles.weekleyWrap,
            isFullCalendar || dateFns.isSameWeek(date, dateFns.subDays(day, 1))
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

  console.log('render');
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
          onSetDate(dateFns.endOfMonth(dateFns.addMonths(date, -1)));
        } else if (
          e.nativeEvent.translationX < -150 ||
          e.nativeEvent.velocityX < -800
        ) {
          value.setValue(width);
          onSetDate(dateFns.startOfMonth(dateFns.addMonths(date, 1)));
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
