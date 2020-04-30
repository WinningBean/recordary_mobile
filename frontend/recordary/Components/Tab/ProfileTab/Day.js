import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Modal,
  ScrollView,
} from 'react-native';
import {he} from 'date-fns/locale';

const {width, height} = Dimensions.get('window');
const Day = () => {
  const [list, setList] = useState([0, 1, 2]);
  return (
    <Modal transparent>
      <ScrollView
        horizontal
        scrollEventThrottle={16}
        showsHorizontalScrollIndicator={false}
        snapToInterval={width}
        disableIntervalMomentum
        contentContainerStyle={{width: width * list.length}}
        onMomentumScrollEnd={(e) => {
          if (e.nativeEvent.contentOffset.x < 10) {
            const copylist = list.slice();
            copylist.pop();
            copylist.unshift('hh');
            e.nativeEvent.contentOffset.x = width;
            setList(copylist);
          }
        }}>
        {list.map((value, index) => {
          return <DayCell key={index} data={value} />;
        })}
      </ScrollView>
    </Modal>
  );
};

const DayCell = (props) => {
  return (
    <View style={styles.container}>
      <View
        style={{
          width: width * 0.8,
          height: height * 0.7,
          backgroundColor: 'white',
          borderRadius: 20,
        }}>
        <Text style={{color: 'black'}}>{props.data}</Text>
      </View>
    </View>
  );
};

export default Day;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000aa',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
