import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from 'react-native';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {connect} from 'react-redux';

import AsyncStorage from '@react-native-community/async-storage';

const Setting = ({navigation, onLogout}) => {
  return (
    <View style={styles.container}>
      <ScrollView style={{height: Dimensions.get('window').height * 0.8}}>
        <TouchableOpacity>
          <View style={[styles.listStyle, styles.flexRow]}>
            <MaterialIcons name="person-outline" size={25} />
            <Text style={{marginLeft: 10, fontSize: 17}}>계정</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity>
          <View style={[styles.listStyle, styles.flexRow]}>
            <MaterialIcons name="notifications-none" size={25} />
            <Text style={{marginLeft: 10, fontSize: 17}}>알림</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity>
          <View style={[styles.listStyle, styles.flexRow]}>
            <MaterialIcons name="lock-outline" size={25} />
            <Text style={{marginLeft: 10, fontSize: 17}}>공개범위</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity>
          <View style={[styles.listStyle, styles.flexRow]}>
            <MaterialIcons name="security" size={25} />
            <Text style={{marginLeft: 10, fontSize: 17}}>보안</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity>
          <View style={[styles.listStyle, styles.flexRow]}>
            <MaterialIcons name="help-outline" size={25} />
            <Text style={{marginLeft: 10, fontSize: 17}}>도움말</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            AsyncStorage.clear();
            onLogout();
          }}>
          <View style={[styles.listStyle, styles.flexRow]}>
            <MaterialCommunityIcons name="logout" size={25} />
            <Text style={{marginLeft: 10, fontSize: 17}}>로그아웃</Text>
          </View>
        </TouchableOpacity>
      </ScrollView>
      <View
        style={[
          styles.spaceBetween,
          {
            height: 100,
            backgroundColor: '#ddd',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'flex-start',
          },
        ]}>
        <Text style={{color: 'gray', marginLeft: 15}}>From.</Text>
        <Text style={{marginLeft: 15, fontSize: 17}}>FairyPitta</Text>
      </View>
    </View>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    onLogout: () => {
      dispatch({type: 'SET_LOGIN', isLogin: false});
    },
  };
};

export default connect(null, mapDispatchToProps)(Setting);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 5,
  },
  spaceBetween: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  flexRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  listStyle: {
    padding: 10,
    // borderBottomColor: 'lightgray',
    // borderBottomWidth: 1,
    // borderTopColor: 'lightgray',
    // borderTopWidth: 1,
  },
});
