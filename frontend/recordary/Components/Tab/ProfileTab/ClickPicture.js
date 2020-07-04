import React, {useState} from 'react';
import {
  View,
  Dimensions,
  ScrollView,
  Modal,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native';

import Timeline from 'Components/Tab/HomeTab/Timeline';

const {width, height} = Dimensions.get('window');

const ClickPicture = ({post, onClose, user}) => {
  return (
    <Modal
      transparent
      animated={true}
      animationType="fade"
      onRequestClose={() => onClose()}>
      <TouchableWithoutFeedback onPress={() => onClose()}>
        <View style={styles.modalOverlay} />
      </TouchableWithoutFeedback>
      <View style={styles.modalContent}>
        {post.mediaFK !== null ? (
          <View style={{width: '100%', height: 'auto'}}>
            <Timeline postList={post} user={user} />
          </View>
        ) : null}
      </View>
    </Modal>
  );
};

export default ClickPicture;

const styles = StyleSheet.create({
  modalContent: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: height * 0.08,
  },
  modalOverlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#000000aa',
  },
});
