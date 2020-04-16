import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  TouchableNativeFeedback,
  TextInput,
  Dimensions,
} from 'react-native';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const {height} = Dimensions.get('window');
const Search = ({navigation}) => {
  const [input, setInput] = useState('');

  console.log(input);
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <View style={styles.container}>
        <View style={styles.search}>
          <TouchableNativeFeedback onPress={() => navigation.goBack()}>
            {/* only android */}
            <View
              style={{
                width: 50,
                height: 50,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <MaterialCommunityIcons name="arrow-left" size={34} />
            </View>
          </TouchableNativeFeedback>
          <TextInput
            style={{flex: 1, fontSize: 18}}
            placeholder="검색"
            returnKeyType="search"
            autoFocus={true}
            onChangeText={(value) => setInput(value)}
          />
        </View>
        {input === '' ? (
          <View
            style={{
              height: height / 2,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{fontSize: 20}}>검색검색검색</Text>
          </View>
        ) : null}
      </View>
    </>
  );
};

export default Search;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 25,
    backgroundColor: 'white',
  },
  item: {
    height: 70,
    backgroundColor: 'white',
    flexDirection: 'row',
  },
  itemImage: {
    height: 60,
    width: 60,
    borderRadius: 50,
  },
  itemContent: {
    flex: 1,
  },
  search: {
    height: 50,
    backgroundColor: '#f8f8f8',
    marginHorizontal: 20,
    marginVertical: 10,
    borderRadius: 5,
    flexDirection: 'row',
  },
});
