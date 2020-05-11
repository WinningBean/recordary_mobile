import React from 'react';
import {View, Dimensions, ScrollView, Modal} from 'react-native';

const {width, height} = Dimensions.get('window');

import FastImage from 'react-native-fast-image';

const ClickPicture = ({imageList, onClose}) => {
  return (
    <Modal
      transparent
      animated={true}
      animationType="fade"
      onRequestClose={() => onClose()}>
      <ScrollView
        style={{height: height * (width / height)}}
        horizontal
        scrollEventThrottle={16}
        showsHorizontalScrollIndicator={false}
        snapToInterval={width}
        disableIntervalMomentum
        contentContainerStyle={{width: width * imageList.length}}>
        {imageList.map((value, index) => {
          return (
            <View
              key={`click-img-${index}`}
              style={{backgroundColor: '#000000dd', justifyContent: 'center'}}>
              <FastImage
                resizeMode={FastImage.resizeMode.cover}
                source={{uri: value}}
                style={{width: width, height: height * (width / height)}}
              />
            </View>
          );
        })}
      </ScrollView>
    </Modal>
  );
};

export default ClickPicture;
