import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const ActiviteTab = () => {
  return (
    <View style={styles.container}>
      <Text>This is Activite</Text>
    </View>
  );
};

export default ActiviteTab;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'orange',
  },
});
