import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const RecommentList = ({list}) => {
  return list.map((value) => (
    <View style={[styles.flexRow]} key={`대댓글-img${value.commentCd}`}>
      <Image
        source={{
          uri: value.userFK.userPic,
        }}
        style={{
          width: 30,
          height: 30,
          resizeMode: 'cover',
          borderRadius: 50,
          marginTop: 10,
        }}
      />
      <View
        style={{
          display: 'flex',
          paddingTop: 5,
          paddingBottom: 5,
          paddingLeft: 10,
        }}>
        <View style={styles.flexRow}>
          <Text style={{fontSize: 13, fontWeight: 'bold'}}>
            {value.userFK.userId}({value.userFK.userNm})
          </Text>
          <Text style={{fontSize: 13, paddingLeft: 10}}>
            {value.commentContent}
          </Text>
        </View>
      </View>
    </View>
  ));
};

export default RecommentList;

const styles = StyleSheet.create({
  spaceBetween: {
    paddingLeft: 5,
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
});
