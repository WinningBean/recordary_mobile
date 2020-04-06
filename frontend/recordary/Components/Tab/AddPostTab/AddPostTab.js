import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const AddPostTab = () => {
  return (
    <View style={styles.container}>
      <Text>This is AddPost</Text>
    </View>
  );
};

export default AddPostTab;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'pink',
  },
});
