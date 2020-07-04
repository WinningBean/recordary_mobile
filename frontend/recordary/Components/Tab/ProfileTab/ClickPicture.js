import React, {useState} from 'react';
import {
  View,
  Dimensions,
  ScrollView,
  Modal,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

import Timeline from 'Components/Tab/HomeTab/Timeline';

const ClickPicture = ({post, onClose, user}) => {
  return (
    <Modal
      transparent
      animated={true}
      animationType="fade"
      onRequestClose={() => onClose()}>
      <View style={styles.modalContent}>
        <TouchableOpacity onPress={() => onClose()}>
          {post.mediaFK !== null ? (
            <View style={{width: '100%', height: 'auto'}}>
              <Timeline postList={post} user={user} />
            </View>
          ) : null}
        </TouchableOpacity>
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
    backgroundColor: 'rgba(0,0,0,.5)',
  },
});
