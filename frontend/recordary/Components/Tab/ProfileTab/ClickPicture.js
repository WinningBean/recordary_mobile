import React, {useState} from 'react';
import {
  View,
  Dimensions,
  ScrollView,
  Modal,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';

import Timeline from 'Components/Tab/HomeTab/Timeline';

const ClickPicture = ({post, onClose, user}) => {
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <Modal
      transparent
      animated={true}
      animationType="fade"
      onRequestClose={() => onClose()}>
      <View style={styles.modalContent}>
        <TouchableWithoutFeedback onPress={() => onClose()}>
          {post.mediaFK !== null ? (
            <View style={{width: '100%', height: 'auto'}}>
              <Timeline postList={post} user={user} />
            </View>
          ) : null}
        </TouchableWithoutFeedback>
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
