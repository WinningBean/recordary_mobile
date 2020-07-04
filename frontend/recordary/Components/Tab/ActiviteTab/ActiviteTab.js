import React, {useLayoutEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  TextInput,
  ScrollView,
  Dimensions,
  KeyboardAvoidingView,
} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import * as dateFns from 'date-fns';
const Stack = createStackNavigator();

const ActiviteTab = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="activite" component={Activite} />
    </Stack.Navigator>
  );
};

const Activite = ({navigation}) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      title: '활동',
      headerStyle: {backgroundColor: 'rgb(64, 114, 89)'},
      headerTintColor: 'white',
      headerTitleAlign: 'left',
      headerTitleStyle: {
        fontWeight: 'bold',
        fontSize: 24,
      },
      headerLeft: () => (
        <TouchableOpacity
          onPress={() => {
            navigation.openDrawer();
          }}>
          <Text style={{padding: 10}}>
            <MaterialCommunityIcons name="menu" size={34} color="white" />
          </Text>
        </TouchableOpacity>
      ),
    });
  }, []);
  return (
    <View style={styles.container}>
      <View style={styles.notifyBox}>
        <View style={{margin: 5}}>
          <Text style={{color: 'gray', fontSize: 15}}>
            오늘, 10일전, 20일전 등등
            {/* {Math.abs(
                dateFns.differenceInDays(
                  dateFns.parseISO(알림온날짜),
                  new Date(),
                ),
              ) === 0
                ? '오늘'
                : `${Math.abs(
                    dateFns.differenceInDays(
                      dateFns.parseISO(알림온날짜),
                      new Date(),
                    ),
                  )}일 전`} */}
          </Text>
        </View>
        <View style={{marginLeft: 5, marginRight: 5}}>
          <Text
            style={{
              fontSize: 16,
            }}>
            wsb(위성호)님이 팔로우 신청을 했어어어요
          </Text>
        </View>
        {/* 수락 거절용일때만  보이게*/}
        <View style={[styles.spaceBetween, {marginTop: 5, marginBottom: 5}]}>
          <TouchableOpacity>
            <View style={styles.yesNoButton}>
              <Text style={{fontSize: 15}}>수락</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity>
            <View style={styles.yesNoButton}>
              <Text style={{fontSize: 15}}>거절</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default ActiviteTab;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  notifyBox: {
    padding: 5,
    margin: 5,
    backgroundColor: 'white',
  },
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
  yesNoButton: {
    backgroundColor: '#eee',
    width: Dimensions.get('window').width * 0.45,
    height: 30,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
