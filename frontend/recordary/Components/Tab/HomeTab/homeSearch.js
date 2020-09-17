import React, {useState, useRef} from 'react';
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  TouchableNativeFeedback,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Image,
  Alert,
} from 'react-native';
import produce from 'immer';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {Transition, Transitioning} from 'react-native-reanimated';
import axios from 'axios';

const window = Dimensions.get('window');

const homeSearch = ({navigation, route}) => {
  const [input, setInput] = useState('');
  const [isClickUser, setIsClickUser] = useState(true);
  const [searchedUser, setSearchedUser] = useState([]);
  const [searchedGroup, setSearchedGroup] = useState([]);

  const swtich = useRef();

  const changeClick = (isUser) => {
    if (isUser === isClickUser) return;
    swtich.current.animateNextTransition();
    setIsClickUser(isUser);
  };

  // const showAlert = () => {
  //   Alert.alert(
  //     'Follow',
  //     '팔로우 하시겠습니까?',
  //     [
  //       {
  //         text: '아니오',
  //         onPress: () => console.log('No Pressed'),
  //         style: 'cancel',
  //       },
  //       {text: '예', onPress: () => console.log('Yes Pressed')},
  //     ],
  //     {cancelable: false},
  //     // Alery 밖에 누르면 안닫힘
  //   );
  // };

  const userList = () => {
    return searchedUser.map((value, index) => {
      const currIndex = index;
      return (
        <View style={styles.spaceBetween} key={`${value.userCd}-${index}`}>
          <View style={[styles.flexRow, {margin: 5}]}>
            <Image
              source={{
                uri: value.userInfo.userPic,
              }}
              style={{
                width: 40,
                height: 40,
                resizeMode: 'cover',
                borderRadius: 50,
              }}
            />
            <Text style={{padding: 10, fontSize: 18}}>
              {value.userInfo.userId}({value.userInfo.userNm})
            </Text>
          </View>
          {value.userFollowTarget ? (
            <TouchableOpacity
              onPress={() =>
                Alert.alert(
                  'unFollow',
                  '팔로우를 취소하시겠습니까?',
                  [
                    {
                      text: '아니오',
                      onPress: () => console.log('No Pressed'),
                      style: 'cancel',
                    },
                    {
                      text: '예',
                      onPress: () =>
                        axios
                          .delete(
                            `http://ec2-15-165-140-48.ap-northeast-2.compute.amazonaws.com:8080/unFollow/${route.params.user.userCd}`,
                            {
                              params: {targetCd: value.userInfo.userCd},
                            },
                          )
                          .then((unfollow) => {
                            const copySearchedUser = searchedUser.concat();
                            copySearchedUser[
                              currIndex
                            ].userFollowTarget = !copySearchedUser[currIndex]
                              .userFollowTarget;
                            setSearchedUser(copySearchedUser);
                          })
                          .catch((e) => {
                            console.log(e);
                          }),
                    },
                  ],
                  {cancelable: false},
                )
              }>
              <MaterialCommunityIcons
                style={{padding: 10}}
                name="account-check"
                size={30}
                color="black"
              />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={() =>
                Alert.alert(
                  'Follow',
                  '팔로우 하시겠습니까?',
                  [
                    {
                      text: '아니오',
                      onPress: () => console.log('No Pressed'),
                      style: 'cancel',
                    },
                    {
                      text: '예',
                      onPress: () =>
                        axios
                          .post(
                            `http://ec2-15-165-140-48.ap-northeast-2.compute.amazonaws.com:8080/follow/${route.params.user.userCd}`,
                            JSON.stringify(value.userInfo.userCd),
                            {
                              headers: {
                                Accept: 'application/json',
                                'Content-Type': 'application/json',
                              },
                            },
                          )
                          .then((follow) => {
                            const copySearchedUser = searchedUser.concat();
                            copySearchedUser[
                              currIndex
                            ].userFollowTarget = !copySearchedUser[currIndex]
                              .userFollowTarget;
                            setSearchedUser(copySearchedUser);
                          })
                          .catch((e) => {
                            console.log(e);
                          }),
                    },
                  ],
                  {cancelable: false},
                )
              }>
              <MaterialIcons
                name="add"
                style={{padding: 10}}
                size={30}
                color="black"
              />
            </TouchableOpacity>
          )}
        </View>
      );
    });
  };

  const groupList = () => {
    return searchedGroup.map((value, index) => (
      <View style={styles.spaceBetween} key={`${value.userCd}-${index}`}>
        <View style={[styles.flexRow, {margin: 5}]}>
          <Image
            source={{
              uri: value.groupPic,
            }}
            style={{
              width: 40,
              height: 40,
              resizeMode: 'cover',
              borderRadius: 50,
            }}
          />
          <Text style={{padding: 10, fontSize: 18}}>{value.groupNm}</Text>
        </View>
        {console.log(value)}
        {/* {value.groupState === true ? (
          <TouchableOpacity>
            <MaterialCommunityIcons
              style={{padding: 10}}
              name="account-check"
              size={30}
              color="black"
            />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity>
            <MaterialIcons
              name="add"
              style={{padding: 10}}
              size={30}
              color="black"
            />
          </TouchableOpacity>
        )} */}
      </View>
    ));
  };

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
            placeholder="user and group search"
            returnKeyType="search"
            autoFocus={true}
            onChangeText={(value) => setInput(value)}
            onKeyPress={async (e) => {
              // setInput(e.nativeEvent.key);
              const userData = (
                await axios.get(
                  'http://ec2-15-165-140-48.ap-northeast-2.compute.amazonaws.com:8080/followState/search',
                  {params: {input: input}},
                )
              ).data;
              setSearchedUser(userData);
              const groupData = (
                await axios.get(
                  `http://ec2-15-165-140-48.ap-northeast-2.compute.amazonaws.com:8080/group/findGroup/${input}`,
                )
              ).data;
              console.log(groupData);
              setSearchedGroup(groupData);
            }}
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignItems: 'center',
            borderBottomColor: '#eeeeee',
            borderBottomWidth: 1,
            height: 30,
          }}>
          <TouchableOpacity
            style={{flex: 1, height: 30, alignItems: 'center'}}
            onPress={() => changeClick(true)}>
            <Text>User</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{flex: 1, height: 30, alignItems: 'center'}}
            onPress={() => changeClick(false)}>
            <Text>Group</Text>
          </TouchableOpacity>
        </View>
        <Transitioning.View
          ref={swtich}
          transition={<Transition.Change />}
          style={[
            {
              height: 1,
              width: window.width * 0.5,
              backgroundColor: 'black',
            },
            isClickUser ? null : {marginLeft: window.width * 0.5},
          ]}
        />
        <ScrollView>{isClickUser ? userList() : groupList()}</ScrollView>
      </View>
    </>
  );
};

export default homeSearch;

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
    backgroundColor: 'rgba(64, 114, 89,.3)',
    marginHorizontal: 10,
    marginVertical: 20,
    borderRadius: 5,
    flexDirection: 'row',
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
});
