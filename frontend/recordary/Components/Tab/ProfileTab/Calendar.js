import React, {useState, useRef} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableHighlight,
  TouchableWithoutFeedback,
} from 'react-native';

import {Transition, Transitioning} from 'react-native-reanimated';

import * as dateFns from 'date-fns';

const {width} = Dimensions.get('window');
const Calendar = ({height}) => {
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
          flex: 0.8,
          justifyContent: 'center',
          flexDirection: 'row',
        }}>
        <Text
          style={{fontSize: 16, textAlignVertical: 'center', color: '#333'}}>
          {dateFns.format(currDate, 'MMM').toUpperCase()}
        </Text>
        <Text> </Text>
        <Text
          style={{fontSize: 16, textAlignVertical: 'center', color: '#333'}}>
          {dateFns.format(currDate, 'yyyy')}
        </Text>
      </View>
      <View
        style={{
          flex: 0.5,
          flexDirection: 'row',
          borderColor: '#eee',
          marginBottom: 3,
          borderTopWidth: 1,
          borderBottomWidth: 1,
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
      />
    </View>
  );
};

const Month = ({date, scList, onSetDate}) => {
  const [selectDate, setSelectDate] = useState(new Date());
  const cellsRef = useRef();
  const today = new Date();

  const monthStart = dateFns.startOfMonth(date);
  const monthEnd = dateFns.endOfMonth(monthStart);
  const startDate = dateFns.startOfWeek(monthStart);
  var endDate = dateFns.endOfWeek(monthEnd);
  dateFns.getWeeksInMonth(date) === 5
    ? (endDate = dateFns.addWeeks(endDate, 1))
    : null;

  var stack = [];

  const rows = [];
  let day = startDate;
  var days = [];
  const queueList = scList.slice();

  const onPressCell = (value) => {
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
              },
              dateFns.isSameDay(day, date)
                ? {
                    borderWidth: 2,
                    borderRadius: 6,
                    borderColor: '#999',
                    overflow: 'hidden',
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
                    if (dateFns.isSameWeek(day, date)) {
                      result.push(
                        <View
                          key={`blank-${day}-${i}`}
                          style={{height: 12, marginTop: 1}}
                        />,
                      );
                    } else {
                      result.push(
                        <View
                          key={`blank-${day}-${i}`}
                          style={{height: 2.6, marginTop: 1}}
                        />,
                      );
                    }
                  }
                }
                if (dateFns.isSameWeek(day, date)) {
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
                            marginTop: 1,
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
                            marginTop: 1,
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
                          marginTop: 1,
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
          dateFns.isSameWeek(date, dateFns.subDays(day, 1)) ? {flex: 2} : null,
        ]}>
        {days}
      </View>,
    );
    days = [];
    stack.forEach((value, index) => (value.index = index));
  }

  return (
    <Transitioning.View
      style={{flex: 6}}
      transition={
        <Transition.Together>
          <Transition.In type="fade" />
          <Transition.Change durationMs={150} />
        </Transition.Together>
      }
      ref={cellsRef}>
      {rows}
    </Transitioning.View>
  );
};

export default Calendar;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    backgroundColor: 'white',
    flex: 1,
    paddingBottom: 6,
  },
  weekleyWrap: {
    flex: 1,
    // backgroundColor: 'tomato',
    flexDirection: 'row',
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
