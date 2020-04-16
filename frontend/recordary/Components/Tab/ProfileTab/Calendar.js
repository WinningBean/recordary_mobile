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
          flex: 1.5,
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

  while (day <= endDate) {
    for (let i = 0; i < 7; i++) {
      formattedDate = dateFns.format(day, 'd');

      let sc = scList.filter((value) =>
        dateFns.isWithinInterval(day, {
          start: dateFns.startOfDay(value.start),
          end: dateFns.endOfDay(value.end),
        }),
      );

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
              {formattedDate}
            </Text>
          </View>
          {sc.map((value, index) => (
            <View
              key={`${value}-${index}`}
              style={[
                {
                  height: 4,
                  marginTop: 1,
                  opacity: 0.75,
                  backgroundColor: value.color,
                },
                dateFns.isSameDay(value.start, day) ? {marginLeft: 5} : null,
                dateFns.isSameDay(value.end, day) ? {marginRight: 5} : null,
              ]}
            />
          ))}
        </View>,
      );
      day = dateFns.addDays(day, 1);
    }
    rows.push(<View style={styles.weekleyWrap}>{days}</View>);
    days = [];
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
