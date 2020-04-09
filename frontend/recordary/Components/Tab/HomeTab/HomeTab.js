import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';

const HomeTab = ({navigation}) => {
  return (
    <View>
      <Text></Text>
      <TouchableOpacity onPress={() => navigation.openDrawer()}>
        <Text style={{width: 150, height: 150}}>aa</Text>
      </TouchableOpacity>
    </View>
  );
};

export default HomeTab;

const styles = StyleSheet.create({});
