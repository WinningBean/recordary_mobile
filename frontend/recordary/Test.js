import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
  UIManager,
  LayoutAnimation,
  Text,
} from 'react-native';
import {PanGestureHandler, State} from 'react-native-gesture-handler';
import Animated from 'react-native-reanimated';

const Wrap = () => {
  const [list, setList] = useState([1, 2, 3, 4, 5, 6, 7]);

  useEffect(() => UIManager.setLayoutAnimationEnabledExperimental(true), []);
  const deleteItem = (item) => {
    const updatedList = list.filter((value) => item !== value);
    LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
    setList(updatedList);
  };

  return (
    <View styles={styles.container}>
      {list.map((value) => (
        <Test id={value} key={value} onSwipe={deleteItem} />
      ))}
    </View>
  );
};

const {
  Value,
  event,
  set,
  cond,
  eq,
  Clock,
  clockRunning,
  startClock,
  stopClock,
  spring,
  lessThan,
  greaterThan,
  or,
  call,
} = Animated;

const {width} = Dimensions.get('window');
const Test = (props) => {
  const currState = new Value(State.UNDETERMINED);
  const value = new Value(0);
  const clock = new Clock();
  const overValue = new Value(width * 0.4);
  const overMinusValue = new Value(width * -0.4);

  function runSpring(clock) {
    const state = {
      finished: new Value(0),
      velocity: new Value(0),
      position: new Value(0),
      time: new Value(0),
    };

    const config = {
      damping: 30,
      mass: 1,
      stiffness: 121.6,
      overshootClamping: false,
      restSpeedThreshold: 0.001,
      restDisplacementThreshold: 0.001,
      toValue: new Value(0),
    };

    return [
      cond(clockRunning(clock), 0, [
        set(state.finished, 0),
        set(state.velocity, 0),
        set(state.position, value),
        set(config.toValue, 0),
        startClock(clock),
      ]),
      spring(clock, state, config),
      cond(state.finished, stopClock(clock)),
      set(value, state.position),
    ];
  }

  const onGestureEvent = event([
    {
      nativeEvent: ({translationX}) =>
        cond(
          eq(currState, State.ACTIVE),
          set(value, translationX),
          cond(
            eq(currState, State.END),
            cond(
              or(
                greaterThan(value, overValue),
                lessThan(value, overMinusValue),
              ),
              call([], () => props.onSwipe(props.id)), // call 넣을곳
              runSpring(clock),
            ),
            stopClock(clock),
          ),
        ),
    },
  ]);

  return (
    <View style={{position: 'relative'}}>
      <PanGestureHandler
        onHandlerStateChange={event([
          {nativeEvent: ({state}) => set(currState, state)},
        ])}
        onGestureEvent={onGestureEvent}>
        <Animated.View
          style={[styles.item, {transform: [{translateX: value}]}]}>
          <Text>{props.id}</Text>
        </Animated.View>
      </PanGestureHandler>
      <View
        style={{
          position: 'absolute',
          top: 0,
          height: 80,
          width: width,
          zIndex: -1,
          backgroundColor: 'green',
        }}></View>
    </View>
  );
};

export default Wrap;

const styles = StyleSheet.create({
  container: {flex: 1},
  item: {
    height: 80,
    backgroundColor: 'tomato',
    borderRadius: 1,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
