import React, {useState} from 'react';
import {StyleSheet, Text, View, Dimensions} from 'react-native';

import * as dateFns from 'date-fns';

const {width} = Dimensions.get('window');
const Calendar = ({height}) => {
  const currDate = new Date();
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
      <Month date={currDate} />
    </View>
  );
};

const Month = ({date}) => {
  const [scList, setScList] = useState([
    {
      start: dateFns.addDays(new Date(), -5),
      end: dateFns.addDays(new Date(), -1),
      color: 'green',
    },
    {
      start: dateFns.addDays(new Date(), -4),
      end: dateFns.addDays(new Date(), -1),
      color: 'tomato',
    },
    {
      start: new Date(),
      end: dateFns.addDays(new Date(), 7),
      color: 'blue',
    },
    {
      start: new Date(),
      end: dateFns.addDays(new Date(), 4),
      color: 'gray',
    },
  ]);

  var selectDate = new Date();
  const monthStart = dateFns.startOfMonth(date);
  const monthEnd = dateFns.endOfMonth(monthStart);
  const startDate = dateFns.startOfWeek(monthStart);
  var endDate = dateFns.endOfWeek(monthEnd);
  dateFns.getWeeksInMonth(date) === 5
    ? (endDate = dateFns.addWeeks(endDate, 1))
    : null;

  let currIndex = 0;

  const rows = [];
  let day = startDate;
  let formattedDate = '';
  var days = [];

  const copyList = scList.splice(0);
  var queue = [];

  while (day <= endDate) {
    //dateFns.isSameWeek(selectDate, dateFns.subDays(day, 1))
    for (let i = 0; i < 7; i++) {
      while (
        copyList.length > 0 &&
        dateFns.isWithinInterval(day, {
          start: copyList[0].start,
          end: copyList[0].end,
        })
      ) {
        queue.push({
          value: copyList[0],
          index: queue.length > 0 ? queue[queue.length - 1].index + 1 : 0,
        });
        copyList.shift();
      }
      days.push(
        <View
          style={{
            flex: 1,
          }}
          key={day}>
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
              ]}>
              {dateFns.format(day, 'd')}
            </Text>
            {queue.map((draft) => {
              const result = [];
              for (let i = 0; i < draft.index; i++) {
                result.push(<View style={{height: 2.6, marginTop: 1}} />);
              }
              result.push(
                <View
                  key={`${day}-${draft.index}`}
                  style={[
                    {
                      height: 2.6,
                      marginTop: 1,
                      opacity: 0.75,
                      backgroundColor: draft.value.color,
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
              return result;
            })}
          </View>
        </View>,
      );
      while (queue.length > 0 && dateFns.isSameDay(day, queue[0].value.end)) {
        queue.shift();
      }
      day = dateFns.addDays(day, 1);
    }
    rows.push(<View style={styles.weekleyWrap}>{days}</View>);
    days = [];
    queue.forEach((value, index) => (value.index = index));
  }

  return <>{rows}</>;
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
